import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedListEntity1665432371322 implements MigrationInterface {
    name = 'AddedListEntity1665432371322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "list_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "freeText" varchar NOT NULL, "deadLine" datetime NOT NULL, "creatorId" varchar NOT NULL, "status" varchar CHECK( "status" IN ('1','2','3') ) NOT NULL DEFAULT (1), "listId" integer)`);
        await queryRunner.query(`CREATE TABLE "list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_d7ff6872c82ac4a87ff986a38d8" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "list_assigned_users_user" ("listId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("listId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d61ddbe34050b6b78b7d671aa8" ON "list_assigned_users_user" ("listId") `);
        await queryRunner.query(`CREATE INDEX "IDX_26201adb7c48dadc233b7b1452" ON "list_assigned_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "temporary_list_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "freeText" varchar NOT NULL, "deadLine" datetime NOT NULL, "creatorId" varchar NOT NULL, "status" varchar CHECK( "status" IN ('1','2','3') ) NOT NULL DEFAULT (1), "listId" integer, CONSTRAINT "FK_89a46892e58c831d817b2dca8f7" FOREIGN KEY ("listId") REFERENCES "list" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_list_item"("id", "title", "freeText", "deadLine", "creatorId", "status", "listId") SELECT "id", "title", "freeText", "deadLine", "creatorId", "status", "listId" FROM "list_item"`);
        await queryRunner.query(`DROP TABLE "list_item"`);
        await queryRunner.query(`ALTER TABLE "temporary_list_item" RENAME TO "list_item"`);
        await queryRunner.query(`DROP INDEX "IDX_d61ddbe34050b6b78b7d671aa8"`);
        await queryRunner.query(`DROP INDEX "IDX_26201adb7c48dadc233b7b1452"`);
        await queryRunner.query(`CREATE TABLE "temporary_list_assigned_users_user" ("listId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_d61ddbe34050b6b78b7d671aa87" FOREIGN KEY ("listId") REFERENCES "list" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_26201adb7c48dadc233b7b14522" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("listId", "userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_list_assigned_users_user"("listId", "userId") SELECT "listId", "userId" FROM "list_assigned_users_user"`);
        await queryRunner.query(`DROP TABLE "list_assigned_users_user"`);
        await queryRunner.query(`ALTER TABLE "temporary_list_assigned_users_user" RENAME TO "list_assigned_users_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_d61ddbe34050b6b78b7d671aa8" ON "list_assigned_users_user" ("listId") `);
        await queryRunner.query(`CREATE INDEX "IDX_26201adb7c48dadc233b7b1452" ON "list_assigned_users_user" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_26201adb7c48dadc233b7b1452"`);
        await queryRunner.query(`DROP INDEX "IDX_d61ddbe34050b6b78b7d671aa8"`);
        await queryRunner.query(`ALTER TABLE "list_assigned_users_user" RENAME TO "temporary_list_assigned_users_user"`);
        await queryRunner.query(`CREATE TABLE "list_assigned_users_user" ("listId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("listId", "userId"))`);
        await queryRunner.query(`INSERT INTO "list_assigned_users_user"("listId", "userId") SELECT "listId", "userId" FROM "temporary_list_assigned_users_user"`);
        await queryRunner.query(`DROP TABLE "temporary_list_assigned_users_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_26201adb7c48dadc233b7b1452" ON "list_assigned_users_user" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d61ddbe34050b6b78b7d671aa8" ON "list_assigned_users_user" ("listId") `);
        await queryRunner.query(`ALTER TABLE "list_item" RENAME TO "temporary_list_item"`);
        await queryRunner.query(`CREATE TABLE "list_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "freeText" varchar NOT NULL, "deadLine" datetime NOT NULL, "creatorId" varchar NOT NULL, "status" varchar CHECK( "status" IN ('1','2','3') ) NOT NULL DEFAULT (1), "listId" integer)`);
        await queryRunner.query(`INSERT INTO "list_item"("id", "title", "freeText", "deadLine", "creatorId", "status", "listId") SELECT "id", "title", "freeText", "deadLine", "creatorId", "status", "listId" FROM "temporary_list_item"`);
        await queryRunner.query(`DROP TABLE "temporary_list_item"`);
        await queryRunner.query(`DROP INDEX "IDX_26201adb7c48dadc233b7b1452"`);
        await queryRunner.query(`DROP INDEX "IDX_d61ddbe34050b6b78b7d671aa8"`);
        await queryRunner.query(`DROP TABLE "list_assigned_users_user"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`DROP TABLE "list_item"`);
    }

}
