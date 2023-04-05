using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rucula.Infra.Migrations
{
    /// <inheritdoc />
    public partial class FkRuclaRepresentationIsRequirid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LanguageRuculaRepresentation_LanguagesRucula_CodeRuculaFore~",
                table: "LanguageRuculaRepresentation");

            migrationBuilder.AlterColumn<string>(
                name: "CodeRuculaForeKey",
                table: "LanguageRuculaRepresentation",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_LanguageRuculaRepresentation_LanguagesRucula_CodeRuculaFore~",
                table: "LanguageRuculaRepresentation",
                column: "CodeRuculaForeKey",
                principalTable: "LanguagesRucula",
                principalColumn: "Code",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LanguageRuculaRepresentation_LanguagesRucula_CodeRuculaFore~",
                table: "LanguageRuculaRepresentation");

            migrationBuilder.AlterColumn<string>(
                name: "CodeRuculaForeKey",
                table: "LanguageRuculaRepresentation",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_LanguageRuculaRepresentation_LanguagesRucula_CodeRuculaFore~",
                table: "LanguageRuculaRepresentation",
                column: "CodeRuculaForeKey",
                principalTable: "LanguagesRucula",
                principalColumn: "Code");
        }
    }
}
