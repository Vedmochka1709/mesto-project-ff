import '../pages/index.css';
import {initialCards} from './cards.js';
import {openPopup, closePopup} from './modal.js';
import {creatCard, removeCard} from './card.js';

//код, который отвечает за отображение шести карточек при открытии страницы.
const placesList = document.querySelector('.places__list');

initialCards.forEach(item => {                         // Вывели карточки на страницу
    placesList.append(creatCard(item, removeCard)); 
})

// Закрытие всех попапов через кнопку
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach(function (closeButton) {
    closeButton.addEventListener('click', (evt) => {
        const eventTarget = evt.target;        // button, на который мы кликнули
        closePopup(eventTarget.closest('.popup'))
    })
});

//работа с модальным окном добавления карточки
const newCardPopup = document.querySelector('.popup_type_new-card');
const cardAddButton = document.querySelector('.profile__add-button');

cardAddButton.addEventListener('click', () => {
    openPopup(newCardPopup)
})

//работа с модальным окном профиля
const profilePopup = document.querySelector('.popup_type_edit');                 // попап профиля
const profileButton = document.querySelector('.profile__edit-button');           // кнопка редактирования профиля
const nameInput = document.querySelector('.popup__input_type_name');            //  поля формы в DOM
const jobInput = document.querySelector('.popup__input_type_description');      //  поля формы в DOM
const profileTitle = document.querySelector('.profile__title');                 //  Имя профиля
const profileDescription = document.querySelector('.profile__description');      // занятие профиля

profileButton.addEventListener('click', () => {
    openPopup(profilePopup)
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
})

//работа с модальным окном изображения карточки.
const cardPopup = document.querySelector('.popup_type_image');
const cardsImages = document.querySelectorAll('.card__image');

cardsImages.forEach(function (cardsImage) {                        // открывается пустым
    cardsImage.addEventListener('click', (evt) => {
        openPopup(cardPopup)
    })
});

// Редактирование имени и информации о себе
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(evt.target.closest('.popup'))
}

// Функция внесения пользователем новой карточки
function addCardFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const cardNameInput = document.querySelector('.popup__input_type_card-name');  //  поля формы 
    const urlInput = document.querySelector('.popup__input_type_url');              //  поля формы 
    const newCard = {};
    newCard.name = cardNameInput.value;
    newCard.link = urlInput.value;
        
    placesList.prepend(creatCard(newCard, removeCard)); 
    
    cardNameInput.value = '';
    urlInput.value = '';

    closePopup(evt.target.closest('.popup'))
}

// Сохранение изменений при  нажатии на Сохранить
const formElements = document.querySelectorAll('.popup__form'); 
      
formElements.forEach(function (formElement) {    // следит за событием “submit” - «отправка»
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        if (evt.target.closest('.popup_type_edit')) {  // выбирает форму
            handleFormSubmit(evt)
        } else {
            addCardFormSubmit(evt)
        }
    })
});