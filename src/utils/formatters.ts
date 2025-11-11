export const formatNumber = (num: number, locale = 'en-US', options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(locale, options).format(num);
};

export const formatCurrency = (amount: number, currency = 'USD') => {
    return formatNumber(amount, 'en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

export const formatPercentage = (value: number) => {
    return formatNumber(value, 'en-US', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    });
};

export const getPercentageClass = (value: number) => {
    return value >= 0 ? 'text-green-500' : 'text-red-500';
};