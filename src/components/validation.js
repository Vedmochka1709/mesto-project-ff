// Находим и показываем собщение об ошибке
const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);   // стилизация по этому классу 
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);   // стилизация по этому классу
};

// Скрываем собщение об ошибке
const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
    inputElement.setCustomValidity("") // Позволяет добавить в элемент кастомное сообщение об ошибке
};

//Проверка на валидность
const isValid = (formElement, inputElement, config) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

// Проверяем на валидность все инпуты одной формы, ищет невалидное
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {  // Если поле не валидно, колбэк вернёт true
        return !inputElement.validity.valid;
    })
};

// Меняет кнопку отправки
const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;      // сделай кнопку неактивной
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;       // иначе сделай кнопку активной
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
};

// Слушаем все поля на валидность
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));  //все инпуты
    const buttonElement = formElement.querySelector(config.submitButtonSelector);  // кнопка сохранить

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

// Проверяем все формы на валидность
function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));  // все формы

    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
};

// Функция очистки ошибок
/*function clearValidation(config) {
    document.querySelectorAll('.popup__input-error').forEach((errorElement) => {
        errorElement.textContent = '';
    })
    document.querySelectorAll(config.inputSelector).forEach((inputElement) => {
        inputElement.classList.remove(config.inputErrorClass);
    })
}*/
function clearValidation(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, submitButton, config);

    inputList.forEach((input) => {
        input.classList.remove(config.inputErrorClass);
        const inputError = form.querySelector(`.${input.id}-error`);

        inputError.classList.remove(config.errorClass);
        inputError.textContent = '';
    })
}


/*enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  });*/
export { enableValidation, clearValidation }