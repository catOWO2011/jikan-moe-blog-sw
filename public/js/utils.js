import apiClient from './api-client.js';
import Carousel from './components/carousel.js';

const Utils = function () {
  this.buildCurrenSeasonCarousel = async ({ selector, classData }) => {
    const data = await apiClient.getSeasonNow({ limit: 7});
    
    const htmlCarousel = _.template(Carousel.TEMPLATE)({ items: data, classData });

    $(selector).html(htmlCarousel);

    new Carousel({ targetClass: classData });
  };
};

export default new Utils();