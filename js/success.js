import {resetMap, setStartAddressValue} from './map.js';
import {clearImageBlocks} from './preload-images.js';
import {isEcsEvt, renderElement} from './utils.js';

const addForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const sliderElement = document.querySelector('.ad-form__slider');
const submitButton = document.querySelector('.ad-form__submit');

const createSuccessTemplate = () => `<div class="success">
                                      <p class="success__message">Ваше объявление<br>успешно размещено!</p>
                                    </div>`;


const onSuccessClick = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.success')) {
    evt.target.closest('.success').remove();
    removeListeners();
  }
};

const onSuccessKeydown = (evt) => {
  evt.preventDefault();
  const successElement = document.querySelector('.success');
  if (isEcsEvt(evt) && successElement) {
    successElement.remove();
    removeListeners();
  }
};

const addListeners = () => {
  document.addEventListener('click', onSuccessClick);
  document.addEventListener('keydown', onSuccessKeydown);
};

function removeListeners() {
  document.removeEventListener('click', onSuccessClick);
  document.removeEventListener('keydown', onSuccessKeydown);
}

const renderSuccessMessage = () => {
  renderElement(document.body, createSuccessTemplate);
  addListeners();
  resetMap();
  clearImageBlocks();
  submitButton.disabled = false;
  setTimeout(() => {
    addForm.reset();
    filterForm.reset();
    sliderElement.noUiSlider.reset();
    setStartAddressValue();
  });
};

export {renderSuccessMessage};
