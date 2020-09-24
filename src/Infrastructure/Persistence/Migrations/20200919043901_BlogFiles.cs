using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PersonalSite.Infrastructure.Persistence.Migrations
{
    public partial class BlogFiles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "HeaderImageId",
                table: "Blog",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "__Files",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Creation = table.Column<DateTime>(nullable: false),
                    LastModified = table.Column<DateTime>(nullable: true),
                    Container = table.Column<string>(nullable: false),
                    FileName = table.Column<string>(nullable: false),
                    ContentType = table.Column<string>(nullable: false),
                    FileLength = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK___Files", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Blog_HeaderImageId",
                table: "Blog",
                column: "HeaderImageId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Blog___Files_HeaderImageId",
                table: "Blog",
                column: "HeaderImageId",
                principalTable: "__Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blog___Files_HeaderImageId",
                table: "Blog");

            migrationBuilder.DropTable(
                name: "__Files");

            migrationBuilder.DropIndex(
                name: "IX_Blog_HeaderImageId",
                table: "Blog");

            migrationBuilder.DropColumn(
                name: "HeaderImageId",
                table: "Blog");
        }
    }
}
