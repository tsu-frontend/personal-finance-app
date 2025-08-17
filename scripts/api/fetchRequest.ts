import { pageType } from "../utilities/pageType.js";
import { SUPABASE_URL, PUBLIC_KEY } from "./supabaseConfig.js";
// import { potsManager } from "../pots.js";
// import { renderBudgetsData } from "../budgets.js";

interface FetchConfig {
  tableName: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  modalId: string | null;
  body: any;
}

class FetchRequest {
  static async request(config: FetchConfig): Promise<any> {
    const { tableName, method, modalId, body } = config;
    let URL: string;
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
      if (response.ok) {
        if (method !== "DELETE") {
          const editAddModal = document.querySelector("#edit-add-modal");
          if (editAddModal) {
            editAddModal.classList.add("animate-fade-out");
            setTimeout(() => {
              editAddModal.remove();
              document.body.classList.remove("overflow-hidden");
            }, 200);
          }
          // If you need to refresh pots, do it outside this class after fetch completes.
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export { FetchRequest };
