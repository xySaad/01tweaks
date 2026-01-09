import html from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";
import { getParam, navigate } from "../../../lib/router.js";
const { div } = html;

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const date = new Date(dateStr);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const handleClick = (id) => {
  const url = new URL(location.href);
  url.searchParams.set("event", id);
  localStorage.setItem("lastEventId", id);

  navigate(url.toString());
};

const eventId = getParam("event");
export const EventDetails = (data) => {
  const isSuccess = data.progresses?.[0]?.grade === 1;
  const endTime = new Date(data.endAt);
  const now = new Date();
  const isOngoing = endTime > now;
  const startDate = formatDate(data.usersRelation[0].createdAt);
  const endDate = formatDate(data.endAt);

  let statusClass;
  if (isOngoing) {
    statusClass = "event-ongoing";
  } else {
    statusClass = isSuccess ? "event-success" : "event-failed";
  }

  return div({
    active: ($) => data.id == $(eventId),
    class: `event ${statusClass}`,
    "data-id": data.id,
    onclick: () => handleClick(data.id),
    ondblclick: () => navigate(`/intra${data.path}?event=${data.id}`),
  }).add(
    div({ class: "event-header" }).add(
      div({ class: "path", textContent: `${data.object.name} #${data.id}` })
    ),
    div({ class: "dates", textContent: `${startDate} - ${endDate}` }).add()
  );
};
