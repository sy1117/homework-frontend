

export const daysInMonth = (iMonth: number, iYear: number) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

export const getWeek = (date)=> {
    let firstday = new Date(date.setDate(date.getDate() - date.getDay()));
    let lastday = new Date(date.setDate(date.getDate() - date.getDay()+6));
    return [ firstday, lastday ];
}

export const yyyymmdd = (date) => {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [
        date.getFullYear(),
        '/',
        (mm>9 ? '' : '0') + mm,
        '/',
        (dd>9 ? '' : '0') + dd
    ].join('');
};

