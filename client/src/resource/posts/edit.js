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
  required,
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
  function localeValidate(values) {
    const locales = ["vi", "en"];
    const TRANS_FIELDS = ["title", "content", "slug", "description"];
    const errors = {};
    for (let locale of locales) {
      let ifIn = false;
      for (let field of TRANS_FIELDS)
        if (values[field] && values[field][locale]) ifIn = true;
      if (ifIn) {
        for (let field of TRANS_FIELDS)
          if (!(values[field] && values[field][locale])) {
            if (!errors[field]) errors[field] = {};
            errors[field][locale] = "Required";
          }
      }
    }
    return errors;
  }
  return (
    <Edit aside={<Aside />} {...props}>
      <SimpleForm redirect="show" validate={localeValidate}>
        <NumberInput source="order" min="0" />
        <ReferenceInput
          reference="post_categories"
          label="Category"
          source="post_category_id"
          validate={[required()]}
        >
          <SelectInput optionText="title.vi" />
        </ReferenceInput>
        <ReferenceInput
          reference="admins"
          source="author_id"
          validate={[required()]}
        >
          <SelectInput optionText="username" />
        </ReferenceInput>
        <BooleanInput source="is_published" />
        <TranslatableInputs locales={["vi", "en"]} defaultLocale="vi">
          <TextInput source="title" />
          <TextInput source="slug" />
          <TextInput source="description" />
          <TextInput multiline source="content" />
        </TranslatableInputs>
      </SimpleForm>
    </Edit>
  );
}
export default ResourceEdit;
