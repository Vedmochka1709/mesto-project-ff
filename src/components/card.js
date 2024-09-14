import { myId } from './index.js';
import { deleteCardServer, addLikeServer, deleteLikeServer } from './api.js';

// Функция создания карточки
function creatCard(obj, paramCreatCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);   // скопировали template
    cardElement.querySelector('.card__image').src = obj.link;
    cardElement.querySelector('.card__image').alt = obj.name;
    cardElement.querySelector('.card__title').textContent = obj.name;
    cardElement.querySelector('.card__like-count').textContent = obj.likes.length;

    const resetButton = cardElement.querySelector('.card__delete-button');     //  кнопка удаления
    cardElement.dataset.cardId = obj._id;                                  // задали id карточке

    if (obj.owner._id !== myId) {                 // кнопка только на своих карточках
        cardElement.querySelector('.card__delete-button').remove()
    }

    resetButton.addEventListener('click', (evt) => {
        paramCreatCard.removeCard(evt);
        deleteCardServer(cardElement.dataset.cardId)
    })

    const likeButton = cardElement.querySelector('.card__like-button');  // кнопка сердечко

    // отображение лайка при загрузке
    const checkLikeCard = obj.likes.some((like) => {
        return like._id.includes(myId)
    })
    if (checkLikeCard) {
        likeButton.classList.add('card__like-button_is-active')
    }

    likeButton.addEventListener('click', (evt) => {
        paramCreatCard.likeCard(evt);
    })

    //работа с модальным окном изображения карточки.
    const cardsImage = cardElement.querySelector('.card__image')
    cardsImage.addEventListener('click', () => {
        paramCreatCard.openImgCard(cardsImage.alt, cardsImage.src)
    })

    return cardElement;
}

// Функция удаления карточки
function removeCard(evt) {
    const eventTarget = evt.target;                             // выбрали кнопку, на которую нажали
    const closestParentCard = eventTarget.closest('.places__item');
    closestParentCard.remove();             //  выбрали родителя и удалили
}

//  Функция лайка карточки
function likeCard(evt) {
    const card = evt.target.closest('.card');
    const likeCount = card.querySelector('.card__like-count');

    if (!evt.target.classList.contains('card__like-button_is-active')) {
        addLikeServer(card.dataset.cardId)
            .then((data) => {
                likeCount.textContent = data.likes.length;
                evt.target.classList.add('card__like-button_is-active');
            })
            .catch((err) => {
                console.logr(err);
            })
    }
    else {
        deleteLikeServer(card.dataset.cardId)
            .then((data) => {
                likeCount.textContent = data.likes.length;
                evt.target.classList.remove('card__like-button_is-active');
            })
            .catch((err) => {
                console.log(err);
            })
    }
}




export { creatCard, removeCard, likeCard }