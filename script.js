const navToggle = document.querySelector(".nav-toggle");
const header = document.getElementById("header");
const asideEl = document.getElementById("aside");
const topSection = document.getElementById("top");

//ハンバーガーメニュー
if (navToggle) {
  // accessibility
  navToggle.setAttribute("aria-expanded", "false");

  navToggle.addEventListener("click", function () {
    const isActive = header.classList.toggle("active");
    if (asideEl) asideEl.classList.toggle("active");
    navToggle.setAttribute("aria-expanded", isActive ? "true" : "false");
  });

  // close aside when clicking a link inside it (mobile behavior)
  document.querySelectorAll("#aside a[href]").forEach((a) => {
    a.addEventListener("click", () => {
      header.classList.remove("active");
      if (asideEl) asideEl.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// スクロールで背景色を切り替える
if (topSection) {
  const getScrollTrigger = () => window.innerHeight * 0.1; //切り替えるスクロール位置
  let switchTimeout = null;
  let isSwitched = false;

  //背景を元に戻す
  const resetBackground = () => {
    topSection.classList.remove("bg-switched");
    isSwitched = false;
  };

  //背景切り替えを予約
  const scheduleSwitch = () => {
    if (switchTimeout || isSwitched) {
      return;
    }

    // 700ms後に背景を切り替える
    switchTimeout = window.setTimeout(() => {
      topSection.classList.add("bg-switched");
      isSwitched = true;
      switchTimeout = null;
    }, 700);
  };

  //背景切り替えの予約をキャンセル
  const cancelSwitch = () => {
    if (switchTimeout) {
      clearTimeout(switchTimeout); //タイマー停止
      switchTimeout = null;
    }
  };

  //スクロール時の背景切り替え処理
  const updateBackground = () => {
    const scrollY = window.scrollY;

    if (scrollY > getScrollTrigger()) {
      scheduleSwitch();
    } else {
      cancelSwitch();
      resetBackground();
    }
  };

  window.addEventListener("scroll", updateBackground, { passive: true });
  window.addEventListener("resize", updateBackground);
  window.addEventListener("load", resetBackground);
}

///固定バナーをfooterに入ったら非表示にする
function initFixedBannerVisibility() {
  const fixedBanner = document.getElementById("fixed-bnr");
  const footer = document.getElementById("footer");
  if (!fixedBanner || !footer) {
    return;
  }

  const updateBannerVisibility = () => {
    const bannerRect = fixedBanner.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();

    const isOverlapping = bannerRect.bottom > footerRect.top;
    fixedBanner.classList.toggle("is-hidden", isOverlapping);
  };

  //判定するタイミング
  window.addEventListener("scroll", updateBannerVisibility, { passive: true });
  window.addEventListener("resize", updateBannerVisibility);
  window.addEventListener("load", updateBannerVisibility);
}

// (aside contrast behavior removed)

// トップコンセプトのフェードアップ
function initTopConceptFadeUp() {
  const $items = $(
    ".top-concept .top-concept__ttl, .top-concept .top-concept__text, .top-concept .top-concept__flex-item",
  );
  if (!$items.length) {
    return;
  }

  $items.addClass("fade-up-item");

  const updateFadeUp = () => {
    const windowHeight = $(window).height();
    $items.each(function (index) {
      const $item = $(this);
      if ($item.hasClass("is-visible")) {
        return;
      }
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.85) {
        $item.addClass("is-visible");
      }
    });
  };

  $(window).on("scroll resize", updateFadeUp);
  $(window).on("load", updateFadeUp);
  updateFadeUp();
}

// トップアバウトのフェードアップ
function initTopAboutFadeUp() {
  const $targets = $(".top-about .top-about__flex > *");
  if (!$targets.length) return;

  $targets.addClass("fade-up-item");

  const update = () => {
    const windowHeight = $(window).height();
    $targets.each(function (i) {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.85) {
        $el.addClass("is-visible");
      }
    });
  };

  $(window).on("scroll resize", update);
  $(window).on("load", update);
  update();
}

// トップラインナップのフェードアップ (タイトル + ヘッダーテキスト)
function initTopLineupFadeUp() {
  const $targets = $(".top-lineup__header-title, .top-lineup__header-text");
  if (!$targets.length) return;

  $targets.addClass("fade-up-item");

  const update = () => {
    const windowHeight = $(window).height();
    $targets.each(function (i) {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.85) {
        $el.addClass("is-visible");
      }
    });
  };

  $(window).on("scroll resize", update);
  $(window).on("load", update);
  update();
}

// トップラインナップ本文のアニメーション
function initTopLineupBodyAnimations() {
  const $title = $(".top-lineup__body-cont__title");
  const $titleText = $(".top-lineup__body-cont__title-text");
  const $items = $(".top-lineup__body-cont__list-item");
  const $extras = $(".top-lineup__body .contact-link, .top-lineup__body-bnr");

  if ($title.length) $title.addClass("fade-up-item");
  if ($items.length) $items.addClass("fade-up-item");
  if ($extras.length) $extras.addClass("fade-up-item");
  if ($titleText.length) $titleText.addClass("slide-in-rl");

  const update = () => {
    const windowHeight = $(window).height();

    // title
    $title.each(function () {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.85) $el.addClass("is-visible");
    });

    // title text
    $titleText.each(function () {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.85) $el.addClass("is-visible");
    });

    // list items
    $items.each(function (i) {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.9) {
        $el.addClass("is-visible");
      }
    });

    // contact link and banner
    $extras.each(function (i) {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.9) {
        setTimeout(() => $el.addClass("is-visible"), i * 60);
      }
    });
  };

  $(window).on("scroll resize", update);
  $(window).on("load", update);
  update();
}

// 価格別に見るのフェードアップ
function initPriceGridFadeUp() {
  const $items = $(".top-lineup__body-price__box-grid__item");
  if (!$items.length) return;

  $items.addClass("fade-up-item");

  const update = () => {
    const windowHeight = $(window).height();
    $items.each(function (i) {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.9) {
        $el.addClass("is-visible");
      }
    });
  };

  $(window).on("scroll resize", update);
  $(window).on("load", update);
  update();
}

// top-bnr の左右 / 下から上 フェードアニメーション
function initTopBnrAnimations() {
  const $lefts = $(".top-bnr__award, .top-bnr__img");
  const $ups = $(".top-bnr__ttl, .top-bnr__merit, .top-bnr__text");

  if ($lefts.length) $lefts.addClass("slide-in-lr");
  if ($ups.length) $ups.addClass("fade-up-item");

  const update = () => {
    const windowHeight = $(window).height();

    $lefts.each(function (i) {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.9) {
        $el.addClass("is-visible");
      }
    });

    $ups.each(function (i) {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.9) {
        $el.addClass("is-visible");
      }
    });
  };

  $(window).on("scroll resize", update);
  $(window).on("load", update);
  update();
}

// top-flow セクションのフェードアニメーション
function initTopFlowAnimations() {
  const $subtitle = $(".top-flow .subtitle-text");
  const $items = $(".top-flow__grid-item");

  if ($subtitle.length) $subtitle.addClass("fade-up-item");
  if ($items.length) $items.addClass("slide-in-lr");

  const update = () => {
    const windowHeight = $(window).height();

    $subtitle.each(function () {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.9) $el.addClass("is-visible");
    });

    $items.each(function (i) {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.9) {
        setTimeout(() => $el.addClass("is-visible"), i * 80);
      }
    });
  };

  $(window).on("scroll resize", update);
  $(window).on("load", update);
  update();
}

// top-faq セクションのフェードアップ（subtitle + FAQ boxes）
function initTopFaqAnimations() {
  const $subtitle = $(".top-faq .subtitle-text");
  const $subtitleDesc = $(".top-faq .subtitle-desc");
  const $boxes = $(".top-faq__cont-box");

  if ($subtitle.length) $subtitle.addClass("fade-up-item");
  if ($subtitleDesc.length) $subtitleDesc.addClass("fade-up-item");
  if ($boxes.length) $boxes.addClass("fade-up-item");

  const update = () => {
    const windowHeight = $(window).height();

    $subtitle.each(function () {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.9) $el.addClass("is-visible");
    });

    $subtitleDesc.each(function () {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.9) $el.addClass("is-visible");
    });

    $boxes.each(function (i) {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.9) {
        setTimeout(() => $el.addClass("is-visible"), i * 50);
      }
    });
  };

  $(window).on("scroll resize", update);
  $(window).on("load", update);
  update();
}

// top-contact セクションのフェードアップ（subtitle / text / form）
function initTopContactAnimations() {
  const $subtitle = $(".top-contact .subtitle-text");
  const $text = $(".top-contact__text");
  const $form = $(".top-contact .contact-form");

  if ($subtitle.length) $subtitle.addClass("fade-up-item");
  if ($text.length) $text.addClass("fade-up-item");
  if ($form.length) $form.addClass("fade-up-item");

  const update = () => {
    const windowHeight = $(window).height();

    $subtitle.each(function () {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.9) $el.addClass("is-visible");
    });

    $text.each(function () {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.9) $el.addClass("is-visible");
    });

    $form.each(function (i) {
      const $el = $(this);
      if ($el.hasClass("is-visible")) return;
      const rect = this.getBoundingClientRect();
      if (rect.top < windowHeight * 0.9) {
        setTimeout(() => $el.addClass("is-visible"), i * 60);
      }
    });
  };

  $(window).on("scroll resize", update);
  $(window).on("load", update);
  update();
}

// フォールバック: 古いブラウザ向けに a:hover を親要素に反映させる
function initTopLinkHoverFallback() {
  const anchors = document.querySelectorAll(".top-link__grid-item__more a");
  anchors.forEach((a) => {
    const parent = a.closest(".top-link__grid-item");
    if (!parent) return;
    a.addEventListener("mouseenter", () => parent.classList.add("is-hover"));
    a.addEventListener("mouseleave", () => parent.classList.remove("is-hover"));
    a.addEventListener("focus", () => parent.classList.add("is-hover"));
    a.addEventListener("blur", () => parent.classList.remove("is-hover"));
  });
}

// top-link セクション: desktop では画像をズームアウト（scale down）で表示、
// mobile (max-width:768px) では画像アニメを無効化して内側の .top-link__grid-item__inner をフェードイン
function initTopLinkAnimations() {
  const $items = $(".top-link__grid-item");
  if (!$items.length) return;
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  let imgObserver = null;
  let innerObserver = null;
  let resizeTimer = null;

  const disconnectObservers = () => {
    if (imgObserver) {
      imgObserver.disconnect();
      imgObserver = null;
    }
    if (innerObserver) {
      innerObserver.disconnect();
      innerObserver = null;
    }
  };

  const setupObservers = () => {
    disconnectObservers();

    if (isMobile()) {
      // mobile: observe the whole grid item and fade in selected child parts at once
      $items.each(function () {
        const $item = $(this);
        const $img = $item.find(".top-link__item-img img");
        const $ttl = $item.find(".top-link__grid-item__ttl");
        const $text = $item.find(".top-link__grid-item__text");
        const $more = $item.find(".top-link__grid-item__more");
        const $moreA = $more.find("a");

        $img.removeClass("zoom-out is-visible").css("transform", "");

        // prepare mobile fade class on each target
        $ttl.addClass("mobile-fade-item").removeClass("is-visible");
        $text.addClass("mobile-fade-item").removeClass("is-visible");
        $more.addClass("mobile-fade-item");
        $moreA.addClass("mobile-fade-item").removeClass("is-visible");
      });

      innerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const item = entry.target;
            const targets = item.querySelectorAll(".mobile-fade-item");
            targets.forEach((el) => el.classList.add("is-visible"));
            innerObserver.unobserve(item);
          });
        },
        { threshold: 0.15 },
      );

      // observe each grid item element
      document.querySelectorAll(".top-link__grid-item").forEach((el) => {
        innerObserver.observe(el);
      });
    } else {
      // desktop: observe images for smooth zoom-out
      $items.each(function () {
        const $img = $(this).find(".top-link__item-img img");
        const $inner = $(this).find(".top-link__grid-item__inner");
        $img.addClass("zoom-out").removeClass("is-visible");
        $inner.removeClass("inner-fade-item is-visible");
      });

      imgObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("is-visible");
          });
        },
        { threshold: 0.15 },
      );

      document
        .querySelectorAll(".top-link__item-img img.zoom-out")
        .forEach((el) => {
          imgObserver.observe(el);
        });
    }
  };

  // 初期セットアップ
  setupObservers();

  // リサイズ時にモード切替（デバウンス）
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setupObservers();
    }, 120);
  });
}

//FAQアコーディオン
function initFaqAccordion() {
  const $boxes = $(".top-faq__cont-box");
  if (!$boxes.length) return;

  $boxes.each(function () {
    const $box = $(this);
    const $text = $box.find(".top-faq__cont-box__text");
    if ($text.length) {
      $text.css("display", $box.hasClass("show") ? "block" : "none");
    }
  });

  $boxes.on("click", function () {
    const $clicked = $(this);
    const $text = $clicked.find(".top-faq__cont-box__text");

    $clicked.toggleClass("show");
    $text.slideToggle(200);
  });
}

if (document.readyState !== "loading") {
  initTopLinkHoverFallback();
  initFixedBannerVisibility();
  initTopLinkAnimations();
  initTopConceptFadeUp();
  initTopAboutFadeUp();
  initTopLineupFadeUp();
  initTopLineupBodyAnimations();
  initTopBnrAnimations();
  initPriceGridFadeUp();
  initTopFlowAnimations();
  initTopFaqAnimations();
  initTopContactAnimations();
  initPageTransition();
  initFaqAccordion();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    initPriceGridFadeUp();
    initTopLinkHoverFallback();
    initFixedBannerVisibility();
    initTopLinkAnimations();
    initTopConceptFadeUp();
    initTopAboutFadeUp();
    initTopLineupFadeUp();
    initTopLineupBodyAnimations();
    initTopBnrAnimations();
    initTopFlowAnimations();
    initTopFaqAnimations();
    initTopContactAnimations();
    initPageTransition();
    initFaqAccordion();
  });
}

//左右に開くカーテンアニメーション

function initPageTransition() {
  const $body = $("body");

  if (!$body.hasClass("loading-transition")) return;

  const transitionDuration = 500; // ms, CSS と同期

  // ページ表示時に扉を開く
  const openDoors = () => {
    $body.removeClass("is-leaving");
    // 次フレームで is-loaded を追加してトランジションを起こす
    requestAnimationFrame(() =>
      requestAnimationFrame(() => $body.addClass("is-loaded")),
    );
  };

  openDoors();

  // pageshow（bfcache）対応
  $(window).on("pageshow", () => {
    $body.removeClass("is-leaving");
    $body.addClass("is-loaded");
  });

  // リンククリックを一括で監視（jQuery）
  $(document).on("click", "a[href]", function (event) {
    const $link = $(this);
    const href = $link.attr("href");

    if (!href) return;

    const skip =
      href.indexOf("#") === 0 ||
      href.indexOf("mailto:") === 0 ||
      href.indexOf("tel:") === 0 ||
      href.indexOf("javascript:") === 0 ||
      $link.attr("target") === "_blank" ||
      $link.attr("download") !== undefined ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey;

    if (skip) return;

    const destination = new URL($link.prop("href"), window.location.href);
    if (destination.origin !== window.location.origin) return;

    event.preventDefault();
    if ($body.hasClass("is-leaving")) return;

    $body.addClass("is-leaving");
    $body.removeClass("is-loaded");

    setTimeout(() => {
      window.location.href = destination.href;
    }, transitionDuration);
  });
}
