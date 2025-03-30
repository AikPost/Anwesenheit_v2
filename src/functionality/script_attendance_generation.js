function generate_attendance_calendar_week_row(col_count = 10, starting_week = 0) {
    let new_attendance_sheet_table_thr_calendarweek = $('<tr class="attendance_sheet_table_thr_calendarweek"></tr>')

    new_attendance_sheet_table_thr_calendarweek.append(
        $('<th style="width: 14em">KW:</th>')
    )
    for (let col_index = 0; col_index < col_count; col_index++) {
        new_attendance_sheet_table_thr_calendarweek.append(
            $('<th class="attendance_sheet_table_week_header_cell"></th>').text(
                Number(starting_week) + col_index
            )
        )
    }

    return new_attendance_sheet_table_thr_calendarweek
}

function generate_attendance_calendar_date_row(col_count = 10, starting_date_string, weekday_offset) {
    let starting_date = new Date(starting_date_string)

    let new_attendance_sheet_table_thr_date = $('<tr class="attendance_sheet_table_thr_date"></tr>')
        .append('<th style="width: 14em">Name</th>')


    for (let col_index = 0; col_index < col_count; col_index++) {
        new_attendance_sheet_table_thr_date.append(
            $('<th class="attendance_sheet_table_date_header_cell"></th>').text(
                shortDateString(
                    addDays(starting_date, 7 * col_index + weekday_offset)
                )
            )
        )
    }

    return new_attendance_sheet_table_thr_date
}

function generate_attendance_row(col_count = 10) {
    let new_attendance_row = $("<tr class='attendance_sheet_table_attendance_row'></tr>")

    new_attendance_row.append($("<td class='attendance_sheet_table_attendee_cell'><input class='attendance_sheet_table_attendee_input'/></td>"))

    for (let col_index = 0; col_index < col_count; col_index++) {
        new_attendance_row.append(
            $("<td class='attendance_sheet_table_attendance_cell'></td>")
        )
    }

    return new_attendance_row

}

function generate_single_plan(course, quarter_data, html_templates) {
    // clone the template attendance list
    let new_attendance_list = html_templates.attendance_list
        .clone()
        // make it visible
        .removeAttr("hidden")
        .removeClass("template")
        // assign the course id
        .attr(
            "course_id",
            $(course).find(".course_data_input[course_data=course_id]").val()
        )

    // fill the course data fields
    new_attendance_list
        .find(".attendance_sheet_course_data")
        .each(
            function () {
                const course_attribute = $(this).attr("course_data")

                let new_text = $(course)
                    .find(`.course_data_input[course_data=${course_attribute}]`)
                    .val()

                if (course_attribute == "day") {
                    new_text = getVerbatimWeekday(Number(new_text))
                }

                $(this).text(new_text)
            }
        )

    let attendance_table_body = new_attendance_list.find(".attendance_sheet_table_body")
    for (let row_index = 0; row_index < quarter_data.quarter_attendee_count; row_index++) {
        attendance_table_body.append(html_templates.attendance_table_row.clone())
    }


    let attendance_table_head = new_attendance_list
        .find(".attendance_sheet_content_head")

    attendance_table_head.append(
        html_templates.attendance_table_calendarweek.clone()
    )
    attendance_table_head.append(
        generate_attendance_calendar_date_row(
            quarter_data.quarter_week_count,
            quarter_data.quarter_starting_monday,
            Number($(course).find(".course_data_input[course_data=day]").val())
        )
    )




    // add to DOM
    $("#attendance_div_container").append(new_attendance_list)

    return new_attendance_list
}

function generate_plans() {
    if (!confirm("Bereits bestehende Anwesenheitslisten überschreiben?")) return;
    $(".attendance_div:not([hidden])").remove()

    const quarter_data = {
        quarter_starting_monday: $("#quarter_starting_monday").val(),
        quarter_ending_monday: $("#quarter_ending_monday").val(),
        quarter_attendee_count: $("#quarter_attendee_count").val(),
    }

    quarter_data.starting_date = new Date(quarter_data.quarter_starting_monday);
    quarter_data.ending_date = new Date(quarter_data.quarter_ending_monday);

    quarter_data.quarter_starting_week = calendarWeekOf(quarter_data.starting_date)
    quarter_data.quarter_ending_week = calendarWeekOf(quarter_data.ending_date)

    quarter_data.quarter_week_count = weekDifference(quarter_data.starting_date, quarter_data.ending_date)

    const html_templates = {
        attendance_list: $(".attendance_div[course_id=template]"),
        attendance_table_row: generate_attendance_row(quarter_data.quarter_week_count),
        attendance_table_calendarweek: generate_attendance_calendar_week_row(
            quarter_data.quarter_week_count,
            quarter_data.quarter_starting_week
        )
    }

    const courses = $(".course_data_trow:not([hidden])")

    console.log(courses)


    for (course of courses) {
        generate_single_plan(course, quarter_data, html_templates)
    }

}
