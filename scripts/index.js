const content = document.querySelector('.content');
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function creatCard(item, removeCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = item.link; 
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name; 

    const resetButton = cardElement.querySelector('.card__delete-button');
    resetButton.addEventListener('click', removeCard)
    
    return cardElement;
} 
// @todo: Функция удаления карточки
function removeCard(evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.places__item').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
    placesList.append(creatCard(item, removeCard)); 
})

