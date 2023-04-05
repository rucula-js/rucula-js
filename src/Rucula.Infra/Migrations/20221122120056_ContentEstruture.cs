using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rucula.Infra.Migrations
{
    /// <inheritdoc />
    public partial class ContentEstruture : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContentEstruture",
                columns: table => new
                {
                    Guuid = table.Column<string>(type: "text", nullable: false, maxLength:36),
                    Next = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Previous = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    ContentFk = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PrimaryKey_ContentEstrutureGuuid", x => x.Guuid);
                    table.ForeignKey(
                        name: "FK_ContentEstruture_ContentHTML_ContentFk",
                        column: x => x.ContentFk,
                        principalTable: "ContentHTML",
                        principalColumn: "Guuid");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContentEstruture_ContentFk",
                table: "ContentEstruture",
                column: "ContentFk",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContentEstruture");
        }
    }
}
