export class DateUtil {
    private date: Date;
    private options: Intl.DateTimeFormatOptions;
    private locales: Intl.LocalesArgument;

    /**
     * @param {string} dateString The date string to be used for formatting.
     */
    constructor(dateString: string) {
        this.date = new Date(dateString);
        this.options = {
            hour12: false,
            timeZone: "Asia/Bangkok",
        };
        this.locales = "en-GB";
    }

    /**
     * @returns {string} The formatted date string in "DD/MM/YYYY" format.
     */
    formatDate(): string {
        const formatter = new Intl.DateTimeFormat(this.locales, {
            ...this.options,
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        return formatter.format(this.date);
    }

    /**
     * @returns {string} The formatted date string in "DD/MM/YYYY, HH:MM" format.
     */
    formatDateTime(): string {
        const formatter = new Intl.DateTimeFormat(this.locales, {
            ...this.options,
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        return formatter.format(this.date);
    }

    /**
     * @returns {string} The formatted date string in "DD MMM YYYY" format.
     */
    formatDateToFullMonth(): string {
        const formatter = new Intl.DateTimeFormat(this.locales, {
            ...this.options,
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        return formatter.format(this.date);
    }
}
