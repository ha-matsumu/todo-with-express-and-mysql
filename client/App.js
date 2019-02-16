import React, { Component } from "react";

import Aux from "./hoc/Aux";
import Layout from "./components/Layout/Layout";
import Todos from "./containers/Todos/Todos";

class App extends Component {
  render() {
    return (
      <Aux>
        <Layout>
          <Todos />
        </Layout>
      </Aux>
    );
  }
}

export default App;
