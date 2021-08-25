import { Migration } from "@mikro-orm/migrations";

export class Migration20210825060247 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "create table `cost_details` (`id` varchar not null, `seq_id` integer not null primary key autoincrement, `user_id` varchar null, `expense_id` varchar not null, `expense_price` integer null default 0, `purchase_time` datetime not null, `created_at` datetime not null default current_timestamp, `modified_at` datetime null, `deleted_at` datetime null);"
    );

    this.addSql(
      "create table `living_expenses` (`id` varchar not null, `seq_id` integer not null primary key autoincrement, `user_id` varchar null, `expense_type` varchar null, `expense_name` varchar null, `created_at` datetime not null default current_timestamp, `modified_at` datetime null, `deleted_at` datetime null);"
    );
  }
}
