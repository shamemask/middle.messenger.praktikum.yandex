const validators: Record<string, RegExp> = {
  first_name: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
  second_name: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
  login: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]{3,20})$/,
  display_name: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]{3,20})$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
  phone: /^\+?\d{10,15}$/,
  message: /.+/,
};

export function validateField(name: string, value: string): boolean {
  const regex = validators[name];
  if (regex) {
    const isValid = regex.test(value);
    if (!isValid) {
      showError(name, `Invalid ${name}`);
    } else {
      hideError(name);
    }
    return isValid;
  }

  return true;
}

interface FormData {
  [key: string]: string;
}

export function validateForm(data: FormData): boolean {
  let isValid = true;
  Object.entries(data).forEach(([key, value]) => {
    if (!validateField(key, value)) {
      isValid = false;
    }
  });

  // Check password match
  if (data.password !== data.repeat_password) {
    showError("repeat_password", "Passwords do not match");
    isValid = false;
  } else {
    hideError("repeat_password");
  }

  return isValid;
}

export function showError(field: string, message: string) {
  const errorElement = document.querySelector(`#${field}-error`);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

export function hideError(field: string) {
  const errorElement = document.querySelector(`#${field}-error`);
  if (errorElement) {
    errorElement.textContent = "";
  }
}
