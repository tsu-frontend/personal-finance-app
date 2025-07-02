import { pageType } from "../utilities/pageType.js";
import { SUPABASE_URL, PUBLIC_KEY } from "./supabaseConfig.js";

// import { renderPotsData } from "../pots.js";
// import { renderBudgetsData } from "../budgets.js";

async function fetchRequest(config) {
  const { tableName, method, modalId, body } = config;
  let URL;

  const headers = {
    "Content-Type": "application/json",
    apikey: PUBLIC_KEY,
    Authorization: `Bearer ${PUBLIC_KEY}`,
    Prefer: "return=representation",
  };

  if (method === "POST" || method === "GET") {
    URL = `${SUPABASE_URL}/rest/v1/${tableName}`;
  } else if (method === "PATCH" || method === "DELETE") {
    URL = `${SUPABASE_URL}/rest/v1/${tableName}?id=eq.${modalId}`;
  }

  try {
    let response;
    if (method === "GET") {
      response = await fetch(URL, {
        method: "GET",
        headers,
      });
      return await response.json();
    } else {
      response = await fetch(URL, {
        method,
        headers,
        body: JSON.stringify(body),
      });
    }
    // update the ui with the new data if the fetch request was successful (temporarily! will be moved to files that render the data)
    if (response.ok) {
      if (method !== "DELETE") {
        // close the edit add modal
        const editAddModal = document.querySelector("#edit-add-modal");
        if (editAddModal) {
          editAddModal.classList.add("animate-fade-out");
          setTimeout(() => {
            editAddModal.remove();
            // resume page scrolling
            document.body.classList.remove("overflow-hidden");
          }, 200);
        }
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
