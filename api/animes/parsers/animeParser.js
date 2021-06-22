const axios = require("axios");
var colors = require("colors");
const download = require("image-downloader");
var FormData = require("form-data");
var fs = require("fs");

const sleepRequest = (milliseconds, originalRequest) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(axios(originalRequest)), milliseconds);
  });
};

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const {
      config,
      response: { status }
    } = error;
    const originalRequest = config;

    if (status === 429) {
      return sleepRequest(1000, originalRequest);
    } else {
      return Promise.reject(error);
    }
  }
);

async function getPage(url, _params = {}) {
  const params = {
    limit: 50,
    order: "popularity",
    ..._params
  };
  const resp = await axios.get(url, { params });
  resp.data.forEach((data, i) => {
    setTimeout(async () => {
      const params = {
        token: "b7cc4293ed475c4ad1fd599d114f4435",
        shikimori_id: data.id,
        with_episodes: true
      };
      const kodik = await axios.get("https://kodikapi.com/search", { params });

      const anime = await axios.get(
        "https://shikimori.one/api/animes/" + data.id
      );
      let result = {};

      if (kodik.data.results[0]) {
        const kodik_data = kodik.data.results[0];

        result = Object.assign(anime.data, {
          kp_id: kodik_data.kinopoisk_id,
          imdb_id: kodik_data.imdb_id,
          worldart_id: kodik_data.worldart_link
        });
      } else {
        result = anime.data;
      }

      const form = new FormData();
      const options = {
        url: "https://shikimori.one" + result.image.original,
        dest: "./imageBuff" // will be saved to /path/to/dest/image.jpg
      };
      // delete result.url;
      // genres: result.genres.map((e) => e.id),
      // studios: result.studios.map((e) => e.id),
      download
        .image(options)
        .then(async ({ filename }) => {
          const fi = await fs.createReadStream(filename);
          form.append("files", fi);
          form.append("ref", "animes");
          axios
            .post("http://localhost:1337/upload", form, {
              headers: form.getHeaders()
            })
            .then(async res => {
              console.log(colors.yellow("[*] : uploaded"));

              axios
                .post("http://localhost:1337/animes", {
                  ...result,
                  name: result.name,
                  russian: result.russian,
                  shiki_id: result.id.toString(),
                  english: result.english.join(","),
                  japanese: result.japanese.join(","),
                  url: result.url.split("/")[2],
                  genres: result.genres.map(e => e.id),
                  studios: result.studios.map(e => e.id),
                  score: Number(result.score),
                  votes: result.rates_scores_stats
                    .map(e => e.value)
                    .reduce(function(
                      previousValue,
                      currentValue,
                      index,
                      array
                    ) {
                      return Number(previousValue) + Number(currentValue);
                    }),
                  image: res.data[0].id
                })
                .then(r => {
                  console.log(colors.green("[+] : " + r.data.name));
                })
                .catch(err => {
                  console.log(colors.red(err.response.data.message));
                });
            })
            .catch(err => {
              console.log(colors.red("Error upload image"));
            });
        })
        .catch(err => console.log(err.data));
    }, i * 1000);
  });

  return resp.data.length == 0 ? false : true;
}

const main = async () => {
  console.log(colors.bgGreen("[!!!] : Started"));

  let next = true;
  let page = 1;
  while (next) {
    next = await getPage("https://shikimori.one/api/animes", { page });
    page += 1;
  }

  console.log(colors.bgGreen("[!!!] : End"));
};

if (!module.parent) {
  try {
    main();
  } catch (err) {
    console.log(err);
  }
}

async function parse(id) {
  console.log("parsing");
  const anime = await axios.get("https://shikimori.one/api/animes/" + id);
  let result = {};

  const params = {
    token: "b7cc4293ed475c4ad1fd599d114f4435",
    shikimori_id: id,
    with_episodes: true
  };
  const kodik = await axios.get("https://kodikapi.com/search", { params });

  if (kodik.data.results[0]) {
    const kodik_data = kodik.data.results[0];

    result = Object.assign(anime.data, {
      kp_id: kodik_data.kinopoisk_id,
      imdb_id: kodik_data.imdb_id,
      worldart_id: kodik_data.worldart_link
    });
  } else {
    result = anime.data;
  }
  console.log(result);
  const form = new FormData();
  const options = {
    url: "https://shikimori.one" + result.image.original,
    dest: "./imageBuff" // will be saved to /path/to/dest/image.jpg
  };

  download
    .image(options)
    .then(async ({ filename }) => {
      const fi = await fs.createReadStream(filename);
      form.append("files", fi);
      form.append("ref", "animes");
      axios
        .post("http://localhost:1337/upload", form, {
          headers: form.getHeaders()
        })
        .then(async res => {
          console.log(colors.yellow("[*] : uploaded"));

          axios
            .post("http://localhost:1337/animes", {
              ...result,
              name: result.name,
              russian: result.russian,
              shiki_id: result.id.toString(),
              english: result.english.join(","),
              japanese: result.japanese.join(","),
              url: result.url.split("/")[2],
              genres: result.genres.map(e => e.id),
              studios: result.studios.map(e => e.id),
              score: Number(result.score),
              image: res.data[0].id
            })
            .then(r => {
              console.log(colors.green("[+] : " + r.data.name));
              return r.data;
            })
            .catch(err => {
              console.log(colors.red(err.response.data.message));
            });
        })
        .catch(err => {
          console.log(colors.red("Error upload image"));
        });
    })
    .catch(err => console.log(err.data));
}

module.exports.parse = parse;
