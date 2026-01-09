export default `query rootEvents($userId: Int!, $campus: String!) {
  event(
    where: {campus: {_eq: $campus}, usersRelation: {userId: {_eq: $userId}}, object: {type: {_in: ["module", "piscine"]}}}
    order_by: {endAt: asc}
    ) {
    id
    path
    endAt
    processedAt
    createdAt
    startAt
    parent {
      id
      path
    }
    progresses {
      grade
      path
    }
    registrations(order_by: {eventJoinedAt: asc}, limit: 1) {
      id
      capacity
      startAt
      endAt
      eventJoinedAt
    }
    usersRelation(where: {userId: {_eq: $userId}}, limit: 1) {
      createdAt
    }
    object {
      name
      type
    }
  }
}`;
