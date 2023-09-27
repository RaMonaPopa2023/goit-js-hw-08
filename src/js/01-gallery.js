// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const listEl = document.querySelector('.gallery');
let lightbox;
function createGalleryItem(img) {
  const listImgEl = document.createElement('li');
  listImgEl.classList.add('gallery__item');
  listImgEl.innerHTML = `<a class="gallery__link" href="${img.original}">
      <img
          class="gallery__image"
          src="${img.preview}"
          data-source="${img.original}"
          alt="${img.description}"
      />
      </a>`;
  return listImgEl;
}
function openImageInLightbox(event) {
  event.preventDefault();

  const clickedOn = event.target;

  if (clickedOn.nodeName !== 'IMG') {
    return;
  }

  const images = Array.from(listEl.querySelectorAll('img'));
  const startIndex = images.findIndex(img => img === clickedOn);

  if (startIndex === -1) {
    return;
  }

  lightbox = new SimpleLightbox(
    images.map(img => img.parentNode),
    {
      startIndex: startIndex,
    }
  );
}

function closeLightboxOnEscape(event) {
  if (event.key === 'Escape' && lightbox) {
    lightbox.close();
  }
}

function initializeGallery() {
  galleryItems.forEach(img => {
    const listImgEl = createGalleryItem(img);
    listEl.append(listImgEl);
  });

  listEl.addEventListener('click', openImageInLightbox);
  document.addEventListener('keydown', closeLightboxOnEscape);
}

initializeGallery();
