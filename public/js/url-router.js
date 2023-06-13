import utils from "./utils.js";

const urlLocationHandler = async () => {
  const location = window.location.hash.replace("#", "");

  // console.log(location, " location", location.match(/\d+$/g));

  // let route = `/`;
  // if (location.startsWith("anime-details-page")) {
  //   route = "anime-details-page";
  // }

  // const html = await fetch(routes[route].template).then((response) =>
  //   response.text()
  // );

  // console.log(html, route, "aaa");

  // document.getElementById("main-content-page").innerHTML = html;
  // document.title = route.title;
  let template = "";

  console.log(location);

  if (location === "") {
    template = `
      <section class="carousel-section">
      </section>
      <section class="current-season-section">
        <div class="section-container">
          <div class="spinner-component">
            <div class="box">
              <div class="content">
                <img src="img/sakamoto-sleeping.gif">
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  } else if (location.startsWith("anime-details-page")) {
    template = `
      <div class="body-container-anime-details"></div>
    `;
  }

  // const html = await fetch(template).then((response) => response.text());

  document.getElementById("main-content-page").innerHTML = template;

  if (location === "") {
    await utils.buildCurrenSeasonCarousel({
      selector: ".carousel-section",
      classData: "season-now-carousel",
    });

    await utils.buildAnimeContainer({
      selector: ".section-container",
      classData: "",
    });
  } else if (location.startsWith("anime-details-page")) {
    let animeId = location.match(/\d+$/g)[0];
    console.log(animeId);
    await utils.buildAnimeDetailsPage({
      selector: ".body-container-anime-details",
      animeId,
    });
  }

  utils.buildNavbar();
};

window.onpopstate = urlLocationHandler;
urlLocationHandler();
