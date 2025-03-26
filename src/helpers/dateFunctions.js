/**
 * Returns the number of the calendar week the date is in
 * GPT Import
 * @param {Date} date_in 
 * @returns {int} calendar week (1 indexed)
 */
function calenderWeekOf(date) {
    // Kopiere das Datum, um das ursprüngliche Datum nicht zu verändern
    const tempDate = new Date(date);
    
    // Setze das Datum auf den Montag der Woche
    tempDate.setDate(tempDate.getDate() - tempDate.getDay() + 1);
    
    // Setze das Jahr auf den 1. Januar
    const startOfYear = new Date(tempDate.getFullYear(), 0, 1);
    
    // Berechne die Differenz in Tagen zwischen dem Montag der Woche und dem 1. Januar
    const dayOfYear = Math.floor((tempDate - startOfYear) / (24 * 60 * 60 * 1000));
    
    // Berechne die Kalenderwoche
    const weekNumber = Math.ceil((dayOfYear + 1) / 7);
    
    return weekNumber;
}


/**
 * Returns the amount of weeks the timeframe [dateStart, date_end) spans over.
 * @param {Date} date_start 
 * @param {Date} date_end 
 * @returns {int} Weeks spanned
 */
function weekDifference(date_start, date_end) {
    if (date_start > date_end) {
        console.error(`Start date ${date_start} is set after end date ${date_end}.`)
        return 0;
    }
    
    let iterating_date = new Date(date_start)
    iterating_date.setHours(0, 0, 0, 0)
    
    let iter_end_date = new Date(date_end)
    iter_end_date.setHours(0, 0, 0, 0)

    let week_count = 0
    while (iterating_date <= date_end) {
        week_count += 1
        iterating_date.setDate(iterating_date.getDate() + 7)
    }

    return week_count

}
/**
 * Returns a German weekday name corresponding to the index 
 * 0=Montag, 1=Dienstag, 2=Mittwoch,...
 * @param {int} index in [0,... , 6] 
 * @returns {string} German Weekday name
 */
function getVerbatimWeekday(index) {
    return "Montag Dienstag Mittwoch Donnerstag Freitag Samstag Sonntag".split(" ")[index]
}

/**
 * Return a new Date which is shifted by a count of days 
 * @param {Date} date Starting date
 * @param {int} days Days to shift by
 * @returns {Date} shifted Date
 */
function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function shortDateString(inDate) {
    return inDate.getDate() + "." + (inDate.getMonth() + 1) + "."
}