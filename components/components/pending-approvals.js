const cardData = [
    {
      count: "08",
      label: "Transaction",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      action: () => alert("Viewing Transaction")
    },
    {
      count: "03",
      label: "Application",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      action: () => alert("Viewing Application")
    },
    {
      count: "01",
      label: "Count",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      action: () => alert("Viewing Count")
    },
  ];

  const cardsContainer = document.getElementById("cardsContainer");

  cardData.forEach(({ count, label, description, action }) => {
    const card = document.createElement("div");
    card.className = "pa-card";
    card.innerHTML = `
      <div class="pa-card-title">${count}</div>
      <div class="pa-card-subtitle">${label}</div>
      <div class="pa-card-text">${description}</div>
      <div class="pa-view-button">View</div>
    `;
    card.querySelector(".pa-view-button").addEventListener("click", action);
    cardsContainer.appendChild(card);
  });