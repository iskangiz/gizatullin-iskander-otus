using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LanguageApp.Api.Migrations
{
    public partial class AddVoiceMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Voice",
                schema: "lang",
                table: "Word",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Voice",
                schema: "lang",
                table: "Word");
        }
    }
}
