import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('usuario', (table) => {
        table.uuid('id').primary();
        table.text('nome').notNullable();
        table.text('email').notNullable();
        table.tinyint('tipo').notNullable();
    })

    await knex.schema.createTable('sinistro', (table) => {
        table.uuid('id').primary();
        table.text('status').notNullable();
        table.uuid('id_usuario').notNullable();
        table.uuid('id_usuario_edit');
        table.uuid('id_arquivo');
        table.uuid('id_cliente')

        table.foreign('id_usuario').references('id').inTable('usuario')
    })

    await knex.schema.createTable('arquivo', (table) => {
        table.uuid('id').primary();
        table.text('nome').notNullable();
        table.text('arquivo').notNullable();
        table.uuid('id_sinistro').notNullable();

        table.foreign('id_sinistro').references('id').inTable('sinistro');
    })

    await knex.schema.createTable('cliente', (table) => {
        table.uuid('id').primary();
        table.text('nome').notNullable();
        table.text('cpf').notNullable();
        table.text('carteira').notNullable();
    })

    await knex.schema.createTable('seguro', (table) => {
        table.uuid('id').primary();
        table.text('nome').notNullable();
        table.decimal('valor_segurado').notNullable();
        table.uuid('id_cliente').notNullable();
    })

    await knex.schema.createTable('sinistro_usuario_edit', (table) => {
        table.uuid('id').primary();
        table.uuid('id_usuario').notNullable();
        table.uuid('id_sinistro').notNullable();
        table.date('data').notNullable();

        table.foreign('id_usuario').references('id').inTable('usuario');
        table.foreign('id_sinistro').references('sinistro').inTable('sinistro');
    })

    await knex.schema.alterTable('sinistro', (table) => {
        table.foreign('id_usuario_edit').references('id').inTable('sinistro_usuario_edit');
        table.foreign('id_arquivo').references('id').inTable('arquivo');
        table.foreign('id_cliente').references('id').inTable('cliente');
    })

    
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('sinistro_usuario_edit');
    await knex.schema.dropTable('seguro');
    await knex.schema.dropTable('cliente');
    await knex.schema.dropTable('arquivo');
    await knex.schema.dropTable('sinistro');
    await knex.schema.dropTable('usuario');
}

