import { Migration } from "@mikro-orm/migrations";

export class Migration20220422130436 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "budgets" ("id" uuid not null default uuid_generate_v4(), "seq_id" serial primary key, "created_at" timestamptz(0) not null default current_timestamp, "modified_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "user_id" varchar(255) null, "expense_id" varchar(255) not null, "amounts" varchar(255) not null);'
    );
    this.addSql("comment on table \"budgets\" is '预算表';");
  }
}
