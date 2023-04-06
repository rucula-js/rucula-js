using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rucula.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AddButttons : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Button",
                columns: table => new
                {
                    Id = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    WindowFk = table.Column<string>(type: "character varying(10)", nullable: false),
                    Method = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    Post = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    Link = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    Icon = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    Text = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    Type = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    Color = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    Target = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    Urlrelative = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PrimaryKey_Button_Id", x => new { x.Id, x.WindowFk });
                    table.ForeignKey(
                        name: "ForeignKey_Buttons_Window",
                        column: x => x.WindowFk,
                        principalTable: "Window",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Button_WindowFk",
                table: "Button",
                column: "WindowFk");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Button");
        }
    }
}
