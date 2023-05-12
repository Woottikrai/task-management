import {MigrationInterface, QueryRunner} from "typeorm";

export class all1683796662066 implements MigrationInterface {
    name = 'all1683796662066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "calendar" ("id" SERIAL NOT NULL, "date" date, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "UpdateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2492fb846a48ea16d53864e3267" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "calendarId" integer NOT NULL, "dopay" character varying, "howmuch" integer, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "UpdateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "img" character varying, "tel" character varying, "positionId" integer, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "UpdateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "position" ("id" SERIAL NOT NULL, "position" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "UpdateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_d796103491cf0bae197dda59477" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_f37c379e70edf58cc1ed63c97aa" FOREIGN KEY ("calendarId") REFERENCES "calendar"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_93af21ecba4fa43c4c63d2456cd" FOREIGN KEY ("positionId") REFERENCES "position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_93af21ecba4fa43c4c63d2456cd"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_f37c379e70edf58cc1ed63c97aa"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_d796103491cf0bae197dda59477"`);
        await queryRunner.query(`DROP TABLE "position"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP TABLE "calendar"`);
    }

}
