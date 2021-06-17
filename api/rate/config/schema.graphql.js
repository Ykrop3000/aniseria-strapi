module.exports = {
  mutation: `
    removeRate(anime: ID, comment: ID): Boolean
    `,
  resolver: {
    Mutation: {
      removeRate: {
        // policies: ["plugins::users-permissions.isAuthenticated"],
        resolver: "rate.remove"
      }
    }
  }
};
