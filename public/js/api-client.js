const BASE_URL = "https://api.jikan.moe";
const API_VERSION = "v4";
const GET = "GET";

const APIClient = function () {
  this.makeRequest = async ({ type, url }) => {
    return await new Promise((resolve, reject) => {
      $.ajax({
        type,
        url,
        dataType: "json",
      }).done((response) => {
        resolve(response.data);
      });
    });
  };

  this.getSeasonNow = async ({ limit, sort }) => {
    let data = [];
    try {
      let response = await this.makeRequest({
        type: GET,
        url: `${BASE_URL}/${API_VERSION}/seasons/now`,
      });

      if (response && response.length > 0) {
        const { season, year } = response[0];
        response.sort(sort);

        if (limit && response.length > limit) {
          response = response.slice(0, limit);
        }

        for (const item of response) {
          const newItem = {};
          (newItem.id = item.mal_id), (newItem.title = item.title);
          newItem.rank = item.rank;
          newItem.imageUrl = item.images.jpg.large_image_url;
          // Chech if synopsis or background exists
          if (_.isNull(item.synopsis) || _.isUndefined(item.synopsis)) {
            if (_.isNull(item.background) || _.isUndefined(item.background)) {
              newItem.synopsis = "";
            } else {
              newItem.synopsis = item.background.replace(/\n/g, "<br>");
            }
          } else {
            newItem.synopsis = item.synopsis.replace(/\n/g, "<br>");
          }
          data.push(newItem);
        }

        data.season = season;
        data.year = year;
      }
    } catch (error) {}

    return data;
  };

  this.getAnimeById = async (animeId) => {
    let data = {};

    try {
      let response = await this.makeRequest({
        type: GET,
        url: `${BASE_URL}/${API_VERSION}/anime/${animeId}`,
      });

      const {
        title,
        title_english,
        type,
        episodes,
        status,
        aired: { string: airedString },
        images: {
          jpg: { large_image_url: imageAnime },
        },
        score,
        genres,
        duration,
        rating,
        rank,
        synopsis,
        background,
      } = response;

      data.title = title;
      if (_.isNull(title_english) || _.isUndefined(title_english)) {
        data.title_english = "";
      } else {
        data.title_english = title_english;
      }
      data.type = type;
      data.episodes = episodes;
      data.status = status;
      data.airedString = airedString;
      data.score = score;
      data.genres = [];
      if (!_.isNull(genres) && !_.isUndefined(genres) && genres.length > 0) {
        data.genres = genres.map(({ name }) => name).join(", ");
      }
      data.duration = duration;
      data.rating = rating;
      data.rank = rank;
      data.imageAnime = imageAnime;
      if (_.isNull(synopsis) || _.isUndefined(synopsis)) {
        if (_.isNull(background) || _.isUndefined(background)) {
          data.synopsis = "";
        } else {
          data.synopsis = background.replace(/\n/g, "<br>");
        }
      } else {
        data.synopsis = synopsis.replace(/\n/g, "<br>");
      }
      console.log("data", data);
    } catch (error) {}

    return data;
  };

  this.getAnimeVideos = async (animeId) => {
    let data = [];

    try {
      let response = await this.makeRequest({
        type: GET,
        url: `${BASE_URL}/${API_VERSION}/anime/${animeId}/videos`,
      });

      if (
        !_.isNull(response) &&
        !_.isUndefined(response) &&
        !_.isEmpty(response)
      ) {
        const { episodes } = response;

        // Sort episodes before they get processed
        episodes.sort(
          ({ mal_id: episodeAID }, { mal_id: episodeBID }) =>
            episodeAID - episodeBID
        );

        if (
          !_.isNull(episodes) &&
          !_.isUndefined(episodes) &&
          !_.isEmpty(episodes)
        ) {
          for (const {
            title,
            episode,
            url,
            images: {
              jpg: { image_url: imageUrl },
            },
          } of episodes) {
            data.push({
              title,
              episode,
              url,
              imageUrl,
            });
          }
        }
      }
    } catch (error) {}

    return data;
  };

  this.getAnimeCharacteres = async (animeId) => {
    let data = [];

    try {
      let response = await this.makeRequest({
        type: GET,
        url: `${BASE_URL}/${API_VERSION}/anime/${animeId}/characters`,
      });

      if (
        !_.isNull(response) &&
        !_.isUndefined(response) &&
        !_.isEmpty(response)
      ) {
        for (const {
          character: {
            images: {
              jpg: { image_url: imageUrl },
            },
            name,
          },
          role,
          voice_actors,
        } of response) {
          const newCharacter = {
            name,
            imageUrl,
            role,
            voiceActors: [],
          };

          if (
            !_.isNull(voice_actors) &&
            !_.isUndefined(voice_actors) &&
            !_.isEmpty(voice_actors)
          ) {
            for (const {
              person: {
                images: {
                  jpg: { image_url: imageUrl },
                },
                name,
              },
              language,
            } of voice_actors) {
              newCharacter.voiceActors.push({
                name,
                language,
                imageUrl,
              });
            }
          }

          data.push(newCharacter);
        }
      }
    } catch (error) {}

    return data;
  };

  this.getAnimeEpisodes = async (animeId) => {
    let data = [];

    try {
      let response = await this.makeRequest({
        type: GET,
        url: `${BASE_URL}/${API_VERSION}/anime/${animeId}/episodes`,
      });

      if (
        !_.isNull(response) &&
        !_.isUndefined(response) &&
        !_.isEmpty(response)
      ) {
        for (const {
          title,
          title_japanese: japaneseTitle,
          title_romanji: romanjiTitle,
          aired,
          score,
        } of response) {
          data.push({
            title,
            japaneseTitle,
            romanjiTitle,
            aired,
            score,
          });
        }
      }
    } catch (error) {}

    return data;
  };
};

export default new APIClient();
