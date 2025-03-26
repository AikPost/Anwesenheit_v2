function course_tr_to_ical_event(sel_course) {
    let course_name = sel_course.find(".course_data_input[course_data=name]").val()
    let course_day = +sel_course.find(".course_data_input[course_data=day]").val()
    let course_trainer = sel_course.find(".course_data_input[course_data=trainer]").val()
    let course_location = sel_course.find(".course_data_input[course_data=location]").val()
    let [course_start_H, course_start_M] = sel_course.find(".course_data_input[course_data=startTime]").val().split(":")
    let [course_end_H, course_end_M] = sel_course.find(".course_data_input[course_data=endTime]").val().split(":")

    let data_timeframe_start = new Date($("#quarter_starting_monday").val())
    let data_timeframe_end = new Date($("#quarter_ending_monday").val())
    data_timeframe_end.setDate(data_timeframe_end.getDate() + 7)

    let event_course_date_start = new Date(data_timeframe_start)
    event_course_date_start.setDate(
        event_course_date_start.getDate() + course_day
    )
    event_course_date_start.setHours(+course_start_H)
    event_course_date_start.setMinutes(+course_start_M)

    let event_course_date_end = new Date(data_timeframe_start)
    event_course_date_end.setDate(
        event_course_date_end.getDate() + course_day
    )
    event_course_date_end.setHours(+course_end_H)
    event_course_date_end.setMinutes(+course_end_M)


    return [
        "BEGIN:VEVENT",
        "SUMMARY:" + course_name,
        "DESCRIPTION:" + "Trainer\\: " + course_trainer,
        "LOCATION:" + course_location,
        "DTSTAMP:" + icalStringFromDate(event_course_date_start),
        "DTSTART:" + icalStringFromDate(event_course_date_start),
        "DTEND:" + icalStringFromDate(event_course_date_end),
        "RRULE:FREQ=WEEKLY;UNTIL=" + icalStringFromDate(data_timeframe_end),
        "END:VEVENT"
    ].join("\r\n")
}

function export_courses_as_ical(download = true) {

    let jq_courses = $(".course_data_trow:visible")

    let out = new Object();

    let vevents = jq_courses.map(function () {
        return course_tr_to_ical_event($(this))
    })
    .get()
    .join("\n")

    let calendar_data = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "NAME:RWC Gießen Kurse " + $("#quarter_name").val(),
        "DESCRIPTION: Tanzkursangebot des RWC Gießen im Zeitraum" + $("#quarter_name").val(),
        vevents,
        "END:VCALENDAR"
    ].join("\n\r")

    if (!download) return calendar_data;

    download(
        calendar_data,
        "exported_calendar.ics",
        "text/calendar"
    )
}