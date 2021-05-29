import React from "react";
import Layout from "./Components/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Containers/Dashboard/Dashboard";
import Gender from "./Containers/Gender/Gender";
import Categories from "./Containers/Categories/Categories";
import Brands from "./Containers/Brands/Brands";
import AddProducts from "./Containers/AddProducts/AddProducts"
import EditProducts from "./Containers/EditProducts/EditProducts"

function App() {
  return (
    <React.Fragment>
      <Layout>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/categories" exact component={Categories} />
          <Route path="/gender" exact component={Gender} />
          <Route path="/brands" exact component={Brands} />
          <Route path="/addproducts" exact component={AddProducts} />
          <Route path="/editproducts" exact component={EditProducts} />
        </Switch>
      </Layout>
    </React.Fragment>
  );
}

export default App;
