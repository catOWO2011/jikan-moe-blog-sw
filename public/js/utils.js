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
                <div 
                  class="image-container"
                  style="
                    background-image: url('<%- item.imageUrl %>');
                    background-position: center center;
                  "
                >
                </div>
                </div>
                <div class="anime-information">
                  <div class="anime-first-information">
                    <div class="anime-options">
                      <div class="button-watch-container">
                        <div class="button-watch">
                          <a class="button-watch-anime" data-anime-id='<%- item.id %>' href='#anime-details-page/<%- item.id %>'>Watch</a>
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

  this.buildSpinnerComponent = ({ selector }) => {
    const CONTAINER_TEMPLATE = `
      <div class="spinner-component">
        <div class="box">
          <div class="content">
            <img src="img/sakamoto-sleeping.gif">
          </div>
        </div>
      </div>
    `;
    const htmlCurrentSeason = _.template(CONTAINER_TEMPLATE)({});
    $(selector).html(htmlCurrentSeason);
  };

  this.buildNavbar = () => {
    new Navbar();
  };

  this.buildAnimeDetailsPage = async ({ selector, animeId }) => {
    const animeInformation = await apiClient.getAnimeById(animeId);

    const CONTAINER_TEMPLATE = `
      <div>
        <div class="container-anime-title">
          <div class="title-anime">
            <!-- title -->
            <h1><%- item.title %></h1>
            <!-- title_english -->
            <p><%- item.title_english %></p>
          </div>
        </div>
        <div class="purple-line">
          &nbsp;
        </div>
        <div class="anime-details-container">
          <div class="anime-general-details">
            <div class="anime-image-section-detail">
              <div class="anime-image-container">
                <img class="anime-main-image" src="<%- item.imageAnime %>" alt="main-anime-image">
                <div class="score">
                  <ion-icon class="icon" name="ribbon-outline"></ion-icon>
                  <div class="score-note">
                    <h1><%- item.score %></h1><!-- score -->
                    <span>Score</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="anime-information-container">
              <div class="subsection-anime-info-title">
                <h1>Information</h1>
              </div>
              <div class="anime-information-details">
                <div class="synopsis">
                  <!-- synopsis -->
                  <p><%= item.synopsis %></p>
                </div>
              </div>
            </div>
          </div>
          <div class="table-info">
                  <div class="cell-info">
                    <div>
                      <ion-icon name="desktop-outline"></ion-icon>
                      <span class="cell-label">Type  </span>
                    </div>
                    <!-- type -->
                    <div>
                      <span class="cell-content"><%- item.type %></span>
                    </div>
                  </div>
                  <div class="cell-info">
                    <div>
                      <ion-icon name="film-outline"></ion-icon>
                      <span class="cell-label">Episodes  </span>
                    </div>
                    <!-- episodes -->
                    <div>
                      <span class="cell-content"><%- item.episodes %></span>
                    </div>
                  </div>
                  <div class="cell-info">
                    <div>
                      <ion-icon name="ellipsis-horizontal-circle-outline"></ion-icon>
                      <span class="cell-label">Status  </span>
                    </div>
                    <!-- status -->
                    <div>
                      <span class="cell-content"><%- item.status %></span>
                    </div>
                  </div>
                  <div class="cell-info">
                    <div>
                      <ion-icon name="calendar-number-outline"></ion-icon>
                      <span class="cell-label">Aired  </span>
                    </div>
                    <!-- aired.string -->
                    <div>
                      <span class="cell-content"><%- item.airedString %></span>
                    </div>
                  </div>
                  <div class="cell-info">
                    <div>
                      <ion-icon name="pricetags-outline"></ion-icon>
                      <span class="cell-label">Genres  </span>
                    </div>
                    <!-- genres[name1,name2] -->
                    <div>
                      <span class="cell-content"><%- item.genres %></span>
                    </div>
                  </div>
                  <div class="cell-info">
                    <div>
                      <ion-icon name="alarm-outline"></ion-icon>
                      <span class="cell-label">Duration  </span>
                    </div>
                    <!-- duration -->
                    <div>
                      <span class="cell-content"><%- item.duration %></span>
                    </div>
                  </div>
                  <div class="cell-info">
                    <div>
                      <ion-icon name="checkmark-circle-outline"></ion-icon>
                      <span class="cell-label">Rating  </span>
                    </div>
                    <!-- rating -->
                    <div>
                      <span class="cell-content"><%- item.rating %></span>
                    </div>
                  </div>
                  <div class="cell-info">
                    <div>
                      <ion-icon name="trending-up-outline"></ion-icon>
                      <span class="cell-label">Rank  </span>
                    </div>
                    <!-- rank -->
                    <div>
                      <span class="cell-content"><%- item.rank %></span>
                    </div>
                  </div>
                </div>
          <div class="anime-general-subdetails-container">
            <div class="anime-general-subdetails">
              <div class="anime-general-subdetails-tab-container">
                <ul class="nav-tabs">
                  <li class="active anime-tab" data-content="videos" data-container="video-content-container">
                    <span class="title-tab">Videos</span>
                    <span class="image-tab">
                      <ion-icon name="videocam-outline" size="large"></ion-icon>
                    </span>
                  </li>
                  <li class="anime-tab" data-content="characters" data-container="characters-content-container">
                    <span class="title-tab">Characters & Staff</span>
                    <span class="image-tab">
                      <ion-icon name="person-circle-outline" size="large"></ion-icon>
                    </span>
                  </li>
                  <li class="anime-tab" data-content="episodes" data-container="episodes-content-container">
                    <span class="title-tab">Episodes</span>
                    <span class="image-tab">
                      <ion-icon name="film-outline" size="large"></ion-icon>
                    </span>
                  </li>
                </ul>
              </div>
              <div class="anime-general-subdetails-tab-container-content">
                <div class="video-content-container"></div>
                <div class="characters-content-container"></div>
                <div class="episodes-content-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const animeInformationHTML = _.template(CONTAINER_TEMPLATE)({
      item: animeInformation,
    });

    if (!_.isEmpty(animeInformation)) {
      $(selector).html(animeInformationHTML);

      const buildActions = [
        async () => {
          await this.buildAnimeDetailsVideos({
            selector: `.anime-general-subdetails-tab-container-content .video-content-container`,
            animeId,
          });
        },
        async () => {
          await this.buildAnimeDetailsCharacteres({
            selector:
              ".anime-general-subdetails-tab-container-content .characters-content-container",
            animeId,
          });
        },
        async () => {
          await this.buildAnimeDetailsEpisodes({
            selector:
              ".anime-general-subdetails-tab-container-content .episodes-content-container",
            animeId,
          });
        },
      ];

      for (const action of buildActions) {
        const delayFunction = setTimeout(() => {
          action();
          clearTimeout(delayFunction);
        }, 2000);
      }

      $(
        ".anime-general-subdetails-tab-container-content .characters-content-container"
      ).hide();
      $(
        ".anime-general-subdetails-tab-container-content .episodes-content-container"
      ).hide();

      let activeTab = "videos";
      $("li.anime-tab").on("click", function (event) {
        let target = $(event.target).parents("li");

        target = target.length === 0 ? $(event.target) : target;

        const newTab = $(target);
        const newTabName = newTab.data("content");

        if (newTabName !== activeTab) {
          const activeTabContent = $($(`li[data-content="${activeTab}"]`));

          const containerActiveTab = $(
            `.${activeTabContent.data("container")}`
          );
          containerActiveTab.hide();

          const newTabContent = $(`.${newTab.data("container")}`);
          newTabContent.show();

          newTab.addClass("active");
          activeTabContent.removeClass("active");

          activeTab = newTabName;
        }
      });
    }
  };

  this.buildAnimeDetailsVideos = async ({ selector, animeId }) => {
    const episodesInformation = await apiClient.getAnimeVideos(animeId);

    const CONTAINER_TEMPLATE = `
      <div class=" <%= !_.isEmpty(items) ? "videos-content" : "empty-content-videos" %>">
        <%
          _.each(items, (item, key, list) => {
        %>
          <div class="video-list-outer">
            <!-- url -->
            <a href="<%- item.url %>" class="video-link">
              <!-- images.jpg.image_url -->
              <img src="<%- item.imageUrl %>" alt="video-image">
              <div class="video-info-container">
                <span>
                  <!-- episode -->
                  <%- item.episode %>
                  <br>
                  <span class="episode-title">
                    <!-- title -->
                    <%- item.title %>
                  </span>
                </span>
              </div>
            </a>
          </div>
        <%
          });
        %>
        <% if (_.isEmpty(items)) { %>
          <img src="img/sad-girl.png" alt="video-image">
          <span>No content at the moment...</span>
        <% } %>
      </div>
    `;

    const animeVideosHTML = _.template(CONTAINER_TEMPLATE)({
      items: episodesInformation,
    });

    $(selector).html(animeVideosHTML);
  };

  this.buildAnimeDetailsCharacteres = async ({ selector, animeId }) => {
    const charactersInformation = await apiClient.getAnimeCharacteres(animeId);

    const CONTAINER_TEMPLATE = `
      <div class="table-characters-info">
        <%
          _.each(items, (item, key, list) => {
        %>
          <div class="character-container">
            <div class="top"></div>
            <img src="<%- item.imageUrl %>" alt="">
            <div class="character-information">
              <span class="name">
                <!-- name -->
                <%- item.name %>
              </span>
              <span class="role">
                <!-- role -->
                <%- item.role %>
              </span>
            </div>
          </div>
        <%
          });
        %>
      </div>
    `;

    if (!_.isEmpty(charactersInformation)) {
      const animeCharactersHTML = _.template(CONTAINER_TEMPLATE)({
        items: charactersInformation,
      });

      $(selector).html(animeCharactersHTML);
    }
  };

  this.buildAnimeDetailsEpisodes = async ({ selector, animeId }) => {
    const episodesInformation = await apiClient.getAnimeEpisodes(animeId);

    const CONTAINER_TEMPLATE = `
      <div class="table-episodes-info">
        <table class="episodes-table-info">
          <thead>
            <tr>
              <th scope="col">Episode Title</th>
              <th scope="col">Aired</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            <%
              _.each(items, (item, key, list) => {
            %>
              <tr>
                <td>
                  <div class="title-column">
                    <span><%- item.title %></span>
                    <span><%- item.romanjiTitle %>(<%- item.japaneseTitle %>)</span>
                  </div>
                </td>
                <td>
                  <%- moment(item.aired).format("MMMM Do YYYY") %>
                </td>
                <td>
                  <%- item.score %>
                </td>
              </tr>
            <%
              });
            %>
          </tbody>
        </table>
      </div>
    `;

    const animeEpisodesHTML = _.template(CONTAINER_TEMPLATE)({
      items: episodesInformation,
    });

    $(selector).html(animeEpisodesHTML);
  };
};

export default new Utils();
