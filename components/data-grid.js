import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

export default function DataGridContainer({ columns, rows }) {
  return <ReactDataGrid columns={columns} dataSource={rows} sortable={true} />;
}
