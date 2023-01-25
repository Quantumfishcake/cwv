import DisplayClientData from "./displayClientData.js";
import Graph from "./graph.js";
import { useState, useCallback, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import getIndividualClientDataQuery from "../helpers/getIndividualClientDataQuery.js";

export default function clientDataContainer({ clientList }) {
  const [clientData, setClientData] = useState([]);

  // const pushClientData = (newClientData) => {
  //   setClientDataToState(newClientData);
  // };

  // const setClientDataToState = (newClientData) => {
  //   setClientData([...clientData, newClientData]);
  // };

  // const pushClientData = useCallback((newClientData) => setClientData([...clientData, newClientData]),[]);

  const getTotalClientDataQuery = () => {
    // return clientList.map((client) => {
    //   return useQuery(["clientData", client.client_id], () =>
    //     getIndividualClientDataQuery(client.client_id)
    //   );
    // });
    const clientDataPromises = clientList.map((client) => {
      return getIndividualClientDataQuery(client.client_id, client.name);
    });

    Promise.all(clientDataPromises)
      .then((results) => {
        setClientData(results);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    setClientData(getTotalClientDataQuery());
  }, []);

  return (
    <div className="flex">
      <div className="flex flex-col gap-5">
        {clientData && clientData.map((client) => (
          <DisplayClientData
            clientData={client}
            clientName={client.name}
          />
        ))}
      </div>
      {clientData && clientData.length > 0 ?
        <Graph clientData={clientData} /> 
        : null}
    </div>
  );
}
