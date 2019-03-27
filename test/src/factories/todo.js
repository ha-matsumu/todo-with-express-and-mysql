const faker = require("faker");
const index = require("../../../src/models/index");

const data = (props = {}) => {
  const defaultProps = {
    title: faker.name.title(),
    body: faker.lorem.sentence(),
    completed: faker.random.boolean(),
    order_number: faker.random.number()
  };
  return Object.assign({}, defaultProps, props);
};

const createTodo = async (props = {}) => await index.Todo.create(data(props));

module.exports = createTodo;
