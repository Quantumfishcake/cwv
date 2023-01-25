import { collection, getDocs } from "firebase/firestore";
import { db } from "./getfirebasedb.js";

const getClientListQuery = async () => {
  // get all clients from clientlist collection in firebase db
  const querySnapshot = await getDocs(collection(db, "clientList"));
  const querySnapshotIds = querySnapshot.docs.map((doc) => doc.data());
  const clientList = await querySnapshotIds;
  return clientList;
};

export default getClientListQuery;
