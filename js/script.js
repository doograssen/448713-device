'use strict';

var ESC_CODE = 27;
var showModalBtn = document.querySelector('.about__link--feedback');
var showMap = document.querySelector('.about__map');
var modal = document.querySelectorAll('.modal');
var feedBack = document.querySelector('.modal--feedback');
var fields = feedBack.querySelectorAll('input,textarea');
var userName = feedBack.querySelector('[name="user-name"]');
var email = feedBack.querySelector('[name="user-mail"]');
var letter = feedBack.querySelector('[name="user-feedback"]');
var storageName = localStorage.getItem("userName");
var storageEmail = localStorage.getItem("userEmail");
var interactiveMap = document.querySelector('.modal--map');
var closeFeedbackBtn = feedBack.querySelector('.modal__close');
var closeMapBtn = interactiveMap.querySelector('.modal__close');
var googleMap = interactiveMap.querySelector('.modal__google-map');
var mapLink = interactiveMap.querySelector('.modal__link');
var map;

function checkStorageField(check, source, target) {
  if (check) {
    source.value = check;
    target.focus();
    return true;
  } else {
    source.focus();
    return false;
  }
}

function checkField(field) {
  if (!field.value) {
    field.classList.add('feedback__error');
    return true;
  } else {
    return false;
  }
}

function checkForm() {
  var check = false;
  fields.forEach(function (item) {
    check |= checkField(item);
  });
  return check;
}
function clearOnClose() {
  fields.forEach(function (item) {
    item.classList.remove('feedback__error');
    item.value = '';
  });
  feedBack.classList.toggle('modal--show');
}

function addChangeListeners() {
  fields.forEach(function (item) {
    item.addEventListener('change', function () {
      if (this.classList.contains('feedback__error')) {
        this.classList.remove('feedback__error');
      }
    });
  });
}


showModalBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  feedBack.classList.toggle('modal--show');
  if (checkStorageField(storageName, userName, email)) {
    checkStorageField(storageEmail, email, letter);
  }
});

showMap.addEventListener('click', function (evt) {
  evt.preventDefault();
  interactiveMap.classList.toggle('modal--show');
});

closeFeedbackBtn.addEventListener('click', clearOnClose);

closeMapBtn.addEventListener('click', function () {
  interactiveMap.classList.toggle('modal--show');
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_CODE) {
    var modalCount = modal.length;
    for (var i = 0; i < modalCount; i++) {
      if (modal[i].classList.contains('modal--show')) {
        if (modal[i].classList.contains('modal--feedback')) {
          clearOnClose();
          return;
        }
        modal[i].classList.remove('modal--show');
        return;
      }
    }
  }
});

feedBack.addEventListener('submit', function (evt) {
  if (checkForm()) {
    evt.preventDefault();
  } else {
    localStorage.setItem('userName', userName.value);
    localStorage.setItem('userEmail', email.value);
  }
});

addChangeListeners();

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
