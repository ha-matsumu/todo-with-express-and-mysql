"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Todos", "order_number", {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.INTEGER.UNSIGNED,
      after: "completed"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Todos", "order_number");
  }
};
