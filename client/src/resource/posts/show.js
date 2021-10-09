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
      <ReferenceField reference="admins" source="author_id">
        <TextField source="username" />
      </ReferenceField>
      <ReferenceField
        label="Category"
        reference="post_categories"
        source="post_category_id"
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
          <TextField source="content" />
        </TranslatableFields>
      </SimpleShowLayout>
    </Show>
  );
}
export default ResourceShow;
