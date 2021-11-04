import { Migration } from "@mikro-orm/migrations";

export class Migration20211104030609 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "fund_plan" add column "name" varchar(255) null;');
  }
}
