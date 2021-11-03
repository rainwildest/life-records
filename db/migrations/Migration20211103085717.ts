import { Migration } from "@mikro-orm/migrations";

export class Migration20211103085717 extends Migration {
  async up(): Promise<void> {
    this.addSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    this.addSql(
      'create table "fund_plan" ("seq_id" serial primary key, "id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default current_timestamp, "modified_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "expense_id" varchar(255) not null, "user_id" varchar(255) null, "amounts" int4 not null default 0, "approximate_at" timestamptz(0) null);'
    );
    this.addSql("comment on table \"fund_plan\" is '资金计划';");

    this.addSql(
      'create table "account_books" ("seq_id" serial primary key, "id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default current_timestamp, "modified_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "name" varchar(255) not null, "user_id" varchar(255) null);'
    );
    this.addSql("comment on table \"account_books\" is '我的账簿';");

    this.addSql(
      'create table "cost_details" ("seq_id" serial primary key, "id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default current_timestamp, "modified_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "user_id" varchar(255) null, "expense_id" varchar(255) not null, "amounts" int4 not null default 0, "rational" bool not null default true, "purchase_time" timestamptz(0) not null, "book_id" varchar(255) null, "remarks" text null);'
    );
    this.addSql("comment on table \"cost_details\" is '生活费用记录表';");

    this.addSql(
      'create table "living_expenses" ("seq_id" serial primary key, "id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default current_timestamp, "modified_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "user_id" varchar(255) null, "expense_icon" varchar(255) null, "expense_type" varchar(255) null, "expense_name" varchar(255) null);'
    );
    this.addSql("comment on table \"living_expenses\" is '费用类型表';");

    this.addSql(
      'create table "users" ("seq_id" serial primary key, "id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default current_timestamp, "modified_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "username" varchar(255) null, "birthday" varchar(255) null, "gender" varchar(255) null, "email" varchar(255) null, "profile_photo" varchar(255) null, "github_provider_id" varchar(255) null, "google_provider_id" varchar(255) null, "phone_number" varchar(255) null, "password" varchar(255) null, "avatar" varchar(255) null, "is_admin" bool not null default false, "is_verify" bool not null default false);'
    );
    this.addSql("comment on table \"users\" is '用户信息表';");
  }
}
