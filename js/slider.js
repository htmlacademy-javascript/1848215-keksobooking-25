export const slider = () => {
  const sliderElement = document.querySelector('.ad-form__slider');
  const valueElement = document.querySelector('#price');
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: 0,
    step: 1000,
    connect: 'lower',
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      },
    }
  });

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
  });

  // sliderElement.setAttribute('disabled', true);

  // sliderElement.removeAttribute('disabled');

  // sliderElement.noUiSlider.destroy();
};
