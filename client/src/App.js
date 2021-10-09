import * as React from "react";
import * as admins from "./resource/admins";
import * as posts from "./resource/posts/index";
import * as post_categories from "./resource/post_categories/index";
import { Admin, Resource } from "react-admin";
import { createBrowserHistory as createHistory } from "history";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";

const history = createHistory();

const App = () => (
  <Admin
    title="KingAttorney"
    history={history}
    authProvider={authProvider}
    dataProvider={dataProvider}
    disableTelemetry
  >
    <Resource
      name="admins"
      list={admins.list}
      show={admins.show}
      create={admins.create}
      edit={admins.edit}
    />
    <Resource
      name="posts"
      list={posts.list}
      show={posts.show}
      create={posts.create}
      edit={posts.edit}
    />
    <Resource
      name="post_categories"
      list={post_categories.list}
      show={post_categories.show}
      create={post_categories.create}
      edit={post_categories.edit}
    />
  </Admin>
);

export default App;
