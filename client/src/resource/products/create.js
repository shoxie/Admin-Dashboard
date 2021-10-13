import {
  SimpleForm,
  Create,
  NumberInput,
  ReferenceInput,
  BooleanInput,
  SelectInput,
  TranslatableInputs,
  TextInput,
  required,
  ImageInput,
  ImageField,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import { withStyles } from "@material-ui/core/styles";

function ResourceCreate(props) {
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
    <Create {...props}>
      <SimpleForm redirect="show" validate={localeValidate}>
        {/* <ImageInput source="image">
          <ImageField source="image" title="name" />
        </ImageInput> */}
          <TextInput source="image" />
          <TextInput source="name" />
          <ReferenceInput
          reference="categories"
          label="Category"
          source="categoryId"
          validate={[required()]}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
          <NumberInput source="price" />
          <NumberInput source="salePrice" />
          <RichTextInput source="description" />
          <RichTextInput source="howToCook" />
      </SimpleForm>
    </Create>
  );
}
export default withStyles({ card: { overflow: "initial" } })(ResourceCreate);
