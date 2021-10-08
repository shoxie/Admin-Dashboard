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
  ReferenceField,
  BooleanField,
  NumberField,
  NumberInput,
  ReferenceInput,
  BooleanInput,
  SelectInput,
  ReferenceManyField,
  SingleFieldList,
  ChipField,
} from "react-admin";

// const ResourceFilters = [<TextInput source="q" label="Search" alwaysOn />];
const ResourceFilters = [];
function ResourceList(props) {
  return (
    <List filters={ResourceFilters} {...props}>
      <Datagrid>
        <TextField source="id" />

        <ReferenceManyField
          filter={{ locale: "vi" }}
          label="Title"
          reference="post_category_translations"
          target="post_category_id"
        >
          <SingleFieldList>
            <TextField source="title" />
          </SingleFieldList>
        </ReferenceManyField>
        <ReferenceField
          label="Parent Category"
          reference="post_categories"
          source="parent_id"
        >
          <ReferenceManyField
            label="Trans"
            reference="post_category_translations"
            target="post_category_id"
            filter={{ locale: "vi" }}
          >
            <SingleFieldList>
              <TextField source="title" />
            </SingleFieldList>
          </ReferenceManyField>
        </ReferenceField>
        <BooleanField source="is_published" />
        <DateField source="updated_at" />
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
        <NumberInput source="order" />
        <ReferenceInput reference="admins" source="author_id">
          <SelectInput optionText="username" />
        </ReferenceInput>
        <BooleanInput source="is_published" />
      </SimpleForm>
    </Edit>
  );
}
function ResourceCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm>
        <NumberInput source="order" />
        <ReferenceInput reference="admins" source="author_id">
          <SelectInput optionText="username" />
        </ReferenceInput>
        <BooleanInput source="is_published" />
      </SimpleForm>
    </Create>
  );
}

function ResourceShow(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <NumberField source="order" />
        <ReferenceField reference="admins" source="author_id">
          <TextField source="username" />
        </ReferenceField>
        <BooleanField source="is_published" />
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
