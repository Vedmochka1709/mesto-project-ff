import {openPopup} from './modal.js';
// Функция создания карточки
function creatCard(item, removeCard, likeCard, openImgCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);   // скопировали template
    cardElement.querySelector('.card__image').src = item.link; 
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name; 

    const resetButton = cardElement.querySelector('.card__delete-button');            //  кнопка удаления
    resetButton.addEventListener('click', removeCard)

    const likeButton = cardElement.querySelector('.card__like-button');  // кнопка сердечко
    likeButton.addEventListener('click', likeCard)

    //работа с модальным окном изображения карточки.
    const cardsImages = document.querySelectorAll('.card__image');
    cardsImages.forEach(function (cardsImage) {                       
        cardsImage.addEventListener('click', openImgCard)
    });

    return cardElement;
}

// Функция удаления карточки
function removeCard(evt) {
    const eventTarget = evt.target;                             // выбрали кнопку, на которую нажали
    eventTarget.closest('.places__item').remove();             //  выбрали родителя и удалили
}

//  Функция лайка карточки
function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

// Функция открытия изображения карточки
function openImgCard(evt) {
    const cardPopup = document.querySelector('.popup_type_image');    // выбрали попап
    const imgCardPopup = cardPopup.querySelector('.popup__image');    // выбрали изображение
    const textCardPopup = cardPopup.querySelector('.popup__caption');  // выбрали текст
    imgCardPopup.src = evt.target.src;
    imgCardPopup.alt = evt.target.alt;
    textCardPopup.textContent = evt.target.alt; 
    openPopup(cardPopup)
}

export {creatCard, removeCard, likeCard, openImgCard}