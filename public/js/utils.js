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

    // $(".button-watch-anime").on("click", ({ currentTarget }) => {
    //   const animeId = $(currentTarget).data("animeId");
    //   console.log(animeId, "THIS");
    //   // location.replace(`anime-page-details?id=${animeId}`);
    //   window.location = `anime-page-details?a=1`;
    // });
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
    console.log("details page", animeInformation);
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
                <div class="table-info">
                  <div class="cell-info">
                    <ion-icon name="desktop-outline"></ion-icon>
                    <span class="cell-label">Type  </span>
                    <!-- type -->
                    <span class="cell-content"><%- item.type %></span>
                  </div>
                  <div class="cell-info">
                    <ion-icon name="film-outline"></ion-icon>
                    <span class="cell-label">Episodes  </span>
                    <!-- episodes -->
                    <span class="cell-content"><%- item.episodes %></span>
                  </div>
                  <div class="cell-info">
                    <ion-icon name="ellipsis-horizontal-circle-outline"></ion-icon>
                    <span class="cell-label">Status  </span>
                    <!-- status -->
                    <span class="cell-content"><%- item.status %></span>
                  </div>
                  <div class="cell-info">
                    <ion-icon name="calendar-number-outline"></ion-icon>
                    <span class="cell-label">Aired  </span>
                    <!-- aired.string -->
                    <span class="cell-content"><%- item.airedString %></span>
                  </div>
                  <div class="cell-info">
                    <ion-icon name="pricetags-outline"></ion-icon>
                    <span class="cell-label">Genres  </span>
                    <!-- genres[name1,name2] -->
                    <span class="cell-content"><%- item.genres %></span>
                  </div>
                  <div class="cell-info">
                    <ion-icon name="alarm-outline"></ion-icon>
                    <span class="cell-label">Duration  </span>
                    <!-- duration -->
                    <span class="cell-content"><%- item.duration %></span>
                  </div>
                  <div class="cell-info">
                    <ion-icon name="checkmark-circle-outline"></ion-icon>
                    <span class="cell-label">Rating  </span>
                    <!-- rating -->
                    <span class="cell-content"><%- item.rating %></span>
                  </div>
                  <div class="cell-info">
                    <ion-icon name="trending-up-outline"></ion-icon>
                    <span class="cell-label">Rank  </span>
                    <!-- rank -->
                    <span class="cell-content"><%- item.rank %></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="anime-general-subdetails-container">
            <div class="anime-general-subdetails">
              <div class="anime-general-subdetails-tab-container">
                <ul class="nav-tabs">
                  <li class="active">
                    <a href="#videos">
                      Videos
                    </a>
                  </li>
                  <li class="">
                    <a href="#characters-staff">
                      Characters & Staff
                    </a>
                  </li>
                  <li class="">
                    <a href="#episodes">
                      Episodes
                    </a>
                  </li>
                </ul>
              </div>
              <div class="anime-general-subdetails-tab-container-content">
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

      this.buildAnimeDetailsVideos({
        selector: `.anime-general-subdetails-tab-container-content`,
        animeId,
      });
    }
  };

  this.buildAnimeDetailsVideos = async ({ selector, animeId }) => {
    const episodesInformation = await apiClient.getAnimeVideos(animeId);

    const CONTAINER_TEMPLATE = `
      <div class="videos-content">
        <%
          _.each(items, (item, key, list) => {
        %>
          <div class="video-list-outer">
            <!-- url -->
            <a href="<%- item.url %>" class="video-link">
              <!-- images.jpg.image_url -->
              <img src="<%- item.imageUrl %>" alt="">
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
      </div>
    `;

    if (!_.isEmpty(episodesInformation)) {
      const animeVideosHTML = _.template(CONTAINER_TEMPLATE)({
        items: episodesInformation,
      });

      $(selector).html(animeVideosHTML);
    }
  };
};

export default new Utils();
