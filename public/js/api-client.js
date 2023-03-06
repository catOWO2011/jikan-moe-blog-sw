const BASE_URL = 'https://api.jikan.moe';
const API_VERSION = 'v4';
const GET = 'GET';

const APIClient = function() {
  this.makeRequest = async ({ type, url}) => {
    return await new Promise((resolve, reject) => {
      $.ajax({
        type,
        url,
        dataType: 'json'
      }).done((response) => {
        resolve(response.data);
      });
    });
  },

  this.getSeasonNow = async ({ limit, sort }) => {
    let data = [];
    try {
      data = await this.makeRequest({
        type: GET,
        url: `${BASE_URL}/${API_VERSION}/seasons/now`
      });

      if (data && data.length > 0) {
        const { season, year } = data[0];
        data.sort(sort);

        if (limit && data.length > limit) {
          data = data.slice(0, limit);
        }

        data = _.map(data, item => {
          const newItem = {};
          newItem.id = item.mal_id,
          newItem.title = item.title;
          newItem.rank = item.rank;
          newItem.imageUrl = item.images.jpg.large_image_url;
          newItem.synopsis = item.synopsis.replace(/\n/g, '<br>');
          return newItem;
        })

        data.season = season;
        data.year = year;
      }
    } catch (error) {
      
    }

    return data;
  }
};

export default new APIClient();