import { useQuery } from "@tanstack/react-query";
import getIndividualClientDataQuery from "../helpers/getIndividualClientDataQuery.js";
import Collapse from "./collapse.js";
import DataGridContainer from "../components/data-grid.js";
import bodyStyles from "../styles/Body.module.css";
import downloadHtmlReport from "../helpers/downloadHtml.js";
import SpinnerOnLoadButton from "../components/spinnerOnLoadButton.js";

const columns = [
  { key: "date", name: "date", sortable: true },
  { key: "smart_page_score", name: "smart_page_score" },
  { key: "category_page_score", name: "category_page_score" },
];

const displayClientData = ({ clientData }) => {
  // const clientDataQuery = useQuery(["clientData", clientId], () =>
  //   getIndividualClientDataQuery(clientId)
  // );
  // if (clientDataQuery.isLoading) {
  //   console.log("loading");
  //   return <div>{clientName} Loading...</div>;
  // }
  // if (clientDataQuery.isError) {
  //   console.log("error", clientDataQuery.data);
  //   return <div>{clientName} Error...</div>;
  // }
  // if (clientDataQuery.isSuccess && clientDataQuery.data) {
    return (
      <div className="flex flex-col gap-5">
        <Collapse
          title={titleContainer(clientData)}
          content={datagridContentContainer(clientData)}
        />
      </div>
    );
  // }
};

const datagridContentContainer = (client) => {
  return (
    <div className="flex">
      <div className="flex-1 w-0">
        <DataGridContainer columns={columns} rows={client} />
      </div>
      <div className="flex-1 w-0 flex items-center justify-center">
        <SpinnerOnLoadButton
          id={"download" + client.client_name}
          text={"More info"}
          onClickFunction={() => downloadHtmlReport(client.client_name)}
        />
        <iframe
          id={"testframe" + client.client_name}
          src=""
          style={{ width: 0, height: 0 }}
          seamless
        ></iframe>
      </div>
    </div>
  );
};

const titleContainer = (client) => {
  if (!client[0]) return <div>empty</div>;
  const latestLux = +client[0].smart_page_score;
  const latestCategory = +client[0].category_page_score;
  const color = latestLux > latestCategory ? "green" : "red";
  const color2 = latestCategory > latestLux ? "green" : "red";
  return (
    <div className="flex gap-5">
      <h3
        className="text-2xl font-bold capitalize p-1 flex-1"
        style={{
          color: latestLux > latestCategory ? "green" : "red",
        }}
      >
        {client.client_name}
      </h3>
      <div className="flex-1 flex justify-center items-center">
        <span className="text-base">LUX latest score</span>
        <span className="text-3xl p-2" style={{ color }}>
          {latestLux}
        </span>
      </div>
      <div className="flex-1  flex flex-row-reverse justify-center items-center">
        <span className="text-base">Client category page Score </span>
        <span className="text-3xl p-2" style={{ color: color2 }}>
          {latestCategory}
        </span>
      </div>
    </div>
  );
};

export default displayClientData;
