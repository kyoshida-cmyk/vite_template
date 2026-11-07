// <!-- POPUP -->
// <div id="popup-overlay" class="overlay">
//   <div class="popup-content">
//     <img id="popup-image" src="" alt="Popup Image" />
//     <img src="./images/common/popup/popup-close.svg" alt="close" class="popup-close" />
//   </div>
// </div>

// <div class="shop-list__logo popup-trigger fadeUpTrigger" data-image="./images/top/shop_list/popup_shop_09.webp">
//       <img src="./images/top/shop_list/shop_09.webp" alt="" loading="lazy" />
//     </div>

const popupOverlay = document.getElementById("popup-overlay");
const popupImage = document.getElementById("popup-image");
const popupCloseButton = document.querySelector(".popup-close");

function lockScroll() {
  document.body.classList.add("is-locked");
}

function unlockScroll() {
  document.body.classList.remove("is-locked");
}

function openPopup(imagePath) {
  popupImage.src = imagePath;

  popupOverlay.classList.add("is-active");
  lockScroll();
}

function closePopup() {
  popupOverlay.classList.remove("is-active");

  // 次回表示時のちらつき防止
  popupImage.src = "";

  unlockScroll();
}

popupCloseButton.addEventListener("click", closePopup);

popupOverlay.addEventListener("click", (event) => {
  const isOverlayClick = event.target === popupOverlay;

  if (!isOverlayClick) {
    return;
  }

  closePopup();
});

document.addEventListener("click", (event) => {
  const trigger = event.target.closest(".popup-trigger");

  if (!trigger || !trigger.dataset.image) {
    return;
  }

  openPopup(trigger.dataset.image);
});
