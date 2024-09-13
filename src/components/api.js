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
            //avatar: 
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

export {getMeProfileServer, getCardsServer, deleteCardServer, editProfileServer, addCardServer, addLikeServer, deleteLikeServer}