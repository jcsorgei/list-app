import { MigrationInterface, QueryRunner } from "typeorm";

export class ListEntityChanged1665506925166 implements MigrationInterface {
    name = 'ListEntityChanged1665506925166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_list_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "freeText" varchar NOT NULL, "deadLine" datetime NOT NULL, "creatorId" integer NOT NULL, "status" varchar CHECK( "status" IN ('1','2','3') ) NOT NULL DEFAULT (1), "listId" integer, CONSTRAINT "FK_89a46892e58c831d817b2dca8f7" FOREIGN KEY ("listId") REFERENCES "list" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_list_item"("id", "title", "freeText", "deadLine", "creatorId", "status", "listId") SELECT "id", "title", "freeText", "deadLine", "creatorId", "status", "listId" FROM "list_item"`);
        await queryRunner.query(`DROP TABLE "list_item"`);
        await queryRunner.query(`ALTER TABLE "temporary_list_item" RENAME TO "list_item"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list_item" RENAME TO "temporary_list_item"`);
        await queryRunner.query(`CREATE TABLE "list_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "freeText" varchar NOT NULL, "deadLine" datetime NOT NULL, "creatorId" varchar NOT NULL, "status" varchar CHECK( "status" IN ('1','2','3') ) NOT NULL DEFAULT (1), "listId" integer, CONSTRAINT "FK_89a46892e58c831d817b2dca8f7" FOREIGN KEY ("listId") REFERENCES "list" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "list_item"("id", "title", "freeText", "deadLine", "creatorId", "status", "listId") SELECT "id", "title", "freeText", "deadLine", "creatorId", "status", "listId" FROM "temporary_list_item"`);
        await queryRunner.query(`DROP TABLE "temporary_list_item"`);
    }

}
