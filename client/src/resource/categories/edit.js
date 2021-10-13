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

      <DateField source="updatedAt" />
      <DateField source="createdAt" />
    </SimpleShowLayout>
  );
}
function ResourceEdit(props) {
  return (
    <Edit aside={<Aside />} {...props}>
      <SimpleForm redirect="show">
          <TextInput source="name" />
          <TextInput source="description" />
      </SimpleForm>
    </Edit>
  );
}

export default ResourceEdit;
