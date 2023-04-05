using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rucula.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AddTagMetaHTMLAndContentHTMLL : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContentHTML",
                columns: table => new
                {
                    Guuid = table.Column<string>(type: "text", nullable: false, maxLength:36),
                    Content = table.Column<string>(type: "character varying(1300)", maxLength: 1300, nullable: false),
                    DateCreation = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DateLastUpdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PrimaryKey_ContentHTMLGuuid", x => x.Guuid);
                });

            migrationBuilder.CreateTable(
                name: "TagMetaHTML",
                columns: table => new
                {
                    Guuid = table.Column<string>(type: "text", nullable: false,maxLength:36),
                    Name = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    Propert = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    Content = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ContentHTMLFk = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PrimaryKey_TagMetaHTMLGuuid", x => x.Guuid);
                    table.ForeignKey(
                        name: "FK_TagMetaHTML_ContentHTML_ContentHTMLFk",
                        column: x => x.ContentHTMLFk,
                        principalTable: "ContentHTML",
                        principalColumn: "Guuid");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TagMetaHTML_ContentHTMLFk",
                table: "TagMetaHTML",
                column: "ContentHTMLFk");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TagMetaHTML");

            migrationBuilder.DropTable(
                name: "ContentHTML");
        }
    }
}
