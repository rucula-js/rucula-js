using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rucula.Infra.Migrations
{
    /// <inheritdoc />
    public partial class FkTagMetaWithContentHTML : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TagMetaHTML_ContentHTML_ContentHTMLGuuid",
                table: "TagMetaHTML");

            migrationBuilder.DropIndex(
                name: "IX_TagMetaHTML_ContentHTMLGuuid",
                table: "TagMetaHTML");

            migrationBuilder.DropColumn(
                name: "ContentHTMLGuuid",
                table: "TagMetaHTML");

            migrationBuilder.AlterColumn<string>(
                name: "ContentHTMLFk",
                table: "TagMetaHTML",
                type: "character varying(36)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TagMetaHTML_ContentHTMLFk",
                table: "TagMetaHTML",
                column: "ContentHTMLFk");

            migrationBuilder.AddForeignKey(
                name: "FK_TagMetaHTML_ContentHTML_ContentHTMLFk",
                table: "TagMetaHTML",
                column: "ContentHTMLFk",
                principalTable: "ContentHTML",
                principalColumn: "Guuid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TagMetaHTML_ContentHTML_ContentHTMLFk",
                table: "TagMetaHTML");

            migrationBuilder.DropIndex(
                name: "IX_TagMetaHTML_ContentHTMLFk",
                table: "TagMetaHTML");

            migrationBuilder.AlterColumn<string>(
                name: "ContentHTMLFk",
                table: "TagMetaHTML",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(36)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContentHTMLGuuid",
                table: "TagMetaHTML",
                type: "character varying(36)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TagMetaHTML_ContentHTMLGuuid",
                table: "TagMetaHTML",
                column: "ContentHTMLGuuid");

            migrationBuilder.AddForeignKey(
                name: "FK_TagMetaHTML_ContentHTML_ContentHTMLGuuid",
                table: "TagMetaHTML",
                column: "ContentHTMLGuuid",
                principalTable: "ContentHTML",
                principalColumn: "Guuid");
        }
    }
}
