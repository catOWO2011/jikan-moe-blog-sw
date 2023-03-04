class Carousel {
  #currentSlideIndex;
  #items;
  #dots;
  #DOT_CLASS_FILL = 'dot-fill';
  #BTN_RIGHT_SELECTOR = '.btn-right'
  #BTN_LEFT_SELECTOR = '.btn-left';
  #DIRECTION = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
  };
  static TEMPLATE = `
    <div class="carousel <%- classData %>">

      <%
        _.each(items, (item, key, list) => {
      %>
        <div id="<%- item.id %>" class="carousel-content <%- key === 0 ? 'display-carousel-content' : 'hide-carousel-content' %>">
          <img class="carousel-image" src="<%- item.imageUrl %>" alt="anime-image">
          <div class="anime-main-description">
            <h1><%- item.title %></h1><br>
            <p><%- item.synopsis %></p>
          </div>
        </div>
      <%
        });
      %>

      <button class="btn btn-left">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="button-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button class="btn btn-right">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="button-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
      <div class="dots">
        <%
          _.each(items, (item, key, list) => {
        %>
          <button id="<%- item.id %>" class="dot">&nbsp</button>
        <%
          });
        %>
      </div>
    </div>
  `;

  constructor({ targetClass }) {
    this.targetClass = targetClass;
    this.#currentSlideIndex = 0;
    this.#items = [];
    this.#dots = [];

    this.#setupAction();
  }

  #setupAction() {
    const target = $(`.${this.targetClass}`);
    this.#items = target.find('.carousel-content');
    this.#dots = target.find('.dots button');
    
    this.#removeClassFromItems();
    
    $(this.#items[0]).show();
    $(this.#dots[0]).addClass(this.#DOT_CLASS_FILL);

    const rightBtn = target.find(this.#BTN_RIGHT_SELECTOR);
    rightBtn.click(() => {
      this.#rotate(this.#DIRECTION.RIGHT);
    });

    const leftBtn = target.find(this.#BTN_LEFT_SELECTOR);
    leftBtn.click(() => {
      this.#rotate(this.#DIRECTION.LEFT);
    });
  }

  #rotate(direction) {
    this.#hideItem();
    this.#emptyDot();

    if (direction == this.#DIRECTION.LEFT) {
      this.#currentSlideIndex = (this.#currentSlideIndex - 1 + this.#items.length) % this.#items.length;
    } else {
      this.#currentSlideIndex = (this.#currentSlideIndex + 1) % this.#items.length;
    }

    this.#showItem();
    this.#fillDot();
  }

  #hideItem() {
    const itemToHide = this.#selectDisplayedItem();
    itemToHide.hide();
  }

  #showItem() {
    const itemToShow = this.#selectDisplayedItem();
    itemToShow.fadeIn('slow');
  }

  #fillDot() {
    const dotToFill = this.#selectDot();
    dotToFill.addClass(this.#DOT_CLASS_FILL);
  }

  #emptyDot() {
    const dotToClear = this.#selectDot();
    dotToClear.removeClass(this.#DOT_CLASS_FILL);
  }

  #selectDisplayedItem() {
    return $(this.#items[this.#currentSlideIndex]);
  }

  #selectDot() {
    return $(this.#dots[this.#currentSlideIndex]);
  }

  #removeClassFromItems() {
    $(this.#items).each((index, item) => {
      $(item).hide();
    });
  }
};

export default Carousel;