import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`media\` ADD \`_key\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail__key\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_square__key\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_small__key\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_medium__key\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_large__key\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_xlarge__key\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_og__key\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`_key\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail__key\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_square__key\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_small__key\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_medium__key\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_large__key\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_xlarge__key\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_og__key\`;`)
}
