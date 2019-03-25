"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const ids = [1, 2, 3, 4, 5];
    const promisesForUpdate = ids.map(id => {
      // 既存レコードの初期値として、idと同じ順番でorder_numberの値をセットする
      const order_number = id;

      return queryInterface.bulkUpdate("Todos", { order_number }, { id });
    });

    return Promise.all(promisesForUpdate);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate("Todos", { order_number: null }, {});
  }
};
