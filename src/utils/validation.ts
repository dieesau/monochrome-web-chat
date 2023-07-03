type ValidationRule = (value: string) => boolean;

const validationRules: Record<string, ValidationRule> = {
    messageForm: (value: string) => /.+/.test(value),
    loginForm: (value: string) => /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/.test(value),
    phoneForm: (value: string) => /^\+?\d{10,15}$/.test(value),
    emailForm: (value: string) => /^[A-Za-z0-9]+([_\-.][A-Za-z0-9]+)*@[A-Za-z0-9]+([_\-.][A-Za-z0-9]+)*\.[A-Za-z]+$/.test(value),
    nameForm: (value: string) => /^[А-ЯЁA-Zа-яёa-z-]+$/.test(value),
    passwordForm: (value: string) => /^(?=.*[A-Z])(?=.*\d).{8,40}$/.test(value),
    nicknameForm: (value: string) => /.+/.test(value),
};

export function validate(
    value: string,
    rules: string[],
    event: HTMLElement
): void {
    deleteError(event);

    for (const rule of rules) {
        const [ruleName, ruleParam, ruleMessage] = rule.split(':');
        if (!(validationRules[ruleName]?.(value, Number(ruleParam)) || validationRules[ruleName]?.(value))) {
            let message = ruleMessage;

            if (ruleName === 'loginForm') {
                message = `От 3 до 20 символов. Логин не может состоять из цифр, иметь спец. символы кроме дефиса и нижнего подчервикания.`
            } else if (ruleName === 'passwordForm') {
                message = `От 8 до 40 символов, только латинские буквы, должен содержать как минимум одну заглавную букву и цифру`;
            } else if (ruleName === 'nameForm') {
                message = `Только латинские или русские буквы, не должно иметь спец символы кроме дефиса`;
            } else if (ruleName === 'emailForm') {
                message = 'Такой email не подойдет';
            } else if (ruleName === 'phoneForm') {
                message = `от 10 до 15 символов, только цифры`;
            } else if (ruleName === 'nicknameForm') {
                message = `Имя в чате не должно быть пустым`;
            } else if (ruleName === 'messageForm') {
                message = 'Поле не может быть пустым';
            }

            displayError(event, message);
        }
    }
}

export function displayError(event: HTMLElement, errorMessage: string) {
    const next = event.target.nextSibling;
    const err = document.createElement('span');
    err.innerText = <string>errorMessage;
    next.tagName !== 'SPAN' && event.currentTarget.parentNode.insertBefore(err, event.target.nextSibling);
    console.log(errorMessage);
}

export function deleteError(event) {
    const next = event.target.nextSibling;
    next.tagName === 'SPAN' && event.currentTarget.parentNode.removeChild(next);
    console.log(`Email - ${event.target.value}`);
}