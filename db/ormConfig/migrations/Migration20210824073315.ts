import { Migration } from "@mikro-orm/migrations";

export class Migration20210824073315 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "create table `users` (`id` varchar not null, `seq_id` integer not null primary key autoincrement, `username` varchar null, `birthday` varchar null, `gender` varchar null, `email` varchar null, `github_provider_id` varchar null, `google_provider_id` varchar null, `phone_number` varchar null, `password` varchar null, `avatar` varchar null, `is_admin` integer not null default false, `is_verify` integer not null default false, `created_at` datetime not null default current_timestamp, `modified_at` datetime null, `deleted_at` datetime null);"
    );
  }
}
