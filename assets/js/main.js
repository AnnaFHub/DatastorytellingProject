/**
* Template Name: QuickStart
* Template URL: https://bootstrapmade.com/quickstart-bootstrap-startup-website-template/
* Updated: May 04 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      if (document.querySelector('.mobile-nav-active')) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.swiper').forEach(function(swiper) {
      let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiper, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * add data from csv sheet
   */
  fetch('./assets/construction_sites.json')
    .then((response) => response.json())
    .then((json) => addSliderElements(json));

  function addSliderElements(json) {
    const sliderWrapper = document.querySelector('#project-slider');
    console.log(json);
    console.log(sliderWrapper);

    sliderWrapper.innerHTML = json.map((site) => {
      return `
      <div class="swiper-slide">
        <div class="testimonial-item">
          <p>
          ${site.DESCRIZIONE}
          </p>
          <div class="profile mt-auto">
            <img src="${site.URLIMAGE}" class="slider-image" alt="">
            <h3>${site.CIRCOSCRIZIONE}</h3>
          </div>
        </div>
      </div>`;
    });
  }


  /**
   * Map
   */
  // map setup
  var map = L.map('map').setView([46.066666, 11.116667], 11);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);


  // var polygon = L.polygon([
  //   [46.066, 11.110],
  //   [46.068, 11.113],
  //   [46.064, 11.112]
  // ]).addTo(map);

  // polygon.on('click', onPolygonClick);
  let polygonClickCounter = 0;
  let prevLayerClicked = null;

  fetch('./assets/circoscrizioni.geojson')
    .then((response) => response.json())
    .then((json) => { 
      // do what you want to do with `data` here...
      json.features.forEach(function(feature) {
        let elem = L.geoJSON(feature, {
          name: feature.properties.nome
        }).addTo(map);

        elem.on('click', onPolygonClick);
      });
    });

  // Function to be called when a polygon is clicked
  function onPolygonClick(e){
    console.log(e.target.options.name)
    polygonClickCounter++;
    document.querySelector('#counter').innerHTML = e.target.options.name;

    if (prevLayerClicked !== null) {
      // Reset style
      prevLayerClicked.setStyle({
        fillOpacity: 0.1,
        fillColor: 'blue'
      });
    }
    
    var layer = e.target;
    
    if(layer === prevLayerClicked) {
      prevLayerClicked = null;
      return;
    }
    
    layer.setStyle({
      fillOpacity: 0.6,
      fillColor: 'blue'
    });
    
    prevLayerClicked = layer;
  }
})();