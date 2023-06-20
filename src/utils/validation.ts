interface ValidationResult {
    isValid: boolean;
    failedRule?: string;
    message?: string;
}

type ValidationRule = (value: string) => boolean;

const validationRules: Record<string, ValidationRule> = {
    minLen: (value: string, length: number) => value.length >= length,
    maxLen: (value: string, length: number) => value.length <= length,
    req: (value: string) => value.trim() !== '',
    firstUpCase: (value: string) => /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё]*$/.test(value),
    latinOrCyrill: (value: string) => /^[A-Za-zА-Яа-яЁё]+$/.test(value),
    noSpaces: (value: string) => !/\s/.test(value),
    noSpecChar: (value: string) => /^[A-Za-zА-Яа-яЁё\d_-]+$/.test(value),
    validPhone: (value: string) => /^\+?\d{10,15}$/.test(value),
    emailFormat: (value: string) => /^[A-Za-z0-9]+([_\-.][A-Za-z0-9]+)*@([A-Za-z0-9]+([_\-.][A-Za-z0-9]+)*)+\.[A-Za-z]{2,}$/.test(value),
    nameFormat: (value: string) => /^[A-Za-zА-ЯЁ][A-Za-zА-Яа-яЁё\-]*$/.test(value),
    passwordFormat: (value: string) => /^(?=.*[A-Z])(?=.*\d).*$/.test(value),
};

export function validate(value: string, rules: string[]): ValidationResult {
    for (const rule of rules) {
        const [ruleName, ruleParam, ruleMessage] = rule.split(':');
        if (!(validationRules[ruleName]?.(value, Number(ruleParam)) || validationRules[ruleName]?.(value))) {
            let message = ruleMessage;
            if (ruleName === 'minLen') {
                message = `Минимальная длина поля ${ruleParam}`;
            } else if (ruleName === 'maxLen') {
                message = `Максимальная длина поля ${ruleParam}`
            } else if (ruleName === 'req') {
                message = `Поле не может быть пустым`
            } else if (ruleName === 'firstUpCase') {
                message = `Первая буква должна быть заглавной`
            } else if (ruleName === 'latinOrCyrill') {
                message = `Допустимо использовать только кириллицу или латиницу`
            } else if (ruleName === 'noSpaces') {
                message = `Поле не должно содержать пробелов`
            } else if (ruleName === 'noSpecChar') {
                message = `Поле не должно содержать специальных символов кроме символа подчервкивания и тире`
            } else if (ruleName === 'validPhone') {
                message = `Номер телефона введен некорректно`
            } else if (ruleName === 'emailFormat') {
                message = "Такой email не подойдет"
            } else if (ruleName === 'nameFormat') {
                message = `Некорректный формат имени или фамилии`;
            } else if (ruleName === 'passwordFormat') {
                message = `Пароль должен содержать как минимум одну заглавную букву и цифру`;
            }
            return {
                isValid: false,
                failedRule: ruleName,
                message: message || 'Правило валидации не выполнено',
            };
        }
    }
    return {
        isValid: true,
    };
}
