import { eventsData, EventType, renderEvents } from "./events.js";

const dateInput = document.querySelector("#date") as HTMLInputElement;
const titleInput = document.querySelector("#title") as HTMLInputElement;
const colorInput = document.querySelector("#color") as HTMLInputElement;

const prevBtn = document.querySelector("#prevBtn") as HTMLButtonElement;
const nextBtn = document.querySelector("#nextBtn") as HTMLButtonElement;
const calendarBody = document.querySelector("#calendar-body") as HTMLDivElement;
const form = document.querySelector("#addEvent") as HTMLFormElement;

const today = new Date();

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function renderMonthAndYear(month: number, year: number) {
  const monthAndYear = document.querySelector(
    "#monthAndYear"
  ) as HTMLDivElement;

  monthAndYear.textContent = `${monthLabels[month]} ${year}`;
}

function onNext() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  renderCalendar(currentMonth, currentYear, eventsData);
}

function onPrev() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  renderCalendar(currentMonth, currentYear, eventsData);
}

nextBtn.addEventListener("click", onNext);
prevBtn.addEventListener("click", onPrev);

renderMonthAndYear(currentMonth, currentYear);

function renderCalendar(month: number, year: number, allEvents: EventType[]) {
  renderEvents();
  renderMonthAndYear(month, year);
  const firstDayOfMonth = new Date(year, month).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let date = 1;

  calendarBody.innerHTML = "";

  const thisYearAndMonthEvents = allEvents.filter(
    (event) =>
      event.date.getFullYear() === year && event.date.getMonth() === month
  );

  for (let i = 0; i < 6; i++) {
    const week = document.createElement("div");
    week.classList.add("calendar-week");

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("empty-cell");
        week.append(emptyCell);
      } else if (date <= daysInMonth) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("day-cell");
        dayCell.innerHTML = `<span>${date.toString()}</span>`;

        if (
          today.getFullYear() === year &&
          today.getMonth() === month &&
          today.getDate() === date
        ) {
          dayCell.classList.add("today");
        }

        if (thisYearAndMonthEvents.length > 0) {
          const todaysEvents = thisYearAndMonthEvents.filter(
            (event) => event.date.getDate() === date
          );

          if (todaysEvents.length > 0) {
            dayCell.classList.add("event-day");

            todaysEvents.forEach((event) => {
              const eventsContainer = document.createElement("div");
              eventsContainer.classList.add("event");

              eventsContainer.style.borderLeft = `4px solid ${event.color}`;
              eventsContainer.textContent = event.title;

              dayCell.append(eventsContainer);
            });
          }
        }

        week.append(dayCell);
        date++;
      }
    }
    calendarBody.append(week);
  }
}

renderCalendar(currentMonth, currentYear, eventsData);

function addEvent(e: SubmitEvent) {
  e.preventDefault();

  eventsData.unshift({
    id: new Date().valueOf(),
    date: new Date(dateInput.value),
    title: titleInput.value,
    color: colorInput.value,
  });

  form.reset();
  renderCalendar(currentMonth, currentYear, eventsData);
}

form.addEventListener("submit", addEvent);
