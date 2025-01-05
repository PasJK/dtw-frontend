/* eslint-disable no-useless-escape */
class Validator {
    static username(value: string) {
        if (!value) {
            return false;
        }

        const trimmedValue = value.trim();
        return /^[A-Za-z0-9]+$/.test(trimmedValue);
    }
}

export default Validator;
