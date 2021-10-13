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
import RichTextInput from "ra-input-rich-text";
import { withStyles } from "@material-ui/core/styles";

function Aside() {
  return (
    <div style={{ minWidth: "200px" }}>
      <SimpleShowLayout>
        <TextField source="id" />

        <DateField source="updated_at" />
        <DateField source="created_at" />
      </SimpleShowLayout>
    </div>
  );
}

function ResourceEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="image" />
        <TextInput source="name" />
        <NumberInput source="price" />
        <NumberInput source="salePrice" />
        <ReferenceInput
          reference="categories"
          source="categoryId"
          label="Category"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <RichTextInput source="description" />
        <RichTextInput source="howToCook" />
        <RichTextInput source="snippet" />
      </SimpleForm>
    </Edit>
  );
}
export default withStyles({ card: { overflow: "initial" } })(ResourceEdit);
