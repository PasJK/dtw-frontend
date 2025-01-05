export class NumberUtil {
    private static readonly locales = "en-US";

    /**
     * @param {number} value The value to be used for formatting.
     *
     * @returns {string} The formatted number string in thousand format.
     */
    static readonly formatNumber = (value: number): string => {
        const formatter = Intl.NumberFormat(NumberUtil.locales);
        return formatter.format(value);
    };

    /**
     * @param {number} value The value to be used for formatting.
     * @param {number} [digits=2] The number of fraction digits (default is 2).
     *
     * @returns {string} The formatted number string in thousand format with the specified fraction digits.
     */
    static readonly formatNumberFraction = (value: number, digits: number = 2): string => {
        const formatter = Intl.NumberFormat(NumberUtil.locales, {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits,
        });
        return formatter.format(value);
    };

    /**
     * Formats a number into a compact representation (e.g., 1K, 1M, 1B).
     * @param {number} value The number to be formatted.
     * @param {number} [digits=1] The number of fraction digits (default is 1).
     * @returns {string} The formatted compact number string.
     */
    static readonly formatCompactNumber = (value: number, digits: number = 0): string => {
        const formatter = Intl.NumberFormat(NumberUtil.locales, {
            notation: "compact",
            compactDisplay: "short",
            minimumFractionDigits: digits,
            maximumFractionDigits: digits,
        });
        return formatter.format(value);
    };
}
