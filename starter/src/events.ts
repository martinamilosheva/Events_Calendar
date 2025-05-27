export type EventType = {
  id: number;
  date: Date;
  title: string;
  color: string;
};

const eventContainer = document.querySelector(
  "#eventsContainer"
) as HTMLDivElement;

export const eventsData: EventType[] = [
  {
    id: new Date().valueOf(),
    date: new Date(2025, 4, 23),
    color: "tomato",
    title: "Mock event",
  },
];

export function renderEvents(): void {
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
