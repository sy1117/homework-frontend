

export const daysInMonth = (iMonth:number, iYear:number) => {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}