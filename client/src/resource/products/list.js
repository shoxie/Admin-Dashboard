import {
  List,
  Datagrid,
  TextField,
  EditButton,
  ShowButton,
  FunctionField,
  DateField,
  ReferenceField,
  BooleanField,
  ReferenceInput,
  SelectInput,
  BooleanInput,
  ImageField
} from "react-admin";
function ResourceList(props) {
  const ResourceFilters = [
    <ReferenceInput
      label="Category"
      reference="post_categories"
      source="post_category_id"
    >
      <SelectInput optionText={`title.vi`} />
    </ReferenceInput>,
    <ReferenceInput label="Author" reference="admins" source="author_id">
      <SelectInput optionText="username" />
    </ReferenceInput>,
    <BooleanInput source="is_published" defaultValue={false} />,
  ];
  return (
    <List filters={ResourceFilters} {...props}>
      <Datagrid>
        {/* <TextField source="id" />
        <TextField source="title.vi" sortable={false} />

        <ReferenceField label="Author" reference="admins" source="author_id">
          <TextField source="username" />
        </ReferenceField>
        <ReferenceField
          label="Category"
          reference="post_categories"
          source="post_category_id"
        >
          <TextField source="title.vi" />
        </ReferenceField>
        <BooleanField source="is_published" />
        <DateField source="updated_at" />
        <DateField source="created_at" /> */}
        <ImageField source="image" title="name" />
        <TextField source="name" sortable />
        <TextField source="price" sortable />
        <TextField source="salePrice" sortable />
        <TextField source="snippet" sortable />
        <FunctionField
          label="Action"
          render={(record) => (
            <>
              <EditButton record={record} />
              <ShowButton record={record} />
            </>
          )}
        />
      </Datagrid>
    </List>
  );
}
export default ResourceList;
