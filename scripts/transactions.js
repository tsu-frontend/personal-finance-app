document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector('input[placeholder="Search transaction"]');
  const rows = document.querySelectorAll("tbody tr");

  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();

    rows.forEach((row) => {
      const name = row.querySelector("td span")?.textContent.toLowerCase() || "";
      const category = row.querySelectorAll("td")[1]?.textContent.toLowerCase() || "";

      const match = name.includes(searchTerm) || category.includes(searchTerm);

      row.style.display = match ? "" : "none";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector('input[placeholder="Search transaction"]');
  const sortSelect = document.querySelector("select"); // The first <select> is "Sort by"
  const tableBody = document.querySelector("tbody");

  const getRows = () => Array.from(tableBody.querySelectorAll("tr"));

  // --- SEARCH FUNCTIONALITY ---
  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();

    getRows().forEach((row) => {
      const name = row.querySelector("td span")?.textContent.toLowerCase() || "";
      const category = row.querySelectorAll("td")[1]?.textContent.toLowerCase() || "";

      const match = name.includes(searchTerm) || category.includes(searchTerm);
      row.style.display = match ? "" : "none";
    });
  });

  // --- SORT FUNCTIONALITY ---
  sortSelect.addEventListener("change", function (e) {
    const direction = e.target.value; // "Latest" or "Oldest"
    const rows = getRows();

    const sorted = rows.sort((a, b) => {
      const dateA = new Date(a.querySelectorAll("td")[2].textContent.trim());
      const dateB = new Date(b.querySelectorAll("td")[2].textContent.trim());

      return direction === "Latest" ? dateB - dateA : dateA - dateB;
    });

    // Re-append rows in new order
    sorted.forEach((row) => tableBody.appendChild(row));
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector('input[placeholder="Search transaction"]');
  const sortSelect = document.querySelectorAll("select")[0]; // First select = sort by
  const categorySelect = document.querySelectorAll("select")[1]; // Second select = category
  const tableBody = document.querySelector("tbody");

  const getRows = () => Array.from(tableBody.querySelectorAll("tr"));

  // --- FUNCTION: Apply filters (search + category) ---
  function filterRows() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value.toLowerCase();

    getRows().forEach((row) => {
      const name = row.querySelector("td span")?.textContent.toLowerCase() || "";
      const category = row.querySelectorAll("td")[1]?.textContent.toLowerCase() || "";

      const matchesSearch = name.includes(searchTerm) || category.includes(searchTerm);
      const matchesCategory = selectedCategory === "all transactions" || category === selectedCategory;

      row.style.display = matchesSearch && matchesCategory ? "" : "none";
    });
  }

  // --- SEARCH ---
  searchInput.addEventListener("input", filterRows);

  // --- CATEGORY FILTER ---
  categorySelect.addEventListener("change", filterRows);

  // --- SORT BY DATE ---
  sortSelect.addEventListener("change", function (e) {
    const direction = e.target.value; // "Latest" or "Oldest"
    const rows = getRows();

    const sorted = rows.sort((a, b) => {
      const dateA = new Date(a.querySelectorAll("td")[2].textContent.trim());
      const dateB = new Date(b.querySelectorAll("td")[2].textContent.trim());

      return direction === "Latest" ? dateB - dateA : dateA - dateB;
    });

    // Re-add sorted rows
    sorted.forEach((row) => tableBody.appendChild(row));
  });
});
