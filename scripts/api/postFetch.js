import { renderPotsData } from "../pots.js";
// import { renderBudgetsData } from "../budgets.js";
import { pageType } from "../utilities/pageType.js";

// sends an update request to add a pot/budget
async function postFetch(chosenTheme) {
  const SUPABASE_URL = `https://dhpewqtvbasnugkfiixs.supabase.co`;
  const PUBLIC_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocGV3cXR2YmFzbnVna2ZpaXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY1MzMsImV4cCI6MjA2MjQ1MjUzM30.8tYLfww-2KjIRsmJvCTQ1vBd3ghf0c4QNmW6TwPYVTk`;

  let body;
  if (pageType === "pots") {
    body = {
      id: crypto.randomUUID(),
      name: document.querySelector("#input-1").value,
      target: parseFloat(document.querySelector("#input-2").value),
      total: 0,
      theme: chosenTheme,
    };
  } else if (pageType === "budgets") {
    body = {
      id: crypto.randomUUID(),
      // natia's part
      // category: ...,
      maximum: parseFloat(document.querySelector("#input-2").value),
      theme: chosenTheme,
    };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${pageType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: PUBLIC_KEY,
        Authorization: `Bearer ${PUBLIC_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(body),
    });

    // update the ui with the new data if the post request was successful
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

export { postFetch };
