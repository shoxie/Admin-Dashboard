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
  BooleanInput,
  SelectInput,
} from "react-admin";

function ResourceList(props) {
  const ResourceFilters = [
    <ReferenceInput
      label="Parent Category"
      reference="post_categories"
      source="parent_id"
    >
      <SelectInput optionText={`title.vi`} />
    </ReferenceInput>,
    <BooleanInput source="is_published" />,
  ];
  return (
    <List filters={ResourceFilters} {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField sortable={false} source={`title.vi`} />
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
