import { pageType } from "../utilities/pageType.js";
import { SUPABASE_URL, PUBLIC_KEY } from "./supabaseConfig.js";

import { renderPotsData } from "../pots.js";
// import { renderBudgetsData } from "../budgets.js";

async function fetchRequest(body, tableName, fetchType, modalId = null) {
  let method, headers, URL;
  if (fetchType === "POST") {
    URL = `${SUPABASE_URL}/rest/v1/${tableName}`;
    method = "POST";
    headers = {
      "Content-Type": "application/json",
      apikey: PUBLIC_KEY,
      Authorization: `Bearer ${PUBLIC_KEY}`,
      Prefer: "return=representation",
    };
  } else if (fetchType === "PATCH") {
    URL = `${SUPABASE_URL}/rest/v1/${tableName}?id=eq.${modalId}`;
    method = "PATCH";
    headers = {
      "Content-Type": "application/json",
      apikey: PUBLIC_KEY,
      Authorization: `Bearer ${PUBLIC_KEY}`,
      Prefer: "return=representation",
    };
  } else if (fetchType === "DELETE") {
    URL = `${SUPABASE_URL}/rest/v1/${tableName}?id=eq.${modalId}`;
    method = "DELETE";
    headers = {
      "Content-Type": "application/json",
      apikey: PUBLIC_KEY,
      Authorization: `Bearer ${PUBLIC_KEY}`,
    };
  }

  try {
    const response = await fetch(`${URL}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    });

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
    } else {
      console.error(response.status, response.statusText);
    }
  } catch (err) {
    console.error(err);
  }
}

export { fetchRequest };
