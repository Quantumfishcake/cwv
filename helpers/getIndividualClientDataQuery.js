import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "./getfirebasedb.js";

const getIndividualClientDataQuery = async (client_id, name) => {
  const q = query(
    collection(db, "scores"),
    where("client_id", "==", client_id),
    orderBy("date", "desc")
  );
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ client_name: name, client_id: client_id, date: new Date(doc.data().date).toLocaleDateString("en-US"), smart_page_score: doc.data().smart_page_score, category_page_score: doc.data().category_page_score });
  });
  return data;
};

export default getIndividualClientDataQuery;
