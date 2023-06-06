import apiClient from "./api-client.js";
import Carousel from "./components/carousel.js";
import Navbar from "./components/navbar.js";

const Utils = function () {
  this.buildCurrenSeasonCarousel = async ({ selector, classData }) => {
    const data = await apiClient.getSeasonNow({
      limit: 7,
      sort: (itemA, itemB) => itemB.score - itemA.score,
    });

    const htmlCarousel = _.template(Carousel.TEMPLATE)({
      items: data,
      classData,
    });

    $(selector).html(htmlCarousel);
    $(selector).addClass("currentSeasonSection");

    new Carousel({ targetClass: classData });
  };

  this.buildAnimeContainer = async ({ selector, classData }) => {
    const data = await apiClient.getSeasonNow({
      limit: 8,
      sort: (a, b) => b.popularity - a.popularity,
    });

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
                  <div class="anime-first-information">
                    <div class="anime-options">
                      <div class="button-watch-container">
                        <div class="button-watch">
                          <button class="button-watch-anime">Watch</button>
                        </div>
                      </div>
                    </div>
                    <div class="anime-description-container">
                      <div class="anime-name-container">
                        <span class="anime-name"><%- item.title %></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          <%
            });
          %>
        </div>
      </div>`;

    const htmlCurrentSeason = _.template(CONTAINER_TEMPLATE)({
      items: data,
      classData,
    });
    $(selector).html(htmlCurrentSeason);
  };

  this.buildNavbar = () => {
    new Navbar();
  };
};

export default new Utils();
