const faker = require("faker");
const index = require("../../../src/models/index");

const data = async (props = {}) => {
  const defaultProps = {
    title: faker.name.title(),
    body: faker.lorem.sentence(),
    completed: faker.random.boolean(),
  };
  return Object.assign({}, defaultProps, props);
};

const createTodo = async (props = {}) =>
  index.Todo.create(await data(props));

module.exports = createTodo;