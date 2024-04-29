import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('arquivo', (table) => {
        table.text('tipo').after('arquivo')
    })
    await knex.schema.alterTable('sinistro', (table) => {
        table.dropColumn('id_usuario_edit')
        table.dropColumn('id_arquivo')
    })


}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('arquivo', (table) => {
        table.dropColumn('tipo');
    })
}

