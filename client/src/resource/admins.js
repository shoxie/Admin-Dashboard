import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  Create,
  Show,
  EditButton,
  ShowButton,
  FunctionField,
  TranslatableInputs,
  TranslatableFields,
  useLocale,
  TabbedShowLayout,
  Tab,
  ReferenceManyField,
} from "react-admin";

const ResourceFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput
    source="categoryId"
    label="Parent Category"
    reference="categories"
    allowEmpty
  >
    <SelectInput optionText="name" />
  </ReferenceInput>,
];

function ResourceList(props) {
  const locale = useLocale();
  return (
    <List filters={ResourceFilters} {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source={`name.${locale}`} label="name" />
        <ReferenceField
          source="categoryId"
          reference="categories"
          label="Parent Category"
        >
          <TextField source={`name.${locale}`} />
        </ReferenceField>
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
  const locale = useLocale();
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TranslatableInputs locales={["en", "vi"]}>
          <TextInput source="name" />
          <TextInput source="description" />
        </TranslatableInputs>
        <ReferenceInput source="categoryId" reference="categories">
          <SelectInput optionText={`name.${locale}`} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
}
function ResourceCreate(props) {
  const locale = useLocale();
  return (
    <Create {...props}>
      <SimpleForm>
        <TranslatableInputs locales={["en", "vi"]}>
          <TextInput source="name" />
          <TextInput source="description" />
        </TranslatableInputs>

        <ReferenceInput source="categoryId" reference="categories">
          <SelectInput optionText={`name.${locale}`} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}

function ResourceShow(props) {
  const locale = useLocale();

  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="summary">
          <TextField source="id" />
          <TranslatableFields locales={["en", "vi"]}>
            <TextField source="name" />
            <TextField source="description" />
          </TranslatableFields>
          <ReferenceField
            source="categoryId"
            reference="categories"
            label="Parent Category"
          >
            <TextField source={`name.${locale}`} />
          </ReferenceField>
        </Tab>
        <Tab label="Sub categories">
          <ReferenceManyField
            reference="categories"
            target="categoryId"
            addLabel={false}
          >
            <Datagrid>
              <TextField source="id" />
              <TextField source={`name.${locale}`} />
              <ShowButton />
              <EditButton />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}
export const list = ResourceList;
export const edit = ResourceEdit;
export const create = ResourceCreate;
export const show = ResourceShow;
