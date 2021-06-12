module.exports = {
  id: true,
  body: true,
  author: {
    id: true,
    username: true,
    avatar: true,
    role: true,
  },
  anime: (v) => v.id,
  updated_at: true,
};
