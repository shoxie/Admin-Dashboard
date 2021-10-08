import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  Show,
  EditButton,
  ShowButton,
  FunctionField,
  SimpleShowLayout,
  DateField,
} from "react-admin";

// const ResourceFilters = [<TextInput source="q" label="Search" alwaysOn />];
const ResourceFilters = [];
function ResourceList(props) {
  return (
    <List filters={ResourceFilters} {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="username" />
        <TextField source="email" />
        <DateField source="created_at" />
        <FunctionField
          label="Action"
          render={(record) => (
            <>
              <EditButton record={record} />
              <ShowButton record={record} />
            </>
          )}
        />
      </Datagrid>
    </List>
  );
}

function ResourceEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="username" />
        <TextInput source="fullname" />
        <TextInput source="phone_number" />
        <TextInput source="email" />
      </SimpleForm>
    </Edit>
  );
}
function ResourceCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="username" />
        <TextInput source="fullname" />
        <TextInput source="password" type="password" />
        <TextInput source="phone_number" />
        <TextInput source="email" />
      </SimpleForm>
    </Create>
  );
}

function ResourceShow(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="username" />
        <TextField source="fullname" />
        <TextField source="phone_number" />
        <TextField source="email" />
        <DateField source="updated_at" />
        <DateField source="created_at" />
      </SimpleShowLayout>
    </Show>
  );
}
export const list = ResourceList;
export const edit = ResourceEdit;
export const create = ResourceCreate;
export const show = ResourceShow;
