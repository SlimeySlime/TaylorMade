
// eslint-disable-next-line no-extend-native
Number.prototype.toMoney = function() {
    let num = this.valueOf()
    const result = num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return result
}

function PAYMONTH_dateToString(date) {
    let y = '' + date.getFullYear()
    let m = '' + date.getMonth()
    if (m < 10) m = '0' + m
    return y + m
}

function PAYMONTH_StringToDate(monthString) {
    return new Date(monthString.slice(0, 4), monthString.slice(4, 6))
}

const SERVER_PATH = process.env.NODE_ENV === 'production' ? '/payment' : 'http://localhost:3004/payment'

const MONTH_KEYWORD = {
    prev : 'Prev',
    next :  'Next',
    current: 'Current'
}

export { SERVER_PATH, MONTH_KEYWORD, PAYMONTH_dateToString, PAYMONTH_StringToDate }