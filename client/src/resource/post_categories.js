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
  useLocale,
  TranslatableFields,
} from "react-admin";

function ResourceList(props) {
  const locale = useLocale();
  const ResourceFilters = [
    <ReferenceInput
      label="Parent Category"
      reference="post_categories"
      source="parent_id"
    >
      <SelectInput optionText={`title.${locale}`} />
    </ReferenceInput>,
    <BooleanInput source="is_published" />,
  ];
  return (
    <List filters={ResourceFilters} {...props}>
      <Datagrid>
        <TextField sortable={false} source={`title.${locale}`} />
        <ReferenceField
          label="Parent Category"
          reference="post_categories"
          source="parent_id"
        >
          <TextField source={`title.${locale}`} />
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
  const locale = useLocale();
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <ReferenceField
          label="Parent Category"
          reference="post_categories"
          source="parent_id"
        >
          <TextField source={`title.${locale}`} />
        </ReferenceField>

        <TranslatableFields locales={["vi", "en"]} defaultLocale={locale}>
          <TextField source="title" />
          <TextField source="slug" />
          <TextField source="description" />
        </TranslatableFields>

        <NumberField source="order" />
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
