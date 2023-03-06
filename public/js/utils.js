import apiClient from './api-client.js';
import Carousel from './components/carousel.js';

const Utils = function () {
  this.buildCurrenSeasonCarousel = async ({ selector, classData }) => {
    const data = await apiClient.getSeasonNow({ limit: 7, sort: (itemA, itemB) => itemB.score - itemA.score});
    
    const htmlCarousel = _.template(Carousel.TEMPLATE)({ items: data, classData });

    $(selector).html(htmlCarousel);

    new Carousel({ targetClass: classData });
  };

  this.buildAnimeContainer = async ({ selector, classData }) => {
    const data = await apiClient.getSeasonNow({ limit: 4, sort: (a, b) => b.popularity - a.popularity});

    const CONTAINER_TEMPLATE = `
      <div class="section-container">
        <div class="title-container">
          <div class="title">

            <h2><%- items.season %></h2>

          </div>
        </div>
        <div class="anime-container">
          <%
            _.each(items, (item, key, list) => {
          %>

            <div class="anime-card-description">
              <div class="anime-card-inner">
                <div class="anime-image">
                  <a class="anime-link" href="#">
                    <div 
                      class="image-container"
                      style="
                        background-image: url('<%- item.imageUrl %>');
                        background-position: center center;
                      "
                    >
                    </div>
                  </a>
                </div>
                <div class="anime-information">
                  <span class="anime-name"><%- item.title %></span class="anime-name">
                </div>
              </div>
            </div>

          <%
            });
          %>
        </div>
      </div>`;

    const htmlCurrentSeason = _.template(CONTAINER_TEMPLATE) ({ items: data, classData });
    $(selector).html(htmlCurrentSeason);
  };
};

export default new Utils();