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
        <h3>${site.OPERA}</h3>
          <p class="testimonial-description-container">
          ${site.DESCRIZIONE}
          </p>
          <div class="profile mt-auto testimonial-img-container">
            <img src="${site.URLIMAGE}" class="slider-image" alt="">
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

  let mapAreaDescription = {
    'MEANO': 'In this Circoscrizione the constructions have the goal to prevent risk to the viability for car and pedestrians.',
    'BONDONE': 'The most notable construction in this Circoscrizione is the realisation of a roundabout instead of an intersection in the connection with the city centre. The other construction regards the service for the inhabitants: a roof for the football field, the securing of one of the church’s walls. For tourism the fountain in the main square has been repaired',
    'SARDAGNA': 'The project is to create new classes and common areas for children. The idea is to give to the inhabitants better service and to attract new people with this services.',
    'ARGENTARIO': 'This Circoscrizione is quite far from the city centre and it is on a mountain side. For this reason they are creating a new fire fighter station for volunteers, in order to have a quick response. They are also preventing the rock falling and the avalanche risk with three works. For the inhabitants the administration is expanding a common building used by the local associations and the school has been energy requalificated. Other works regard the securing walkways.',
    'S.GIUSEPPE-S.CHIARA': 'In this Circoscrizione many constructions regard the requalification of old buildings, giving them a new function for example in 2 school part of the building would be changed to have more space for children or just to be renewed, an administration buro will be build and a gym will be requalified. Considering that this area is very populated the administration decided to invest in a cycle way (with PNRR financing) For Turism 2 historical buildings will be repaired and a bus stop will be created.',
    'POVO': 'This Circoscrizione is in a higher position than the city centre and many villages are even higher. To connect Maesiano with Povo centre the administration projects an inclined lift. To connect Povo and Villazzano a new cycle/pedestrian way will be created. And in Povo centre a common building will be  renovated.',
    'RAVINA-ROMAGNANO': 'The project is to create new classes and common areas for children. The idea is to give the inhabitants better service and to attract new people with these services.',
    'MATTARELLO': 'The main projects are 2:  to create new classes and common areas for elementary school and to expand common building for the local associations. another work regard the securing walkway.',
    'VILLAZZANO': 'To connect Povo and Villazzano a new cycle/pedestrian way will be created.',
    'OLTREFERSINA': '2 schools have been renewed for a better energy qualification. 3 different sport centres have been expanded and another one has been energetically requalified.',
    'GARDOLO': 'This Circoscrizione is the industrial part of the city. For this reason the administration created new apartments for workers with disabilities to make this area more attractive for everyone. With this idea they also created a new cycleway and renewed railway overpass.',
    'CENTRO STORICO PIEDICASTELLO': 'In this Circoscrizione the number of construction is very high due to the function it has in the city life. The main constructions regard the mobility both for car and bicycle (with PNRR financing). 3 schools have been renewed for a better energy qualification. Furthermore the old castle “Buonconsiglio" has been renovated and the adjacent square also had some changes. In conclusion 2 green areas will be renovated and in a few time a indoor will be unlimited'
  }

  let projectCountArea = {
    'MEANO': 2,
    'BONDONE': 5,
    'SARDAGNA': 1,
    'ARGENTARIO': 9,
    'S.GIUSEPPE-S.CHIARA': 17,
    'POVO': 4,
    'RAVINA-ROMAGNANO': 1,
    'MATTARELLO': 3,
    'VILLAZZANO': 0,
    'OLTREFERSINA': 6,
    'GARDOLO': 5,
    'CENTRO STORICO PIEDICASTELLO': 16
  }

  function getColorForArea(area) {
    let projectCount = projectCountArea[area];
    let orangeValue = Math.min(255, Math.floor(255 * (projectCount / 10)));
    let colorHex = `#${orangeValue.toString(16).padStart(2, '0')}a500`; // RRGG00 format

    return colorHex;
  }

  function getOpacityForArea(area) {
    let projectCount = projectCountArea[area];
    let opacity = Math.min(1, 0.1 + (0.5 * (projectCount / 10)));

    return opacity;
  }

  let prevLayerClicked = null;
  let prevName = null;
  let defaultMapInfoText = '<h3>Learn more about the single circoscrizione</h3><div>Click on the map to see a short description of the construction sites in the circoscrizione.</div>'
  document.querySelector('#js-map-info-text').innerHTML = defaultMapInfoText;

  // Load geojson data and add circoscrizioni to the map
  fetch('./assets/circoscrizioni.geojson')
    .then((response) => response.json())
    .then((json) => { 
      json.features.forEach(function(feature) {
        let elem = L.geoJSON(feature, {
          name: feature.properties.nome
        }).addTo(map);

        elem.setStyle(
          {
            fillOpacity: getOpacityForArea(feature.properties.nome),
            fillColor: 'orange',
            color: 'grey'
          }
        )

        elem.on('click', onPolygonClick);
        elem.on('mouseover', function(e) {
          if(prevLayerClicked !== elem){
            elem.setStyle({
              fillOpacity: 0.3,
              fillColor: 'grey',
              color: 'grey'
            });
          }
        });
        elem.on('mouseout', function(e) {
          if(prevLayerClicked !== elem){
            console.log(e.target.options.name)
            e.target.setStyle({
              fillOpacity: getOpacityForArea(e.target.options.name),
              fillColor: 'orange',
              color: 'grey'
            });
          }
        });
        elem.bindTooltip('<b>' + feature.properties.nome + '</b><br>' + projectCountArea[feature.properties.nome] + ' project(s)', {direction: 'center', className: 'map-label'});
      });
    });

  // Function called when a polygon is clicked
  function onPolygonClick(e){
    console.log(e.target.options.name)

    if (prevLayerClicked !== null) {
      // Reset style
      prevLayerClicked.setStyle({
        fillOpacity: getOpacityForArea(prevName),
        fillColor: 'orange',
        color: 'grey'
      });
      document.querySelector('#'+prevName.replace(/[ .]/g,"_")+'-chart').classList.add('hide');
    }
    
    var layer = e.target;
    
    // reset to default state if one circoscrizione is clicked twice
    if(layer === prevLayerClicked) {
      prevLayerClicked = null;
      //map.setView([46.066666, 11.116667], 11);
      document.querySelector('#js-map-info-text').innerHTML = defaultMapInfoText;
      document.querySelector('#'+prevName.replace(/[ .]/g,"_")+'-chart').classList.add('hide');
      return;
    }
    
    //map.fitBounds(e.target.getBounds());
    layer.setStyle({
      fillOpacity: getOpacityForArea(e.target.options.name),
      fillColor: 'orange',
      color: 'white'
    });
    layer.bringToFront();
    document.querySelector('#js-map-info-text').innerHTML = '<h3>' + e.target.options.name + '</h3> <div>' + mapAreaDescription[e.target.options.name] + '</div>';
    console.log(e.target.options.name)
    console.log(e.target.options.name.replace(/[ .]/g,"_"))
    document.querySelector('#'+e.target.options.name.replace(/[ .]/g,"_")+'-chart').classList.remove('hide');
    
    prevLayerClicked = layer;
    prevName = e.target.options.name;
  }
})();