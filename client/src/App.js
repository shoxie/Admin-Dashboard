import * as React from "react";
import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
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
      name="users"
      list={ListGuesser}
      show={ShowGuesser}
      edit={EditGuesser}
    />
  </Admin>
);

export default App;
