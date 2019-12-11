exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments();
    users
      .string("username", 130)
      .notNullable()
      .unique();
    users.string("password", 130).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableExists("users");
};
