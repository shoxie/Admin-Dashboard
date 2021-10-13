import * as React from "react";
import * as admins from "./resource/admins";
import * as posts from "./resource/products/index";
import * as categories from "./resource/categories/index";
import { Admin, Resource, ListGuesser } from "react-admin";
import { createBrowserHistory as createHistory } from "history";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import Dashboard from "./Dashboard";

const history = createHistory();

const App = () => (
  <Admin
    dashboard={Dashboard}
    title="KingAttorney"
    history={history}
    authProvider={authProvider}
    dataProvider={dataProvider}
    disableTelemetry
  >
    <Resource
      name="users"
      list={admins.list}
      show={admins.show}
      create={admins.create}
      edit={admins.edit}
    />
    <Resource
      name="products"
      list={posts.list}
      show={posts.show}
      create={posts.create}
      edit={posts.edit}
    />
    <Resource
      name="categories"
      list={categories.list}
      show={categories.show}
      create={categories.create}
      edit={categories.edit}
    />
  </Admin>
);

export default App;
