const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];
const DEFAULT_AVATAR_IMAGE = 'img/muffin-grey.svg';
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const avatarInput = document.querySelector('#avatar');
const photoInput = document.querySelector('#images');
const photoContainer = document.querySelector('.ad-form__photo');
let img;

const onPhotoInputsChange = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const result = reader.result;
      switch (evt.target) {
        case avatarInput:
          previewAvatar.src = result;
          break;
        case photoInput:
          if (!img) {
            img = document.createElement('img');
            img.src = result;
            img.style.width = '70px';
            img.style.height = '70px';
            photoContainer.appendChild(img);
            break;
          }
          img.src = result;
          break;
        default:
          break;
      }
    });
    reader.readAsDataURL(file);
  }
};

const clearImageBlocks = () => {
  previewAvatar.src = DEFAULT_AVATAR_IMAGE;
  photoContainer.innerHTML = '';
};

const addPhotoInputsListeners = () => {
  avatarInput.addEventListener('change', onPhotoInputsChange);
  photoInput.addEventListener('change', onPhotoInputsChange);
};

export {clearImageBlocks, addPhotoInputsListeners};
