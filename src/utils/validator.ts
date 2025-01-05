/* eslint-disable no-useless-escape */
class Validator {
    static readonly PASSWORD_CRITERIA = [
        {
            key: "8char",
            contextKey: "passChar",
            title: "password.warn.character",
            check: (password: string) => this.password(password, "8char"),
        },
        {
            key: "1lowerCase",
            contextKey: "passLowerCase",
            title: "password.warn.lowerCase",
            check: (password: string) => this.password(password, "1lowerCase"),
        },
        {
            key: "1upperCase",
            contextKey: "passUpperCase",
            title: "password.warn.upperCase",
            check: (password: string) => this.password(password, "1upperCase"),
        },
        {
            key: "1digit",
            contextKey: "passDigit",
            title: "password.warn.digit",
            check: (password: string) => this.password(password, "1digit"),
        },
        {
            key: "special",
            contextKey: "passSpecial",
            title: "password.warn.special",
            check: (password: string) => this.password(password, "special"),
        },
    ];

    static password(password: string, type: "all" | "8char" | "1lowerCase" | "1upperCase" | "1digit" | "special") {
        let isPass = false;
        if (!password) {
            return isPass;
        }

        switch (type) {
            case "8char":
                isPass = /^.{8,}$/g.test(password);
                break;
            case "1lowerCase":
                isPass = /^(.*[a-z].*)$/g.test(password);
                break;
            case "1upperCase":
                isPass = /^(.*[A-Z].*)$/g.test(password);
                break;
            case "1digit":
                isPass = /^(.*[0-9].*)$/g.test(password);
                break;
            case "special":
                isPass = /^(.*[@#$%^&+!/~|?*=()<>:,'.{}\[\]-].*)$/g.test(password);
                break;
            case "all":
                isPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@#$%^&+!/~|?*=()<>:,'.{}\[\]-]).{8,}$/g.test(
                    password,
                );
                break;
            default:
                break;
        }

        return isPass;
    }

    static email(email: string) {
        if (!email) {
            return false;
        }

        const trimmedEmail = email.trim();
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.].{0,}$/;
        return emailRegex.test(trimmedEmail) && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    static phoneNumber(value: string) {
        if (!value) {
            return false;
        }

        const trimmedValue = value.trim();
        return /^(0[689][0-9])[-\s.]?\d{3}[-\s.]?\d{4}$|^(02)[-\s.]?\d{3}[-\s.]?\d{4}$/.test(trimmedValue);
    }

    static firstNLastName(value: string) {
        if (!value) {
            return false;
        }

        const trimmedValue = value.trim();
        return /^[A-Za-zก-๙\s]+$/.test(trimmedValue);
    }

    static slug(value: string) {
        if (!value) {
            return false;
        }

        return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
    }
}

export default Validator;
