ALTER TABLE "BlogPost" ADD "BlogId" uuid NULL;

CREATE INDEX "IX_BlogPost_BlogId" ON "BlogPost" ("BlogId");

ALTER TABLE "BlogPost" ADD CONSTRAINT "FK_BlogPost_Blog_BlogId" FOREIGN KEY ("BlogId") REFERENCES "Blog" ("Id") ON DELETE RESTRICT;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20200704063838_BlogPostRelation', '3.1.1');

ALTER TABLE "BlogPost" DROP CONSTRAINT "FK_BlogPost_Blog_BlogId";

ALTER TABLE "BlogPost" ALTER COLUMN "Content" TYPE text;
ALTER TABLE "BlogPost" ALTER COLUMN "Content" SET NOT NULL;
ALTER TABLE "BlogPost" ALTER COLUMN "Content" DROP DEFAULT;

ALTER TABLE "BlogPost" ALTER COLUMN "BlogId" TYPE uuid;
ALTER TABLE "BlogPost" ALTER COLUMN "BlogId" SET NOT NULL;
ALTER TABLE "BlogPost" ALTER COLUMN "BlogId" DROP DEFAULT;

ALTER TABLE "BlogPost" ADD CONSTRAINT "FK_BlogPost_Blog_BlogId" FOREIGN KEY ("BlogId") REFERENCES "Blog" ("Id") ON DELETE CASCADE;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20200705063849_TryUpdateRelations', '3.1.1');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20200705064223_BuildRelations', '3.1.1');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20200705065631_next', '3.1.1');

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20200705071334_next2', '3.1.1');


