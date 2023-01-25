import { useQuery } from "@tanstack/react-query";
import "react-data-grid/lib/styles.css";
import getClientListQuery from "../helpers/getClientListQuery.js";
import ClientContainer from "../components/clientContainer.js";

// load api data on page load
export default function MainContent() {
  // Queries
  const clientList = useQuery({ queryKey: ["clientList"], queryFn: getClientListQuery });

  if(clientList.isLoading) {
    return (<div>Loading...</div>)
  }
  if(clientList.isError) {
    return <div>Error...</div>
  }
  if(clientList.isSuccess) {
    return (
      <ClientContainer clientList={clientList.data} />
    
    );
  }

}
