import '../pages/index.css';
import {initialCards} from './cards.js';
import {openPopup, closePopup, closePopupByOverlay} from './modal.js';
import {creatCard, removeCard, likeCard} from './card.js';

const paramCreatCard = {removeCard, likeCard, openImgCard};     // все функции карточки

//const formElements = document.querySelectorAll('.popup__form');    // все попапы

const popapFormNewCard = document.forms["new-place"];     // форма попапа добавления карточки
const popapFormProfile = document.forms["edit-profile"];    // форма попапа профиля

const placesList = document.querySelector('.places__list');     // коробка для карточек
const closeButtons = document.querySelectorAll('.popup__close');    // кнопка закрытия у попапов

const newCardPopup = document.querySelector('.popup_type_new-card');  // попап создания новой карточки
const cardAddButton = document.querySelector('.profile__add-button');  // кнопка создания новой карточки
const cardNameInput = document.querySelector('.popup__input_type_card-name');  //  поле попап подписи изображения 
const urlInput = document.querySelector('.popup__input_type_url');         //  поле попап ссылки на изображение 

const profilePopup = document.querySelector('.popup_type_edit');                 // попап профиля
const profileButton = document.querySelector('.profile__edit-button');           // кнопка редактирования профиля
const nameInput = document.querySelector('.popup__input_type_name');            //  поле имени попапа профиля
const jobInput = document.querySelector('.popup__input_type_description');      //  поле занятия попапа профиля
const profileTitle = document.querySelector('.profile__title');                 //  Имя профиля на странице
const profileDescription = document.querySelector('.profile__description');      // занятие профиля на странице

const cardPopup = document.querySelector('.popup_type_image');    // попап для изображений
const imgCardPopup = cardPopup.querySelector('.popup__image');    // изображение в попапе для изображений
const textCardPopup = cardPopup.querySelector('.popup__caption');  // текст в попапе для изображений

// Функция редактирования имени и информации о себе
function editProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(profilePopup)
}

// Функция внесения пользователем новой карточки
function addCardFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const newCard = {};
    newCard.name = cardNameInput.value;
    newCard.link = urlInput.value;
    placesList.prepend(creatCard(newCard, paramCreatCard));    

    popapFormNewCard.reset()

    closePopup(newCardPopup)
}

function openImgCard(name, url) {
    imgCardPopup.src = url;
    imgCardPopup.alt = name;
    textCardPopup.textContent = name; 
    openPopup(cardPopup)
}

//код, который отвечает за отображение шести карточек при открытии страницы.
initialCards.forEach( (item) => {                         // Вывели карточки на страницу
    placesList.append(creatCard(item, paramCreatCard))
})

// Закрытие всех попапов через кнопку
closeButtons.forEach(function (closeButton) {
    closeButton.addEventListener('click', (evt) => {
        const eventTarget = evt.target;        // button, на который мы кликнули
        closePopup(eventTarget.closest('.popup'))
    })
});

// Закрытие всех попапов через Оверлей
newCardPopup.addEventListener('click', closePopupByOverlay);
profilePopup.addEventListener('click', closePopupByOverlay);
cardPopup.addEventListener('click', closePopupByOverlay);

//работа с модальным окном добавления карточки
cardAddButton.addEventListener('click', () => {
    openPopup(newCardPopup)
})

//работа с модальным окном профиля
profileButton.addEventListener('click', () => {
    openPopup(profilePopup)
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
})

// Сохранение изменений при  нажатии на Сохранить 
popapFormNewCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    addCardFormSubmit(evt)
})

popapFormProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    editProfileFormSubmit(evt)
})