using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rucula.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AddColumnSequenceInFrameAndField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<short>(
                name: "Sequence",
                table: "Frame",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);

            migrationBuilder.AddColumn<short>(
                name: "Sequence",
                table: "Field",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sequence",
                table: "Frame");

            migrationBuilder.DropColumn(
                name: "Sequence",
                table: "Field");
        }
    }
}
