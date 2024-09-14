// Постоянная часть адреса и header
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
    headers: {
      authorization: 'e3bd6989-a024-42df-9cf0-cae8bd3b5164',
      'Content-Type': 'application/json'
    }
}

// постоянный первый then
const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`)}

// Запрос данных пользователя
function getMeProfileServer() {
    return fetch(`${config.baseUrl}/users/me`, {   // о пользователе
        headers: config.headers
    })
        .then(handleResponse)
}

//Запрос карточек с сервера
function getCardsServer() {
    return fetch(`${config.baseUrl}/cards`, {  // карточки с сервера
        headers: config.headers
    })
        .then(handleResponse)
}

// Удаление карточки с сервера
function deleteCardServer (cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, { 
        method: 'Delete',
        headers: config.headers
    })
        .then(handleResponse)
}

// Отправка на сервер данных Профиля
function editProfileServer(profileTitle, profileDescription) {
    return fetch(`${config.baseUrl}/users/me`, {  
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileTitle.textContent,
            about: profileDescription.textContent,
        })
    })
    .then(handleResponse)
}

//смена аватара
function editAvatarServer(newUrlAvatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {  
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: newUrlAvatar
        })
    })
    .then(handleResponse)
}

// Добавление новой карточки на сервер
function addCardServer(newCard) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link,
            likes: newCard.likes,
        })
    })
    .then(handleResponse)
}

// Навешивание лайка
function addLikeServer (cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
        method: 'PUT',
        headers: config.headers
    })
        .then(handleResponse)
}

// Снятие лайка
function deleteLikeServer (cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
        method: 'Delete',
        headers: config.headers
    })
        .then(handleResponse)
}

export {getMeProfileServer, getCardsServer, deleteCardServer, editProfileServer, addCardServer, addLikeServer, deleteLikeServer, editAvatarServer}

//доделать

/*Опционально, если хотите потренироваться, можете проверить, что это именно URL на изображение,
 и он действительный. Для этого вам потребуется сделать запрос с методом HEAD по этому 
 адресу и проверить статус ответа и mime-тип в заголовках.*/


 /*Попап удаления карточки
 Он должен открываться по клику на иконку удаления:
 https://www.figma.com/file/PSdQFRHoxXJFs2FH8IXViF/JavaScript.-Sprint-9?node-id=109%3A150 */