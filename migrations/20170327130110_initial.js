
exports.up = function(knex, Promise) {

    return Promise.all([

        knex.schema.createTable('users', function(table) {
            table.increments('id').primary();
            table.string('email');
            table.string('password');
            table.string('role');
            table.timestamps();
        }),

        knex.schema.createTable('phrases', function(table){
            table.increments('id').primary();
            table.string('text');
            table.integer('author_id')
                 .unsigned()
                 .references('users.id');
            table.timestamps();
        }),

        knex.schema.createTable('presets', function(table){
            table.increments('id').primary();
            table.string('name');
            table.integer('author_id')
                  .unsigned()
                 .references('users.id');
            table.timestamps();
        }),

        knex.schema.createTable('presets_phrases', function(table){
            table.increments('id').primary();
            table.integer('preset_id')
                  .unsigned()
                 .references('presets.id');
            table.integer('phrase_id')
                  .unsigned()
                  .references('phrases.id');
        }),
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('phrases'),
        knex.schema.dropTable('presets')
    ])
};
