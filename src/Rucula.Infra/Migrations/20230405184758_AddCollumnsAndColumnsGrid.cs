using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rucula.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AddCollumnsAndColumnsGrid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KeyWords_Languages_LanguageId",
                table: "KeyWords");

            migrationBuilder.DropForeignKey(
                name: "FK_LanguageRuculaRepresentation_LanguagesRucula_CodeRuculaFore~",
                table: "LanguageRuculaRepresentation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Languages",
                table: "Languages");

            migrationBuilder.RenameTable(
                name: "LanguagesRucula",
                newName: "LanguageRucula");

            migrationBuilder.RenameTable(
                name: "Languages",
                newName: "Language");

            migrationBuilder.RenameTable(
                name: "KeyWords",
                newName: "KeyWord");

            migrationBuilder.RenameIndex(
                name: "IX_KeyWords_LanguageId",
                table: "KeyWord",
                newName: "IX_KeyWord_LanguageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Language",
                table: "Language",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Columns",
                columns: table => new
                {
                    Id = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    WindowFk = table.Column<string>(type: "character varying(10)", nullable: false),
                    Name = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PrimaryKey_Columns_Id", x => new { x.Id, x.WindowFk });
                    table.ForeignKey(
                        name: "ForeignKey_Collums_Window",
                        column: x => x.WindowFk,
                        principalTable: "Window",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ColumnsGridGet",
                columns: table => new
                {
                    Id = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    WindowFk = table.Column<string>(type: "character varying(10)", nullable: false),
                    ParameterUrl = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    ParameterGrid = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PrimaryKey_ColumnsGridGet_Id_Window", x => new { x.Id, x.WindowFk });
                    table.ForeignKey(
                        name: "ForeignKey_ColumnsGridGet_Window",
                        column: x => x.WindowFk,
                        principalTable: "Window",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Columns_WindowFk",
                table: "Columns",
                column: "WindowFk");

            migrationBuilder.CreateIndex(
                name: "IX_ColumnsGridGet_WindowFk",
                table: "ColumnsGridGet",
                column: "WindowFk");

            migrationBuilder.AddForeignKey(
                name: "FK_KeyWord_Language_LanguageId",
                table: "KeyWord",
                column: "LanguageId",
                principalTable: "Language",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LanguageRuculaRepresentation_LanguageRucula_CodeRuculaForeK~",
                table: "LanguageRuculaRepresentation",
                column: "CodeRuculaForeKey",
                principalTable: "LanguageRucula",
                principalColumn: "Code",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KeyWord_Language_LanguageId",
                table: "KeyWord");

            migrationBuilder.DropForeignKey(
                name: "FK_LanguageRuculaRepresentation_LanguageRucula_CodeRuculaForeK~",
                table: "LanguageRuculaRepresentation");

            migrationBuilder.DropTable(
                name: "Columns");

            migrationBuilder.DropTable(
                name: "ColumnsGridGet");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Language",
                table: "Language");

            migrationBuilder.RenameTable(
                name: "LanguageRucula",
                newName: "LanguagesRucula");

            migrationBuilder.RenameTable(
                name: "Language",
                newName: "Languages");

            migrationBuilder.RenameTable(
                name: "KeyWord",
                newName: "KeyWords");

            migrationBuilder.RenameIndex(
                name: "IX_KeyWord_LanguageId",
                table: "KeyWords",
                newName: "IX_KeyWords_LanguageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Languages",
                table: "Languages",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KeyWords_Languages_LanguageId",
                table: "KeyWords",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LanguageRuculaRepresentation_LanguagesRucula_CodeRuculaFore~",
                table: "LanguageRuculaRepresentation",
                column: "CodeRuculaForeKey",
                principalTable: "LanguagesRucula",
                principalColumn: "Code",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
