/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema
    .createTable("projects", (tbl) => {
      tbl.increments("project_id");
      tbl.string("project_name").notNullable();
      tbl.string("project_description");
      tbl.integer("project_completed").defaultTo(0);
    })
    .createTable("resources", (tbl) => {
      tbl.increments("resource_id");
      tbl.string("resource_name").notNullable().unique();
      tbl.string("resource_description");
    })
    .createTable("tasks", (tbl) => {
      tbl.increments("task_id");
      tbl.string("task_description").notNullable();
      tbl.string("task_notes");
      tbl.integer("task_completed").defaultTo(0);
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    })
    .createTable("project_resources", (tbl) => {
      tbl.increments("project_resources_id");
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("resource_id")
        .inTable("resources")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};