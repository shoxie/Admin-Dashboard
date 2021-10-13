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
  ImageField,
} from "react-admin";

function Aside() {
  return (
    <div style={{ minWidth: "200px" }}>
      <SimpleShowLayout>
        <TextField source="id" />
        <ImageField source="image" title="name" />
        <TextField source="name" sortable />
        <TextField source="price" sortable />
        <TextField source="salePrice" sortable />
        <TextField source="snippet" sortable />
      </SimpleShowLayout>
    </div>
  );
}

function ResourceShow(props) {
  return (
    <Show aside={<Aside />} {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <ImageField source="image" title="name" />
        <TextField source="name" sortable />
        <TextField source="price" sortable />
        <TextField source="salePrice" sortable />
        <TextField source="snippet" sortable />
      </SimpleShowLayout>
    </Show>
  );
}
export default ResourceShow;
