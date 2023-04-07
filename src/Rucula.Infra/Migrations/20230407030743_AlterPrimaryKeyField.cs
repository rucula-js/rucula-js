using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rucula.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AlterPrimaryKeyField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PrimaryKey_Field_Id",
                table: "Field");

            migrationBuilder.AlterColumn<string>(
                name: "FrameFk",
                table: "Field",
                type: "character varying(10)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(10)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PrimaryKey_Field_Id",
                table: "Field",
                columns: new[] { "Id", "FrameFk" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PrimaryKey_Field_Id",
                table: "Field");

            migrationBuilder.AlterColumn<string>(
                name: "FrameFk",
                table: "Field",
                type: "character varying(10)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(10)");

            migrationBuilder.AddPrimaryKey(
                name: "PrimaryKey_Field_Id",
                table: "Field",
                column: "Id");
        }
    }
}
