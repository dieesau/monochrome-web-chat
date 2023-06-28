interface ValidationResult {
    isValid: boolean;
    failedRule?: string;
    message?: string;
}

type ValidationRule = (value: string) => boolean;

const validationRules: Record<string, ValidationRule> = {
    messageForm: (value: string) => /.+/.test(value),
    loginForm: (value: string) => /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/.test(value),
    phoneForm: (value: string) => /^\+?\d{10,15}$/.test(value),
    emailForm: (value: string) => /^[A-Za-z0-9]+([_\-.][A-Za-z0-9]+)*@[A-Za-z0-9]+([_\-.][A-Za-z0-9]+)*\.[A-Za-z]+$/.test(value),
    nameForm: (value: string) => /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/.test(value),
    passwordForm: (value: string) => /^(?=.*[A-Z])(?=.*\d).{8,40}$/.test(value)
};

export function validate(value: string, rules: string[]): ValidationResult {
    for (const rule of rules) {
        const [ruleName, ruleParam, ruleMessage] = rule.split(':');
        if (!(validationRules[ruleName]?.(value, Number(ruleParam)) || validationRules[ruleName]?.(value))) {
            let message = ruleMessage;

            if (ruleName === 'loginForm') {
                message = `От 3 до 20 символов. Логин не может состоять из цифр, иметь спец. символы кроме дефиса и нижнего подчервикания.`

            } else if (ruleName === 'passwordForm') {
                message = `От 8 до 40 символов. Пароль должен содержать как минимум одну заглавную букву и цифру`;

            } else if (ruleName === 'nameFormat') {
                message = `Некорректный формат имени или фамилии`;

            }  else if (ruleName === 'emailForm') {
                message = "Такой email не подойдет"

            } else if (ruleName === 'phoneForm') {
                message = `Номер телефона введен некорректно`

            } else if (ruleName === 'messageForm') {
                message = 'Поле не может быть пустым'
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
