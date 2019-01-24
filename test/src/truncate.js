const models = require("../../src/models/");

const truncateTable = modelName =>
  models[modelName].destroy({
    where: {},
    force: true
  });

const truncate = model => {
  if (model) {
    return truncateTable(model);
  }

  return Promise.all(
    Object.keys(models).map(key => {
      if (["sequelize", "Sequelize"].includes(key)) return null;
      return truncateTable(key);
    })
  );
};

module.exports = truncate;
