module.exports = {
  id: true,
  name: true,
  russian: true,
  aired_on: true,
  released_on: true,
  kind: true,
  status: true,
  image: true,
  genres: [
    {
      id: true,
      name: true,
      russian: true,
    },
  ],
  studios: [
    {
      id: true,
      name: true,
    },
  ],
  url: (v) => v,
};
