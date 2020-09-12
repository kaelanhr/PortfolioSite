using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PersonalSite.Infrastructure.Persistence.Migrations
{
    public partial class CleanArchitecture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Updated",
                table: "SiteContent");

            migrationBuilder.DropColumn(
                name: "Updated",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "Updated",
                table: "BlogPost");

            migrationBuilder.DropColumn(
                name: "Updated",
                table: "Blog");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModified",
                table: "SiteContent",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "Project",
                maxLength: 1500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModified",
                table: "Project",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "BlogPost",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModified",
                table: "BlogPost",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModified",
                table: "Blog",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "SiteContent");

            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "BlogPost");

            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "Blog");

            migrationBuilder.AddColumn<DateTime>(
                name: "Updated",
                table: "SiteContent",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "Project",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 1500);

            migrationBuilder.AddColumn<DateTime>(
                name: "Updated",
                table: "Project",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "BlogPost",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 500);

            migrationBuilder.AddColumn<DateTime>(
                name: "Updated",
                table: "BlogPost",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Updated",
                table: "Blog",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
