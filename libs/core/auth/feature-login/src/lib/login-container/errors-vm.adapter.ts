interface ErrorsTypes {
  [message: string]: string;
}

const errorsTypes: ErrorsTypes = {
  'Invalid Credentials.': 'Неверные учетные данные.',
};

interface ErrorsVMAdapter {
  errorsDTOToVM: (error: { message: string }) => string;
}

export const errorsVMAdapter = {
  errorsDTOToVM: (error: { message: string }): string =>
    errorsTypes[error.message] ?? error.message,
};
