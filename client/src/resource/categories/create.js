import {
  SimpleForm,
  Create,
  NumberInput,
  ReferenceInput,
  BooleanInput,
  SelectInput,
  TextInput,
  TranslatableInputs,
} from "react-admin";

function ResourceCreate(props) {
  return (
    <Create {...props}>
      <SimpleForm redirect="show">
        <NumberInput source="order" />
        <ReferenceInput
          allowEmpty
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
    </Create>
  );
}

export default ResourceCreate;
