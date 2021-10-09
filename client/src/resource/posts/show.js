import {
  TextField,
  Show,
  SimpleShowLayout,
  DateField,
  ReferenceField,
  BooleanField,
  NumberField,
  TranslatableFields,
  RichTextField,
} from "react-admin";

function Aside() {
  return (
    <div style={{ minWidth: "200px" }}>
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
    </div>
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
          <RichTextField source="content" />
        </TranslatableFields>
      </SimpleShowLayout>
    </Show>
  );
}
export default ResourceShow;
