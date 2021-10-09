import {
  TextField,
  Show,
  SimpleShowLayout,
  DateField,
  ReferenceField,
  BooleanField,
  NumberField,
  TranslatableFields,
} from "react-admin";

function Aside() {
  return (
    <SimpleShowLayout>
      <TextField source="id" />
      <NumberField source="order" />
      <ReferenceField
        label="Parent Category"
        reference="post_categories"
        source="parent_id"
      >
        <TextField source={`title.vi`} />
      </ReferenceField>
      <BooleanField source="is_published" />
      <DateField source="updated_at" />
      <DateField source="created_at" />
    </SimpleShowLayout>
  );
}
function ResourceShow(props) {
  return (
    <Show aside={<Aside />} {...props}>
      <SimpleShowLayout>
        <TranslatableFields locales={["vi", "en"]} defaultLocale="vi">
          <TextField source="title" />
          <TextField source="slug" />
          <TextField source="description" />
        </TranslatableFields>
      </SimpleShowLayout>
    </Show>
  );
}

export default ResourceShow;
