import { Migration } from "@mikro-orm/migrations";

export class Migration20210825073328 extends Migration {
  async up(): Promise<void> {
    this.addSql("alter table `cost_details` add column `remarks` text null;");
  }
}
