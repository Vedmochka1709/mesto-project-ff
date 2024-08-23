function creatCard(obj, paramCreatCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);   // скопировали template
    cardElement.querySelector('.card__image').src = obj.link;
    cardElement.querySelector('.card__image').alt = obj.name;
    cardElement.querySelector('.card__title').textContent = obj.name; 

    const resetButton = cardElement.querySelector('.card__delete-button');     //  кнопка удаления
    resetButton.addEventListener('click', paramCreatCard.removeCard)

    const likeButton = cardElement.querySelector('.card__like-button');  // кнопка сердечко
    likeButton.addEventListener('click', paramCreatCard.likeCard)

    //работа с модальным окном изображения карточки.
    const cardsImage = cardElement.querySelector('.card__image')
    cardsImage.addEventListener('click', () => {
        paramCreatCard.openImgCard (cardsImage.alt, cardsImage.src)
    })

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

export {creatCard, removeCard, likeCard}