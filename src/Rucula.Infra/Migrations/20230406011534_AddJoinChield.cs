using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rucula.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AddJoinChield : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JoinChield",
                columns: table => new
                {
                    Id = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    WindowFk = table.Column<string>(type: "character varying(10)", nullable: false),
                    Key = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    Value = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PrimaryKey_JoinChield_Id", x => new { x.Id, x.WindowFk });
                    table.ForeignKey(
                        name: "ForeignKey_JoinChield_Window",
                        column: x => x.WindowFk,
                        principalTable: "Window",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_JoinChield_WindowFk",
                table: "JoinChield",
                column: "WindowFk");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JoinChield");
        }
    }
}
