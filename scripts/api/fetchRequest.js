import { pageType } from "../utilities/pageType.js";
import { SUPABASE_URL, PUBLIC_KEY } from "./supabaseConfig.js";

import { renderPotsData } from "../pots.js";
// import { renderBudgetsData } from "../budgets.js";

async function fetchRequest(tableName, fetchType, body = null, modalId = null) {
  if (!fetchType === "POST" || !fetchType === "PATCH" || !fetchType === "DELETE") {
    throw new Error("fetchType is not valid");
  }
  if (typeof tableName !== "string") {
    throw new Error("tableName is not valid");
  }

  const URL = fetchType === "POST" || fetchType === "GET" ? `${SUPABASE_URL}/rest/v1/${tableName}` : `${SUPABASE_URL}/rest/v1/${tableName}?id=eq.${modalId}`;
  const headers = {
    "Content-Type": "application/json",
    apikey: PUBLIC_KEY,
    Authorization: `Bearer ${PUBLIC_KEY}`,
    Prefer: "return=representation",
  };

  if (fetchType === "GET") {
    const response = await fetch(`${URL}`, {
      method: fetchType,
      headers: headers,
    });

    return await response.json();
  }

  try {
    const response = await fetch(`${URL}`, {
      method: fetchType,
      headers: headers,
      body: JSON.stringify(body),
    });

    console.log(await response.json());
    if (response.ok) {
      // update the ui with the new data if the fetch request was successful (temporarily! will be moved to files that render the data)
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
    } else {
      console.error(response.status, response.statusText);
    }
  } catch (err) {
    console.error(err);
  }
}

export { fetchRequest };
