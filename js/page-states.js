const advertForm = document.querySelector('.ad-form');
const advertFormtInteractiveElements = advertForm.querySelectorAll('fieldset, button');
const mapFilterForm = document.querySelector('.map__filters');
const mapFilterInteractiveElements = mapFilterForm.querySelectorAll('fieldset');

const deactivateAdvertForm = () => {
  advertForm.classList.add('ad-form--disabled');
  advertFormtInteractiveElements.forEach((element) => element.setAttribute('disabled', 'disabled'));
};

const deactivateMapFilterForm = () => {
  mapFilterForm.classList.add('map__filters--disabled');
  mapFilterInteractiveElements.forEach((element) => element.setAttribute('disabled', 'disabled'));
};

const deactivateForms = () => {
  deactivateAdvertForm();
  deactivateMapFilterForm();
};

const activateAdvertForm = () => {
  advertForm.classList.remove('ad-form--disabled');
  advertFormtInteractiveElements.forEach((element) => element.removeAttribute('disabled', 'disabled'));
};

const activateMapFilterForm = () => {
  mapFilterForm.classList.remove('map__filters--disabled');
  mapFilterInteractiveElements.forEach((element) => element.removeAttribute('disabled', 'disabled'));
};

export {deactivateForms, activateAdvertForm, activateMapFilterForm};
