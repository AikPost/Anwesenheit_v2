/**
 * Returns the number of the calendar week the date is in
 * GPT Import
 * @param {Date} date_in 
 * @returns {int} calendar week (1 indexed)
 */
function calendarWeekOf(date) {
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
 * Return the german abbreviation of a month given by 0 based index
 * @param {int} monthIndex 0-indexed (like Date() months)
 * @returns 
 */
function getMonthAbbreviation(monthIndex) {
    const germanMonthAbrreciations = [
        "Jan",
        "Feb",
        "Mrz",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dez"
    ];

    return germanMonthAbrreciations[(monthIndex) % 12];
}

/**
 * Return the german month name given by 0 based index
 * @param {int} monthIndex 0-indexed (like Date() months)
 * @returns 
 */
function getVerbatimMonth(monthIndex) {
    const germanMonthNames = [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
    ];
    return germanMonthNames[(monthIndex) % 12];
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

/**
 * Returns the given Date as a string formatted as "DD.MM." 
 * @param {Date} inDate Date to get short representation of 
 * @returns {string} Formatted date "DD.MM."
 */
function shortDateString(inDate) {
    return inDate.getDate() + "." + (inDate.getMonth() + 1) + "."
}

/**
 * Create a string in ical date format representing the given date
 * @param {Date} dateIn 
 * @returns {str} Date String for use in an ical file
 */
function icalStringFromDate(dateIn) {

    return [
        dateIn.getFullYear().toString().padStart(4, "0"),
        (dateIn.getMonth() + 1).toString().padStart(2, "0"),
        dateIn.getDate().toString().padStart(2, "0"),
        "T",
        dateIn.getHours().toString().padStart(2, "0"),
        dateIn.getMinutes().toString().padStart(2, "0"),
        dateIn.getSeconds().toString().padStart(2, "0")
    ].join("")
}

/**
 * Formats a date as a ISO date string YYYY-MM-DD
 * @param {Date} dateIn 
 * @returns {string} date formatted as YYYY-MM-DD
 */
function getISODateString(dateIn) {
    return dateIn.toISOString().split("T")[0];
}

/**
 * Move a date given as string by n days and return date as string (YYYY-MM-DD)
 * @param {string} dateStringInput Date string of the format YYYY-MM-DD, intended for data from a date input. Input must be parseable by Date() 
 * @param {int} dayOffset the days to move the input date by
 */
function moveInputFieldDateValue(dateStringInput, dayOffset) {
    let dateValue = new Date(dateStringInput + "T00:00:00Z");
    dateValue.setUTCDate(dateValue.getUTCDate() + dayOffset);
    return getISODateString(dateValue);
}




/**
 * 
 * @param {string} dateStringInput a date YYYY-MM-DD
 * @returns {string} a YYYY-MM-DD Date 
 */
function getMondayDateString(dateStringInput) {
    let dateValue = new Date(dateStringInput + "T00:00:00Z");
    let dateDelta = (dateValue.getUTCDay() - 1) % 7;
    dateValue.setUTCDate(dateValue.getUTCDate() - dateDelta);
    return getISODateString(dateValue);
}

class DateFormatter {
    // Static method to format a date based on a template
    static format(date, template) {
        const replacements = {
            YYYY: date.getFullYear(),
            YY: String(date.getFullYear()).slice(-2),
            MM: String(date.getMonth() + 1).padStart(2, '0'),
            M: date.getMonth() + 1,
            MMM: DateFormatter.getMonthAbbreviation(date.getMonth(), 'short'),
            MMMM: DateFormatter.getMonthAbbreviation(date.getMonth(), 'long'),
            D: date.getDate(),
            DD: String(date.getDate()).padStart(2, '0'),
            DDD: DateFormatter.getDayAbbreviation(date.getDay(), 'short'),
            DDDD: DateFormatter.getDayAbbreviation(date.getDay(), 'long'),
            HH: String(date.getHours()).padStart(2, '0'),
            H: date.getHours(),
            mm: String(date.getMinutes()).padStart(2, '0'),
            m: date.getMinutes(),
            ss: String(date.getSeconds()).padStart(2, '0'),
            s: date.getSeconds(),
        };

        // Replace placeholders in the template string
        return template.replace(/\b(YYYY|YY|MM|M|MMM|MMMM|D|DD|DDD|DDDD|HH|H|mm|m|ss|s)\b/g, match => replacements[match]);
    }

    // Helper static method to get the month abbreviation (short or long)
    static getMonthAbbreviation(monthIndex, type) {
        const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthNamesLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return type === 'short' ? monthNamesShort[monthIndex] : monthNamesLong[monthIndex];
    }

    // Helper static method to get the day abbreviation (short or long)
    static getDayAbbreviation(dayIndex, type) {
        const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayNamesLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return type === 'short' ? dayNamesShort[dayIndex] : dayNamesLong[dayIndex];
    }
}
