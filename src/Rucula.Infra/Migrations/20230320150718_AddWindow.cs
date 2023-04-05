using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rucula.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AddWindow : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FrameFk",
                table: "Field",
                type: "character varying(10)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Window",
                columns: table => new
                {
                    Id = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    Name = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    URLRoot = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    URLGetAll = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    URLGetId = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    Type = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PrimaryKey_Window_Id", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Frame",
                columns: table => new
                {
                    Id = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    Name = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Type = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    ObjectDto = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    WindowFk = table.Column<string>(type: "character varying(10)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PrimaryKey_Frame_Id", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Frame_Window_WindowFk",
                        column: x => x.WindowFk,
                        principalTable: "Window",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Field_FrameFk",
                table: "Field",
                column: "FrameFk");

            migrationBuilder.CreateIndex(
                name: "IX_Frame_WindowFk",
                table: "Frame",
                column: "WindowFk");

            migrationBuilder.AddForeignKey(
                name: "FK_Field_Frame_FrameFk",
                table: "Field",
                column: "FrameFk",
                principalTable: "Frame",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Field_Frame_FrameFk",
                table: "Field");

            migrationBuilder.DropTable(
                name: "Frame");

            migrationBuilder.DropTable(
                name: "Window");

            migrationBuilder.DropIndex(
                name: "IX_Field_FrameFk",
                table: "Field");

            migrationBuilder.DropColumn(
                name: "FrameFk",
                table: "Field");
        }
    }
}
