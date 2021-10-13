import { Migration } from "@mikro-orm/migrations";

export class Migration20211013064429 extends Migration {
  async up(): Promise<void> {
    this.addSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    this.addSql(
      'create table "budgets" ("id" uuid not null default uuid_generate_v4(), "seq_id" serial primary key, "created_at" timestamptz(0) not null default current_timestamp, "modified_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "user_id" varchar(255) null, "expense_id" varchar(255) not null, "amount" varchar(255) not null);'
    );
    this.addSql("comment on table \"budgets\" is '预算表';");

    this.addSql(
      'create table "cost_details" ("id" uuid not null default uuid_generate_v4(), "seq_id" serial primary key, "created_at" timestamptz(0) not null default current_timestamp, "modified_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "user_id" varchar(255) null, "expense_id" varchar(255) not null, "expense_price" int4 null default 0, "remarks" text null, "purchase_time" timestamptz(0) not null);'
    );
    this.addSql("comment on table \"cost_details\" is '生活费用记录表';");

    this.addSql(
      'create table "living_expenses" ("id" uuid not null default uuid_generate_v4(), "seq_id" serial primary key, "created_at" timestamptz(0) not null default current_timestamp, "modified_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "user_id" varchar(255) null, "expense_icon" varchar(255) null, "expense_type" varchar(255) null, "expense_name" varchar(255) null);'
    );
    this.addSql("comment on table \"living_expenses\" is '费用类型表';");

    this.addSql(
      'create table "users" ("id" uuid not null default uuid_generate_v4(), "seq_id" serial primary key, "created_at" timestamptz(0) not null default current_timestamp, "modified_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "username" varchar(255) null, "birthday" varchar(255) null, "gender" varchar(255) null, "email" varchar(255) null, "profile_photo" varchar(255) null, "github_provider_id" varchar(255) null, "google_provider_id" varchar(255) null, "phone_number" varchar(255) null, "password" varchar(255) null, "avatar" varchar(255) null, "is_admin" bool not null default false, "is_verify" bool not null default false);'
    );
    this.addSql("comment on table \"users\" is '用户信息表';");
  }
}
