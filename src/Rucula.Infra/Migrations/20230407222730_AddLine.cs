using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rucula.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AddLine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Field_Frame_FrameFk",
                table: "Field");

            migrationBuilder.AddColumn<string>(
                name: "LineFk",
                table: "Field",
                type: "character varying(10)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Line",
                columns: table => new
                {
                    Id = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    FrameFk = table.Column<string>(type: "character varying(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PrimaryKey_Line_Id", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Line_Frame_FrameFk",
                        column: x => x.FrameFk,
                        principalTable: "Frame",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Field_LineFk",
                table: "Field",
                column: "LineFk");

            migrationBuilder.CreateIndex(
                name: "IX_Line_FrameFk",
                table: "Line",
                column: "FrameFk");

            migrationBuilder.AddForeignKey(
                name: "FK_Field_Frame_FrameFk",
                table: "Field",
                column: "FrameFk",
                principalTable: "Frame",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Field_Line_LineFk",
                table: "Field",
                column: "LineFk",
                principalTable: "Line",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Field_Frame_FrameFk",
                table: "Field");

            migrationBuilder.DropForeignKey(
                name: "FK_Field_Line_LineFk",
                table: "Field");

            migrationBuilder.DropTable(
                name: "Line");

            migrationBuilder.DropIndex(
                name: "IX_Field_LineFk",
                table: "Field");

            migrationBuilder.DropColumn(
                name: "LineFk",
                table: "Field");

            migrationBuilder.AddForeignKey(
                name: "FK_Field_Frame_FrameFk",
                table: "Field",
                column: "FrameFk",
                principalTable: "Frame",
                principalColumn: "Id");
        }
    }
}
