import {getData} from './api.js';
import {setAdFormActions} from './form-validate.js';
import {initSlider} from './slider.js';
import {createCard} from './card-advert.js';
import {activateAdvertForm, activateMapFilterForm} from './page-states.js';
import {addPhotoInputsListeners, clearImageBlocks} from './preload-images.js';
import {renderGetErrorMessage, renderPostErrorMessage} from './error.js';
import {filterData, setDataRanking} from './map-filter.js';
import {renderSuccessMessage} from './success.js';

const START_LOCATION = {
  lat:   35.68172,
  lng: 139.75392,
};

const DECIMALS = 5;
const ADVERTS_COUNTER = 10;
const TIME_INTERVAL = 500;

const sliderElement = document.querySelector('.ad-form__slider');
const formFilter = document.querySelector('.map__filters');
const resetButton = document.querySelector('.ad-form__reset');
const addressInput = document.querySelector('#address');
const interactiveMap = L.map('map-canvas');
const markerGroup = L.layerGroup();
let interactiveMarker;
let marker;
let timer;

const setStartAddressValue = () => {
  addressInput.value = `${START_LOCATION.lat}, ${START_LOCATION.lng}`;
};

const setLocation = (target) => {
  const location = target.getLatLng();
  addressInput.value = `${location.lat.toFixed(DECIMALS)}, ${location.lng.toFixed(DECIMALS)}`;
};

const addMarkerGroup = (data) => {
  markerGroup.addTo(interactiveMap);
  setDataRanking(data)
    .slice()
    .filter(filterData)
    .slice(0, ADVERTS_COUNTER)
    .forEach((offer) => {
      marker = L.marker(
        offer.location,
        {
          icon: L.icon({
            iconUrl: './img/pin.svg',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
          }),
        },
      );
      marker
        .addTo(markerGroup)
        .bindPopup(createCard(offer));
    });
};

const onMarkerMove = (evt) => setLocation(evt.target);

const resetMap = () => {
  interactiveMarker.setLatLng(START_LOCATION);
  interactiveMap.setView(START_LOCATION, 12);
};

const onResetButtonClick = () => {
  setTimeout(() => setStartAddressValue());
  clearImageBlocks();
  sliderElement.noUiSlider.reset();
  resetMap();
  formFilter.reset();
};

const activateAddForm = () => {
  activateAdvertForm();
  setStartAddressValue();
  setAdFormActions(renderSuccessMessage, renderPostErrorMessage);
  initSlider();
  addPhotoInputsListeners();
  resetButton.addEventListener('click', onResetButtonClick);
};

const setMapChange = (data) => {
  formFilter.addEventListener('change', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      markerGroup.clearLayers();
      resetMap();
      addMarkerGroup(data);
    }, TIME_INTERVAL);
  });
};

const getDataCallback = (data) => {
  activateMapFilterForm();
  addMarkerGroup(data);
  setMapChange(data);
};

const initMap = () => {
  interactiveMap.on('load', () => {
    getData(getDataCallback, renderGetErrorMessage);
    activateAddForm();
  })
    .setView(START_LOCATION, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      foo: 'bar',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(interactiveMap);

  interactiveMarker = L.marker(START_LOCATION,
    {
      draggable: 'true',
      icon: L.icon({
        iconUrl: './img/main-pin.svg',
        iconSize: [52, 52],
        iconAnchor: [26, 52],
      }),
    }).addTo(interactiveMap);

  interactiveMarker.on('moveend', onMarkerMove);
};

export {initMap, resetMap, setStartAddressValue};
