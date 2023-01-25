import { storage } from "./getfirebasedb";

import { ref, getBlob } from "firebase/storage";

export default async function downloadHtmlReport(client) {
  return new Promise((resolve, reject) => {
    getBlob(ref(storage, client))
      .then((blob) => {
        let data = "";
        const reader = new FileReader();
        reader.addEventListener("loadend", () => {
          data = reader.result;
          const html = atob(data.split(",")[1]);

          document.getElementById("testframe" + client).src =
            "data:text/html;charset=utf-8," + escape(html);
          document.getElementById("testframe" + client).style =
            "height: 100%; width: 100%;";
          resolve(blob);
        });
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        // document.getElementById("download" + client).style.display = "block";
        // document.getElementById("download" + client).innerHTML = "Error";
      });
  });
}
