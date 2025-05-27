const eventContainer = document.querySelector("#eventsContainer");
export const eventsData = [
    {
        id: new Date().valueOf(),
        date: new Date(2025, 4, 23),
        color: "tomato",
        title: "Mock event",
    },
];
export function renderEvents() {
    eventContainer.innerHTML = "";
    eventsData.forEach((event) => {
        eventContainer.innerHTML += `
    <div class="event-in-list border">
      <div style="border-left: 5px solid ${event.color}">
        <div>${event.title}</div>
        <div>${event.date.toLocaleDateString("en-GB")}</div>
      </div>
    </div>
    `;
    });
}
