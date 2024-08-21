
// Функция создания карточки
function creatCard(item, removeCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);   // скопировали template
    cardElement.querySelector('.card__image').src = item.link; 
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name; 

    const resetButton = cardElement.querySelector('.card__delete-button');            //  кнопка удаления
    resetButton.addEventListener('click', removeCard)
    
    return cardElement;
} 
// Функция удаления карточки
function removeCard(evt) {
    const eventTarget = evt.target;                             // выбрали кнопку, на которую нажали
    eventTarget.closest('.places__item').remove();             //  выбрали родителя и удалили
}

//  лайк карточки

export {creatCard, removeCard}