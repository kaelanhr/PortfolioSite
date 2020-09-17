using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PersonalSite.Migrations
{
    public partial class TryUpdateRelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BlogPost_Blog_BlogId",
                table: "BlogPost");

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "BlogPost",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "BlogId",
                table: "BlogPost",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BlogPost_Blog_BlogId",
                table: "BlogPost",
                column: "BlogId",
                principalTable: "Blog",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BlogPost_Blog_BlogId",
                table: "BlogPost");

            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "BlogPost",
                type: "text",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<Guid>(
                name: "BlogId",
                table: "BlogPost",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddForeignKey(
                name: "FK_BlogPost_Blog_BlogId",
                table: "BlogPost",
                column: "BlogId",
                principalTable: "Blog",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
