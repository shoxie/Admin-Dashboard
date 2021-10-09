import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  BooleanInput,
  SelectInput,
  DateField,
  TextField,
  SimpleShowLayout,
  TranslatableInputs,
} from "react-admin";

function Aside() {
  return (
    <SimpleShowLayout>
      <TextField source="id" />

      <DateField source="updated_at" />
      <DateField source="created_at" />
    </SimpleShowLayout>
  );
}
function ResourceEdit(props) {
  return (
    <Edit aside={<Aside />} {...props}>
      <SimpleForm redirect="show">
        <NumberInput source="order" />
        <ReferenceInput
          label="Parent Category"
          reference="post_categories"
          source="parent_id"
        >
          <SelectInput optionText="title.vi" />
        </ReferenceInput>
        <BooleanInput source="is_published" />
        <TranslatableInputs locales={["vi", "en"]} defaultLocale="vi">
          <TextInput source="title" />
          <TextInput source="slug" />
          <TextInput source="description" />
        </TranslatableInputs>
      </SimpleForm>
    </Edit>
  );
}

export default ResourceEdit;
