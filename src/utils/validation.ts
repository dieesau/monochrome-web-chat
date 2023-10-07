import { Block } from 'core/Block';

const regExpForEmail = /^[A-Z0-9-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
const regExpForName = /^[A-ZА-Я]{1}[A-ZА-Яa-zа-я-]{2,30}$/;
const regExpForPhone = /^[0-9+]{1}[0-9]{9,14}$/;
const regExpForPassword = /^((?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,40})$/;
const regExpForLogin = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/;

export function validationLogin(elem: any) {
    const inputValue = (elem.element!.children[1] as HTMLInputElement).value;
    if(inputValue !== '') {
        const result = regExpForLogin.test(inputValue);
        if(result === true) {
            (elem.element!.children[2] as HTMLLabelElement).textContent = '';
            (elem.element!.children[1] as HTMLInputElement).style.color = "#000000";
        } else {
            (elem.element!.children[2] as HTMLLabelElement).textContent = 'Можно использовать буквы, цифры, дефис, нижнее подчеркивание, первой должна быть буква';
            (elem.element!.children[1] as HTMLInputElement).style.color = "#FF2F2F";
        }
    }
}

export function validationPassword(elem: any) {
    const inputValue = (elem.element!.children[1] as HTMLInputElement).value;
    if(inputValue !== '') {
        const result = regExpForPassword.test(inputValue);
        if(result === true) {
            (elem.element!.children[2] as HTMLLabelElement).textContent = '';
            (elem.element!.children[1] as HTMLInputElement).style.color = "#000000";
        } else {
            (elem.element!.children[2] as HTMLLabelElement).textContent = 'Минимальная длина 8 символов, обязательно хотя бы одна цифра и заглавная буква';
            (elem.element!.children[1] as HTMLInputElement).style.color = "#FF2F2F";
        }
    }
}

export function validationPhone(elem: any) {
    const inputValue = (elem.element!.children[1] as HTMLInputElement).value;
    if(inputValue !== '') {
        const result = regExpForPhone.test(inputValue);
        if(result === true) {
            (elem.element!.children[2] as HTMLLabelElement).textContent = '';
            (elem.element!.children[1] as HTMLInputElement).style.color = "#000000";
        } else {
            (elem.element!.children[2] as HTMLLabelElement).textContent = 'Необходимо использовать цифры без пробелов или дефиса, может начинаться с плюса';
            (elem.element!.children[1] as HTMLInputElement).style.color = "#FF2F2F";
        }
    }
}

export function validationName(elem: any) {
    const inputValue = (elem.element!.children[1] as HTMLInputElement).value;
    if(inputValue !== '') {
        const result = regExpForName.test(inputValue);
        if(result === true) {
            (elem.element!.children[2] as HTMLLabelElement).textContent = '';
            (elem.element!.children[1] as HTMLInputElement).style.color = "#000000";
        } else {
            (elem.element!.children[2] as HTMLLabelElement).textContent = 'Можно использовать только буквы и дефис, первая буква должна быть заглавной';
            (elem.element!.children[1] as HTMLInputElement).style.color = "#FF2F2F";
        }
    }
}

export function validationEmail(elem: any) {
    const inputValue = (elem.element!.children[1] as HTMLInputElement).value;
    if(inputValue !== '') {
        const result = regExpForEmail.test(inputValue);
        if(result === true) {
            (elem.element!.children[2] as HTMLLabelElement).textContent = '';
            (elem.element!.children[1] as HTMLInputElement).style.color = "#000000";
        } else {
            (elem.element!.children[2] as HTMLLabelElement).textContent = 'Введите корректный email адрес';
            (elem.element!.children[1] as HTMLInputElement).style.color = "#FF2F2F";
        }
    }
}
