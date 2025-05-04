export const CreateError = (stausCode, message) => {
    const error = new Error();
    error.message = message;
    error.statusCode = stausCode;
    return error;
}