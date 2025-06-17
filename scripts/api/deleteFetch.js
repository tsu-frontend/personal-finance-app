import { ServiceManager } from "supabase-service-manager";
import { renderPotsData } from "../pots.js";
// import { renderBudgetsData } from "../budgets.js";
import { pageType } from "../utilities/pageType.js";
const config = {
  url: "https://dhpewqtvbasnugkfiixs.supabase.co",
  anonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocGV3cXR2YmFzbnVna2ZpaXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY1MzMsImV4cCI6MjA2MjQ1MjUzM30.8tYLfww-2KjIRsmJvCTQ1vBd3ghf0c4QNmW6TwPYVTk",
};
const sm = new ServiceManager({ supabase: config });
console.log(sm);
const SUPABASE_URL = `https://dhpewqtvbasnugkfiixs.supabase.co`;
const PUBLIC_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocGV3cXR2YmFzbnVna2ZpaXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY1MzMsImV4cCI6MjA2MjQ1MjUzM30.8tYLfww-2KjIRsmJvCTQ1vBd3ghf0c4QNmW6TwPYVTk`;

async function deleteFetch(modalId) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/pots?id=eq.${modalId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        apikey: PUBLIC_KEY,
        Authorization: `Bearer ${PUBLIC_KEY}`,
      },
    });
    if (response.ok) {
      if (pageType === "pots") {
        renderPotsData();
      } else if (pageType === "budgets") {
        renderBudgetsData();
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export { deleteFetch };
