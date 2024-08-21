//const popup = document.querySelector('.popup');
 
//функция открытия модального окна 
function openPopup(evt) {                   
    evt.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEscape);
    document.addEventListener('click', closePopupByOverlay);
}

//функция закрытия модального окна 
function closePopup(evt) {                   
    evt.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEscape);
    document.removeEventListener('click', closePopupByOverlay);
}

//функция-обработчик события нажатия Esc
function closePopupByEscape(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector('.popup_is-opened'));
    };
}

//функция-обработчик события клика по оверлею
function closePopupByOverlay (evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(document.querySelector('.popup_is-opened'));
    }
   // if (evt.target.closest('.popup__close')) {
   //  closePopup();
   // }
};

export {openPopup, closePopup}