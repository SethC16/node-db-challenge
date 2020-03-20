
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
        tbl.increments();
        tbl.string('name', 128)
            .notNullable();
        tbl.string('description', 128)
            .notNullable();
        tbl.boolean('complete')
            .notNullable()
            .defaultTo('false');
    })
    .createTable('resources', tbl => {
        tbl.increments();
        tbl.string('name', 128)
            .notNullable()
            .unique();
        tbl.string('description', 128)
    })
    .createTable('tasks', tbl => {
        tbl.increments();
        tbl.string('description', 128)
            .notNullable();
        tbl.string('notes', 128)
        tbl.boolean('complete')
            .notNullable()
            .defaultTo('false');
        tbl.integer('projects_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
    })
    .createTable('project-resources', tbl => {
        tbl.primary(['project_id', 'resource_id'])
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects');
        tbl.integer('resource_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('resources');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('project-resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
