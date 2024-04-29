import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('seguro', (table) => {
        table.text('status').after('valor_segurado')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('seguro', (table) => {
        table.dropColumn('status')
    })
}

