function openEditModal(modalId) {
  const data = JSON.parse(localStorage.getItem("data") || "[]");
  const modalData = data.find((modal) => modal.id === modalId);

  console.log(modalId);
}

export { openEditModal };
