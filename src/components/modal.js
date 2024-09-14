//функция открытия модального окна 
function openPopup(evt) {
    evt.classList.add('popup_is-opened');
    //evt.querySelector('.popup__button').disabled = true; 
    document.addEventListener('keydown', closePopupByEscape);
}

//функция закрытия модального окна 
function closePopup(evt) {
    evt.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEscape);
    //clearValidation (evt)  
}

//функция-обработчик события нажатия Esc
function closePopupByEscape(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector('.popup_is-opened'));
    };
}

//функция-обработчик события клика по оверлею
function closePopupByOverlay(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closePopup(evt.target);
    }
};

export { openPopup, closePopup, closePopupByOverlay }