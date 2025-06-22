import { pageType } from "../utilities/pageType.js";
import { SUPABASE_URL, PUBLIC_KEY } from "./supabaseConfig.js";

import { renderPotsData } from "../pots.js";
// import { renderBudgetsData } from "../budgets.js";

async function fetchRequest(tableName, fetchType, body = null, modalId = null) {
  let URL;

  const headers = {
    "Content-Type": "application/json",
    apikey: PUBLIC_KEY,
    Authorization: `Bearer ${PUBLIC_KEY}`,
    Prefer: "return=representation",
  };

  if (fetchType === "POST" || fetchType === "GET") {
    URL = `${SUPABASE_URL}/rest/v1/${tableName}`;
  } else if (fetchType === "PATCH" || fetchType === "DELETE") {
    URL = `${SUPABASE_URL}/rest/v1/${tableName}?id=eq.${modalId}`;
  }

  try {
    let response;
    if (fetchType === "GET") {
      response = await fetch(URL, {
        method: "GET",
        headers,
      });
      return await response.json();
    } else {
      response = await fetch(URL, {
        method: fetchType,
        headers,
        body: JSON.stringify(body),
      });
    }
    // update the ui with the new data if the fetch request was successful (temporarily! will be moved to files that render the data)
    if (response.ok) {
      if (fetchType !== "DELETE") {
        // close the edit add modal
        const editAddModal = document.querySelector("#edit-add-modal");
        editAddModal.classList.add("animate-fade-out");
        setTimeout(() => {
          editAddModal.remove();

          // resume page scrolling
          document.body.classList.remove("overflow-hidden");
        }, 200);

        if (pageType === "pots") {
          renderPotsData();
        } else if (pageType === "budgets") {
          renderBudgetsData();
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export { fetchRequest };
