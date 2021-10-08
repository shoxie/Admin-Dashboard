import * as React from "react";
import * as admins from "./resource/admins";
import { Admin, Resource } from "react-admin";
import { createBrowserHistory as createHistory } from "history";
import dataProvider from "./dataProvider";
const history = createHistory();

const App = () => (
  <Admin
    title="KingAttorney"
    history={history}
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
  </Admin>
);

export default App;
