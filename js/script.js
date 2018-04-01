'use strict';

var ESC_CODE = 27;
var showModalBtn = document.querySelector('.about__link--feedback');
var showMap = document.querySelector('.about__map');
var modal = document.querySelectorAll('.modal');
var feedBack = document.querySelector('.modal--feedback');
var interactiveMap = document.querySelector('.modal--map');
var closeFeedbackBtn = feedBack.querySelector('.modal__close');
var closeMapBtn = interactiveMap.querySelector('.modal__close');
var googleMap = interactiveMap.querySelector('.modal__google-map');
var mapLink = interactiveMap.querySelector('.modal__link');
var map;

showModalBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  feedBack.classList.toggle('modal--show');
});

showMap.addEventListener('click', function (evt) {
  evt.preventDefault();
  interactiveMap.classList.toggle('modal--show');
});

closeFeedbackBtn.addEventListener('click', function (evt) {
  evt.currentTarget.parentNode.classList.toggle('modal--show');
});

closeMapBtn.addEventListener('click', function (evt) {
  evt.currentTarget.parentNode.classList.toggle('modal--show');
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_CODE) {
    var modalCount = modal.length;
    for (var i = 0; i < modalCount; i++) {
      if (modal[i].classList.contains('modal--show')) {
        modal[i].classList.remove('modal--show');
        return;
      }
    }
  }
});

mapLink.addEventListener('click', function (evt) {
    evt.preventDefault();
});

function initMap() {
    var myLatLng = {lat: 55.687239, lng: 37.529634};
    map = new google.maps.Map(googleMap, {
        zoom: 17,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Device Market!'
    });
}
