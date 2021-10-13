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
      <TextField source="name" />
      <TextField source="description" />
      <DateField source="updatedAt" />
      <DateField source="createdAt" />
    </SimpleShowLayout>
  );
}
function ResourceShow(props) {
  return (
    <Show aside={<Aside />} {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="description" />
        <DateField source="updatedAt" />
        <DateField source="createdAt" />
      </SimpleShowLayout>
    </Show>
  );
}

export default ResourceShow;
