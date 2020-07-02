using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LanguageApp.Api.Migrations
{
    public partial class AddExerciseMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ExerciseBlock",
                schema: "lang",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseBlock", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Exercise",
                schema: "lang",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ExerciseBlockId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercise", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Exercise_ExerciseBlock_ExerciseBlockId",
                        column: x => x.ExerciseBlockId,
                        principalSchema: "lang",
                        principalTable: "ExerciseBlock",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseWord",
                schema: "lang",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Content = table.Column<string>(nullable: true),
                    Hidden = table.Column<bool>(nullable: false),
                    ExerciseId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseWord", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExerciseWord_Exercise_ExerciseId",
                        column: x => x.ExerciseId,
                        principalSchema: "lang",
                        principalTable: "Exercise",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exercise_ExerciseBlockId",
                schema: "lang",
                table: "Exercise",
                column: "ExerciseBlockId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseWord_ExerciseId",
                schema: "lang",
                table: "ExerciseWord",
                column: "ExerciseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExerciseWord",
                schema: "lang");

            migrationBuilder.DropTable(
                name: "Exercise",
                schema: "lang");

            migrationBuilder.DropTable(
                name: "ExerciseBlock",
                schema: "lang");
        }
    }
}
