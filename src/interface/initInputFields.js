function initInputFields() {
    const curDate = new Date();

    // set period name placeholder
    const periodNamePrefill = `${curDate.getFullYear()}_${getMonthAbbreviation(curDate.getMonth())}-${getMonthAbbreviation(curDate.getMonth() + 3)}`
    if ($("#quarter_name").val() === "") $("#quarter_name").val(periodNamePrefill);

    // prefill start and end monday if undefined
    const startingMondayFieldValue = $("#quarter_starting_monday").val();
    const assumedPeriodLengthInWeeks = 12;

    let startMonday;
    if (startingMondayFieldValue !== "") {
        startMonday = new Date(startingMondayFieldValue);
    } else {
        startMonday = new Date();
        startMonday.setDate(startMonday.getDate() - startMonday.getDay() + 1);
        $("#quarter_starting_monday").val(getISODateString(startMonday));
    }

    const endMonday = new Date(
        startMonday.getFullYear(),
        startMonday.getMonth(),
        startMonday.getDate() + 7 * assumedPeriodLengthInWeeks,
        startMonday.getHours(),
        startMonday.getMinutes()
    );

    if ($("#quarter_ending_monday").val() === "") {
        $("#quarter_ending_monday").val(getISODateString(endMonday));
    }
}