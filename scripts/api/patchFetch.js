import { renderPotsData } from "../pots.js";
// import { renderBudgetsData } from "../budgets.js";
import { pageType } from "../utilities/pageType.js";

// sends an update request to edit the pot on the server
async function patchFetch(chosenTheme) {
  const SUPABASE_URL = `https://dhpewqtvbasnugkfiixs.supabase.co/rest/v1/pots`;
  const PUBLIC_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocGV3cXR2YmFzbnVna2ZpaXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY1MzMsImV4cCI6MjA2MjQ1MjUzM30.8tYLfww-2KjIRsmJvCTQ1vBd3ghf0c4QNmW6TwPYVTk`;

  const modalId = document.querySelector("#edit-add-modal").querySelector("[data-id]").getAttribute("data-id");

  console.log(modalId);

  let body;
  if (pageType === "pots") {
    body = {
      name: document.querySelector("#input-1").value,
      target: parseFloat(document.querySelector("#input-2").value).toFixed(2),
      theme: chosenTheme,
    };
  } else if (pageType === "budgets") {
    body = {
      // natia's part
      // category: ...,
      maximum: parseFloat(document.querySelector("#input-2").value).toFixed(2),
      theme: chosenTheme,
    };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}?id=eq.${modalId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: PUBLIC_KEY,
        Authorization: `Bearer ${PUBLIC_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
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
    } else {
      console.error(response.status, response.statusText);
    }
  } catch (err) {
    console.error(err);
  }
}

export { patchFetch };
