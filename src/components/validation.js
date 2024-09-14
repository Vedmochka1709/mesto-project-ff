// Находим и показываем собщение об ошибке
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');   // стилизация по этому классу 
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');   // стилизация по этому классу
};

// Скрываем собщение об ошибке
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

//Проверка на валидность
const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

// Проверяем на валидность все инпуты одной формы, ищет невалидное
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {  // Если поле не валидно, колбэк вернёт true
        return !inputElement.validity.valid;
    })
};

// Меняет кнопку отправки
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;      // сделай кнопку неактивной
    } else {
        buttonElement.disabled = false;       // иначе сделай кнопку активной
    }
};


// Слушаем все поля на валидность
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));  //все инпуты
    const buttonElement = formElement.querySelector('.popup__button');  // кнопка сохранить

    //toggleButtonState(inputList, buttonElement); - нужно
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

// Проверяем все формы на валидность
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));  // все формы

    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

// Функция очистки ошибок
function clearValidation() {
    document.querySelectorAll('.popup__input-error').forEach((errorElement) => {
        errorElement.textContent = '';
    })
    document.querySelectorAll('.popup__input').forEach((inputElement) => {
        inputElement.classList.remove('popup__input_type_error');
    })
}

export { enableValidation, clearValidation }