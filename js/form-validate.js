import {sendData} from './api.js';

const MAX_PRICE_HOUSING = 100000;

const formAdvert = document.querySelector('.ad-form');
const submitButton = document.querySelector('.ad-form__submit');

const pristine = new Pristine(formAdvert, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error-text',
});

const titleAdvert = formAdvert.querySelector('#title');
const validateTitleAdvert = (value) => value.length >= 30 && value.length <= 100;
const getErrorTitle = () => 'Длина заголовка должна быть от 30 до 100 символов';

pristine.addValidator(titleAdvert, validateTitleAdvert, getErrorTitle);

const typeRoom = formAdvert.querySelector('#type');
const priceRoom = formAdvert.querySelector('#price');
const minPriceHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const validatePriceAdvert = () =>
  priceRoom.value >= minPriceHousing[typeRoom.value] && priceRoom.value <= MAX_PRICE_HOUSING;

const getErrorPrice = () => {
  if (priceRoom.value <= minPriceHousing[typeRoom.value]) {
    return `Минимальная цена ${minPriceHousing[typeRoom.value]}`;
  } else if (priceRoom.value >= MAX_PRICE_HOUSING) {
    return `Максимальная цена ${MAX_PRICE_HOUSING}`;
  }
};

const timeIn = formAdvert.querySelector('#timein');
const timeOut = formAdvert.querySelector('#timeout');

const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};

const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

const roomsInput = formAdvert.querySelector('#room_number');
const capacityInput = formAdvert.querySelector('#capacity');
const roomsToOption = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const validateRoomsInput = () => roomsToOption[roomsInput.value].includes(capacityInput.value);

const getRoomsError = () => {
  if (roomsInput.value === '1') {
    return 'Размещение для одного гостя';
  }
  if (roomsInput.value === '2') {
    return 'Размещение от одного до двух гостей';
  }
  if (roomsInput.value === '3') {
    return 'Размещение от одного до трех гостей';
  }
  if (roomsInput.value === '100') {
    return 'Не для гостей';
  }
};

const setAdFormActions = (onSuccess, onError) => {
  pristine.addValidator(capacityInput, validateRoomsInput, getRoomsError);
  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
  pristine.addValidator(priceRoom, validatePriceAdvert, getErrorPrice);
  typeRoom.addEventListener('change', () => {
    priceRoom.placeholder = minPriceHousing[typeRoom.value];
    priceRoom.min = minPriceHousing[typeRoom.value];
  });

  formAdvert.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      submitButton.disabled = true;
      const formData = new FormData(formAdvert);
      sendData(onSuccess, onError, formData);
    }
  });
};

export {setAdFormActions};
