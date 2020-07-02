using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

using LanguageApp.Api.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace LanguageApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        // тестовые данные вместо использования базы данных
        private List<Account> people = new List<Account>
                                           {
                                               new Account()
                                                   {
                                                       Login = "qwe", Password = "12345", Role = "admin"
                                                   },
                                               new Account()
                                                   {
                                                       Login = "asd", Password = "12345", Role = "user"
                                                   },
                                               new Account()
                                                   {
                                                       Login = "zxc", Password = "12345", Role = "user"
                                                   }
                                           };

        [HttpPost("/token")]
        public IActionResult Token(string username, string password)
        {
            var identity = GetIdentity(username, password);
            if (identity == null) return BadRequest(new { errorText = "Invalid username or password." });

            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.Issuer,
                    audience: AuthOptions.Audience,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.Lifetime)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name
            };

            return Json(response);
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            Account person = people.FirstOrDefault(x => x.Login == username && x.Password == password);
            if (person != null)
            {
                var claims = new List<Claim>
                                 {
                                     new Claim(ClaimsIdentity.DefaultNameClaimType, person.Login),
                                     new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role)
                                 };
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(
                    claims,
                    "Token",
                    ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            return null;
        }
    }
}