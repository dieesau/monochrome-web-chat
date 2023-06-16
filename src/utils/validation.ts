interface ValidationResult {
    isValid: boolean;
    failedRule?: string;
}

type ValidationRule = (value: string) => boolean;

const validationRules: Record<string, ValidationRule> = {
    minLen: (value: string, length: number) => value.length >= length,
    maxLen: (value: string, length: number) => value.length <= length,
    req: (value: string) => value.trim() !== '',
    firstUpCase: (value) => /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё]*$/.test(value),
    latinOrCyrill: (value) => /^[A-Za-zА-Яа-яЁё]+$/.test(value),
    noSpaces: (value) => !/\s/.test(value),
    noSpecChar: (value) => /^[A-Za-zА-Яа-яЁё\d_-]$/.test(value),
    oneUpperReq: (value) => /[A-ZА-ЯЁ]/.test(value),
    oneDigitReq: (value) => /\d/.test(value),
    validPhone: (value) => /^\+?\d{10,15}$/.test(value),
}

export function validate(value: string, rules: string[]): ValidationResult {
    for (const rule of rules) {
        const [ruleName, ruleParam] = rule.split(':');
        if (!(validationRules[ruleName]?.(value, Number(ruleParam)) || validationRules[ruleName]?.(value))) {
            return {
                isValid: false,
                failedRule: ruleName,
            };
        }
    }
    return {
        isValid: true,
    };
}
