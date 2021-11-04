import { Migration } from "@mikro-orm/migrations";

export class Migration20211104023055 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "fund_plan" add column "has_complete" bool not null default false;'
    );
  }
}
