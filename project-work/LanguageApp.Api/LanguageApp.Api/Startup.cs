using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace LanguageApp.Api
{
    using System;
    using System.Collections.Generic;
    using System.Text.Json.Serialization;
    using System.Threading.Tasks;

    using AutoMapper;

    using LanguageApp.Api.ApiManagers;
    using LanguageApp.Api.Context;
    using LanguageApp.Api.SignalR;

    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.SignalR;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Primitives;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.OpenApi.Models;

    public class Startup
    {
        public Startup(IConfiguration configuration) => Configuration = configuration;

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            ConfigureSignalR(services);
            ConfigureSwagger(services);
            ConfigureContexts(services);
            ConfigureCors(services);
            ConfigureJwt(services);
            ConfigureMapper(services);
            ConfigureJson(services);
            ConfigureApi(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

            app.UseRouting();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "LanguageApp Api"));
            //app.UseCors("CorsPolicy");
            app.UseCors(builder =>
                {
                    builder.WithOrigins("http://localhost:8080")
                        .AllowAnyHeader().AllowAnyMethod().AllowCredentials();
                });
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(
                endpoints =>
                    {
                        endpoints.MapControllers();
                        endpoints.MapHub<ChatHub>("/chat");
                    });
        }

        private void ConfigureSwagger(IServiceCollection services)
        {
            services.AddSwaggerGen(
                c =>
                    {
                        c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
                        c.AddSecurityDefinition(
                            "Bearer",
                            new OpenApiSecurityScheme
                                {
                                    Description =
                                        "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
                                    Name = "Authorization",
                                    In = ParameterLocation.Header,
                                    Type = SecuritySchemeType.ApiKey,
                                    Scheme = "Bearer"
                                });
                        c.AddSecurityRequirement(
                            new OpenApiSecurityRequirement()
                                {
                                    {
                                        new OpenApiSecurityScheme
                                            {
                                                Reference = new OpenApiReference
                                                                {
                                                                    Type = ReferenceType.SecurityScheme, Id = "Bearer"
                                                                },
                                                Scheme = "oauth2",
                                                Name = "Bearer",
                                                In = ParameterLocation.Header,
                                            },
                                        new List<string>()
                                    }
                                });
                    });
        }

        private void ConfigureContexts(IServiceCollection services)
        {
            ConfigureContext<VocabularyContext>(
                services,
                "ConnectionString",
                "MigrationSchemaName",
                "__EFMigrationsHistory");
            ConfigureContext<AuthContext>(
                services,
                "AuthConnectionString",
                "AuthMigrationSchemaName",
                "__AuthEFMigrationsHistory");
        }

        private void ConfigureContext<T>(
            IServiceCollection services,
            string connectionString,
            string migrationSchemaName,
            string migrationTableName)
            where T : DbContext
        {
            string connection = Configuration.GetSection("DbConnectionOptions")?.GetSection(connectionString)?.Value;
            string schemaName = Configuration.GetSection("DbConnectionOptions")?.GetSection(migrationSchemaName)?.Value;
            services.AddDbContext<T>(
                options => options.UseNpgsql(
                    connection ?? throw new ArgumentNullException(nameof(connection), " has a null connection string."),
                    c => c.MigrationsHistoryTable(migrationTableName, schemaName)));
        }

        private void ConfigureCors(IServiceCollection services) =>
            services.AddCors(
                options => options.AddPolicy(
                    "CorsPolicy",
                    policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

        private void ConfigureJwt(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.TokenValidationParameters = new TokenValidationParameters
                                                                {
                                                                    // укзывает, будет ли валидироваться издатель при валидации токена
                                                                    ValidateIssuer = true,

                                                                    // строка, представляющая издателя
                                                                    ValidIssuer = AuthOptions.Issuer,

                                                                    // будет ли валидироваться потребитель токена
                                                                    ValidateAudience = true,

                                                                    // установка потребителя токена
                                                                    ValidAudience = AuthOptions.Audience,

                                                                    // будет ли валидироваться время существования
                                                                    ValidateLifetime = true,

                                                                    // установка ключа безопасности
                                                                    IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),

                                                                    // валидация ключа безопасности
                                                                    ValidateIssuerSigningKey = false,
                                                                };
                        options.Events = new JwtBearerEvents
                                         {
                                             OnMessageReceived = context =>
                                                 {
                                                     if (!context.Request.Headers.TryGetValue(
                                                             "Authorization",
                                                             out StringValues token))
                                                     {
                                                         var accessToken = context.Request.Query["access_token"];
                                                         var path = context.HttpContext.Request.Path;
                                                         if (!string.IsNullOrEmpty(accessToken)
                                                             && path.StartsWithSegments($"/chat"))
                                                             context.Token = accessToken;
                                                     }

                                                     return Task.CompletedTask;
                                                 }
                                         };
                    });
        }

        private void ConfigureMapper(IServiceCollection services)
        {
            var mappingConfig = new MapperConfiguration(mc => mc.AddProfile(new MapperProfile()));
            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
        }

        private void ConfigureJson(IServiceCollection services)
        {
            services.AddMvc().AddJsonOptions(
                options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
        }

        private void ConfigureApi(IServiceCollection services)
        {
            services.AddSingleton<MsApiManager>();
            services.AddSingleton<YaApiManager>();
        }

        private void ConfigureSignalR(IServiceCollection services)
        {
            services.AddSingleton<IUserIdProvider, CustomUserIdProvider>();
            services.AddSignalR().AddHubOptions<ChatHub>(
                options =>
                    {
                        options.EnableDetailedErrors = true;
                        options.ClientTimeoutInterval = TimeSpan.FromMinutes(5);
                        options.KeepAliveInterval = TimeSpan.FromMinutes(5);
                    });
        }
    }
}
