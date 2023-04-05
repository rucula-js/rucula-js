using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rucula.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AddLanguageRuculaRepresentation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LanguageRuculaRepresentation",
                columns: table => new
                {
                    Code = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CodeRuculaForeKey = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PrimaryKey_LanguageRuculaRepresentationCode", x => x.Code);
                    table.ForeignKey(
                        name: "FK_LanguageRuculaRepresentation_LanguagesRucula_CodeRuculaFore~",
                        column: x => x.CodeRuculaForeKey,
                        principalTable: "LanguagesRucula",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_LanguageRuculaRepresentation_CodeRuculaForeKey",
                table: "LanguageRuculaRepresentation",
                column: "CodeRuculaForeKey",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LanguageRuculaRepresentation");
        }
    }
}
