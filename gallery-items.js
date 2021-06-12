export default [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

import images from "./gallery-items.js";

const galleryBox = document.querySelector(".js-gallery");
const overlayBox = document.querySelector(".js-gallery");
const lightBox = document.querySelector(".js-lightbox");
const lightBoxImg = document.querySelector(".lightbox__image");
const closeBtn = document.querySelector(`[data-action="close-lightbox"]`);

const imgMarkup = createGallery(images);

galleryBox.insertAdjacentHTML("beforeend", imgMarkup);

galleryBox.addEventListener("click", isOpenModal);
closeBtn.addEventListener("click", isCloseModal);


// gallery

function createGallery(images) {
  return images.map(({ preview, original, description }) => {
    return `
    <li class ="gallery__item">
    <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
    </a>
    </li>
    `
  }).join("");
}

// open

function isOpenModal(e) {
  const galleryEl = e.target;
  e.preventDefault();
  if (galleryEl.nodeName !== "IMG") {
    return;
  }

  lightBoxImg.src = galleryEl.dataset.source;
  lightBoxImg.alt = galleryEl.alt;
  lightBox.classList.add("is-open");

  overlayBox.addEventListener("click", closeModalOverlay)
  closeBtn.addEventListener("click", isCloseModal);
  window.addEventListener("keydown", closeEsc);
  window.addEventListener("keydown", scrolling);
}

// close

function isCloseModal(e) {
  lightBox.classList.remove("is-open")
  lightBoxImg.src = "";
  lightBoxImg.alt = "";
  closeBtn.removeEventListener("click", isCloseModal);
  overlayBox.removeEventListener("click", closeModalOverlay)
  window.removeEventListener("keydown", closeEsc);
}

function closeModalOverlay(e) {
  if (e.carrentTarget === e.target) {
    isCloseModal(e);
  }  
}

function closeEsc(e) {
  if (e.code === "Escape") {
    isCloseModal(e);
  }  
}

//left-right 

const img = document.querySelectorAll(".gallery__image");
const arrayImages = [];

img.forEach((el) => {
  arrayImages.push(el.getAttribute("data-source"));
});
function scrolling(evt) {
  let newIndex;
  const currentId = arrayImages.indexOf(lightBoxImg.src);
  if (evt.key === "ArrowLeft") {
    newIndex = currentId - 1;
    if (newIndex == -1) {
      newIndex = arrayImages.length - 1;
    }
  } else if (evt.key === "ArrowRight") {
    newIndex = currentId + 1;
    if (newIndex === arrayImages.length) {
      newIndex = 0;
    }
  }
  lightBoxImg.src = arrayImages[newIndex];
}