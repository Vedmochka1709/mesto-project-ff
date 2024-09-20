import { myId } from './index.js';
import { deleteCardServer, addLikeServer, deleteLikeServer } from './api.js';

// постоянный catch 
const errorResponse = (err) => {
    console.log(err);
}

// Функция создания карточки
function creatCard(obj, paramCreatCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);   // скопировали template
    const resetButton = cardElement.querySelector('.card__delete-button');     //  кнопка удаления
    const likeCount = cardElement.querySelector('.card__like-count');  // счётчик лайков

    cardElement.querySelector('.card__image').src = obj.link;
    cardElement.querySelector('.card__image').alt = obj.name;
    cardElement.querySelector('.card__title').textContent = obj.name;
    likeCount.textContent = obj.likes.length;

    cardElement.dataset.cardId = obj._id;                                  // задали id карточке

    if (obj.owner._id !== myId) {                 // кнопка только на своих карточках
        resetButton.remove()
    }

    resetButton.addEventListener('click', (evt) => {
        deleteCardServer(cardElement.dataset.cardId)
            .then(() => paramCreatCard.removeCard(evt))
            .catch(errorResponse)
    })

    const likeButton = cardElement.querySelector('.card__like-button');  // кнопка сердечко

    // отображение лайка при загрузке
    const checkLikeCard = obj.likes.some((like) => {
        return like._id.includes(myId)
    })
    if (checkLikeCard) {
        likeButton.classList.add('card__like-button_is-active')
    }

    likeButton.addEventListener('click', (likeButton) => {
        paramCreatCard.likeCard(likeButton, likeCount);
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
function likeCard(likeButton, likeCount) {
    const card = likeButton.target.closest('.card');

    if (!likeButton.target.classList.contains('card__like-button_is-active')) {
        addLikeServer(card.dataset.cardId)
            .then((data) => {
                likeCount.textContent = data.likes.length;
                likeButton.target.classList.add('card__like-button_is-active');
            })
            .catch(errorResponse)
    }
    else {
        deleteLikeServer(card.dataset.cardId)
            .then((data) => {
                likeCount.textContent = data.likes.length;
                likeButton.target.classList.remove('card__like-button_is-active');
            })
            .catch(errorResponse)
    }
}

export { creatCard, removeCard, likeCard, errorResponse }