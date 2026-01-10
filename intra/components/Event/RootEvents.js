import { data } from "../../lib/data/data.js";
import { EventDetails } from "./EventDetails.js";
import html from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";
const { div, input } = html;

const fetchUserInfo = async () => {
  // Return cached user data if available
  if (data.user) return data.user;

  const resp = await fetch(
    "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hasura-jwt-token")}`,
      },
      body: JSON.stringify({
        query: data.queries.userInfo,
      }),
      method: "POST",
      mode: "cors",
    }
  );

  const json = await resp.json();
  const user = json.data.user[0];

  // Cache user data
  data.user = user;
  return user;
};

export const fetchRootEvents = async () => {
  if (data.events.length > 0) return data.events;

  // Get user info first
  const user = await fetchUserInfo();
  if (!user) return [];

  const variables = {
    userId: user.id,
    campus: user.campus,
  };

  const resp = await fetch(
    "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hasura-jwt-token")}`,
      },
      body: JSON.stringify({
        query: data.queries.rootEvents,
        variables: variables,
      }),
      method: "POST",
      mode: "cors",
    }
  );

  const json = await resp.json();
  const events = json.data.event;
  data.events = events;
  return events;
};

export const RootEvents = async () => {
  const rootEvents = await fetchRootEvents();

  return div({ class: "events" }).add(
    div({ class: "chevron" }).add(input({ type: "checkbox" })),
    ...rootEvents.map(EventDetails)
  );
};
