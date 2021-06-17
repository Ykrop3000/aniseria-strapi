module.exports = {
  mutation: [
    `
      addBookmark(anime: ID!, type: ENUM_BOOKMARK_TYPE!): Bookmark
    `,
    `
      removeBookmark(anime: ID!): Boolean
    `
  ],
  query: `
      inBookmark(anime: ID!): String
    `,

  resolver: {
    Query: {
      inBookmark: {
        // policies: ["plugins::users-permissions.isAuthenticated"],
        resolver: "bookmark.inBookmark"
      }
    },
    Mutation: {
      addBookmark: {
        // policies: ["plugins::users-permissions.isAuthenticated"],
        resolver: "bookmark.addBookmark"
      },
      removeBookmark: {
        // policies: ["plugins::users-permissions.isAuthenticated"],
        resolver: "bookmark.remove"
      }
    }
  }
};
