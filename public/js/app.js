import utils from './utils.js';

$(document).ready(async () => {
  await utils.buildCurrenSeasonCarousel({
    selector: '.carousel-section',
    classData: 'season-now-carousel'
  });
});