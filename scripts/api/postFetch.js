// sends the pot data to json: id, name, target, and theme
async function postFetch(chosenTheme, renderData, tableName, fetchInfo) {
  const SUPABASE_URL = `https://dhpewqtvbasnugkfiixs.supabase.co`;
  const PUBLIC_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRocGV3cXR2YmFzbnVna2ZpaXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY1MzMsImV4cCI6MjA2MjQ1MjUzM30.8tYLfww-2KjIRsmJvCTQ1vBd3ghf0c4QNmW6TwPYVTk`;

  try {
    // build data object with dynamic keys and values
    const bodyObj = {
      id: crypto.randomUUID(),
      theme: chosenTheme,
      [fetchInfo.fetchValue2]: parseFloat(document.querySelector("#input-2").value).toFixed(2),
      [fetchInfo.fetchValue1.key]: fetchInfo.fetchValue1.value(),
      [fetchInfo.fetchValue3.key]: fetchInfo.fetchValue3.value(),
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/${tableName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: PUBLIC_KEY,
        Authorization: `Bearer ${PUBLIC_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(bodyObj),
    });
    // update the ui with the new data if the post request was successful
    if (response.ok) renderData();
  } catch (err) {
    console.error(err);
  }
}

export { postFetch };
