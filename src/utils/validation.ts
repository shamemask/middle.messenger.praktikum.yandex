export function validate(inputName: string, value: string): string | null {
    const validators: { [key: string]: RegExp } = {
        first_name: /^[A-ZА-Я][a-zа-я]+$/,
        second_name: /^[A-ZА-Я][a-zа-я]+$/,
        login: /^(?=.*[a-zA-Z])[a-zA-Z0-9-_]{3,20}$/,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        password: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
        phone: /^\+?\d{10,15}$/,
        message: /.+/,
    };

    const regex = validators[inputName];
    if (!regex) return null;
    return regex.test(value) ? null : 'Invalid value';
}