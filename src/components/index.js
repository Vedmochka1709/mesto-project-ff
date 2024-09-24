import '../pages/index.css';
import { openPopup, closePopup, closePopupByOverlay } from './modal.js';
import { creatCard, removeCard, likeCard, errorResponse } from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import { getMeProfileServer, getCardsServer, editProfileServer, addCardServer, deleteCardServer, editAvatarServer } from './api.js';

const paramCreatCard = { removeCard, likeCard, openImgCard, deleteCardServer };     // все функции карточки

const popapFormNewCard = document.forms["new-place"];     // форма попапа добавления карточки
const popapFormProfile = document.forms["edit-profile"];    // форма попапа профиля
const popapFormAvatar = document.forms["new-avatar"];    // форма попапа аватара

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
const profileImage = document.querySelector('.profile__image');         // фото профиля
export let myId = ''

const avatarPopup = document.querySelector('.popup_type_new-avatar');                 // попап аватара
const avatar = document.querySelector('.profile__image');           // кнопка редактирования аватара
const urlInputAvatar = document.querySelector('.popup__input_url_avatar');         //  поле попап ссылки на новый аватар 

const cardPopup = document.querySelector('.popup_type_image');    // попап для изображений
const imgCardPopup = cardPopup.querySelector('.popup__image');    // изображение в попапе для изображений
const textCardPopup = cardPopup.querySelector('.popup__caption');  // текст в попапе для изображений

const newCard = {};   //   массив для новой карточки

const promises = [getMeProfileServer(), getCardsServer()]  // промисы, которые должны вместе загрузиться

const validationConfig = {                  // классы для валидации
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

// Функция изменения кнопки при загрузке
function changeButtonName(popup, name, config) {
    popup.querySelector(config.submitButtonSelector).textContent = name;
}

// Функция редактирования имени и информации о себе
function editProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    changeButtonName(profilePopup, 'Сохранение...', validationConfig)
    editProfileServer(nameInput, jobInput)
        .then((data) => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            closePopup(profilePopup)
            clearValidation(popapFormProfile, validationConfig)
        })
        .catch(errorResponse)
        .finally(() => {
            changeButtonName(profilePopup, 'Сохранить', validationConfig)
        });

}

// Функция внесения новой карточки
function addCardFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    changeButtonName(newCardPopup, 'Сохранение...', validationConfig)
    newCard.name = cardNameInput.value;
    newCard.link = urlInput.value;
    newCard.likes = '';

    addCardServer(newCard)
        .then((newCard) => {
            placesList.prepend(creatCard(newCard, paramCreatCard));
            closePopup(newCardPopup);
            popapFormNewCard.reset()
        })
        .catch(errorResponse)
        .finally(() => {
            changeButtonName(newCardPopup, 'Сохранить', validationConfig)
        });
}

// Функция обновления аватара
function addAvatarSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    changeButtonName(avatarPopup, 'Сохранение...', validationConfig)
    const newUrlAvatar = urlInputAvatar.value
    editAvatarServer(newUrlAvatar)
        .then((data) => {
            avatar.setAttribute('style', `background-image: url(${data.avatar})`);
            console.log(data)
            closePopup(avatarPopup);
            popapFormAvatar.reset()
        })
        .catch(errorResponse)
        .finally(() => {
            changeButtonName(avatarPopup, 'Сохранить', validationConfig)
        });
}

// Функция открытия попапа карточки
function openImgCard(name, url) {
    imgCardPopup.src = url;
    imgCardPopup.alt = name;
    textCardPopup.textContent = name;
    openPopup(cardPopup)
}

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
avatarPopup.addEventListener('click', closePopupByOverlay);

//работа с модальным окном добавления карточки
cardAddButton.addEventListener('click', () => {
    popapFormNewCard.reset()
    openPopup(newCardPopup)
    clearValidation(popapFormNewCard, validationConfig)
})

//работа с модальным окном профиля
profileButton.addEventListener('click', () => {
    openPopup(profilePopup)
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(popapFormProfile, validationConfig)
})

//работа с изменением аватара
avatar.addEventListener('click', () => {
    popapFormAvatar.reset()
    openPopup(avatarPopup);
    clearValidation(popapFormAvatar, validationConfig)
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

popapFormAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    addAvatarSubmit(evt)
})

// Вызовем функцию проверки валидности
enableValidation(validationConfig);

Promise.all(promises)
    .then(([MeProfileServer, CardsServer]) => {
        profileTitle.textContent = MeProfileServer.name;                           // Запрос данных пользователя
        profileDescription.textContent = MeProfileServer.about;
        profileImage.style.backgroundImage = `url("${MeProfileServer.avatar}")`;  // Картинка меняется? или `url(${result.avatar})`
        myId = MeProfileServer._id
        CardsServer.forEach((item) => {                         // Вывели карточки на страницу
            placesList.append(creatCard(item, paramCreatCard))
        })
    })
    .catch(errorResponse)
