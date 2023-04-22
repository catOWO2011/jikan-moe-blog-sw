class Navbar {
  #navbar;
  #currentIcon;
  #menuBtn;
  static X_ICON = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>`;
  static BARS_3 = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>`;

  constructor() {
    this.#navbar = null;
    this.#setupAction();
    this.#currentIcon = Navbar.BARS_3;
  }

  #setupAction() {
    const header = $(".header");
    this.#navbar = $($(header).find(".flex .navbar"));
    this.#menuBtn = $($(header).find("#menu-btn"));

    this.#menuBtn.on("click", () => {
      this.#switchIcon();
      this.#showMenuItems();
    });
  }

  #switchIcon() {
    if (this.#currentIcon === Navbar.X_ICON) {
      this.#currentIcon = Navbar.BARS_3;
      this.#menuBtn.removeClass("x-icon");
    } else {
      this.#currentIcon = Navbar.X_ICON;
      this.#menuBtn.addClass("x-icon");
    }
    this.#menuBtn.html(this.#currentIcon);
  }

  #showMenuItems() {
    if (this.#currentIcon === Navbar.X_ICON) {
      this.#navbar.addClass("active");
    } else {
      this.#navbar.removeClass("active");
    }
  }
}

export default Navbar;
