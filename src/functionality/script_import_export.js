function export_attendances_as_csv() {
    // select all visible divs containing the attendance lists
    $(".attendance_div:visible").each(
        function (index, item) {
            // for each:
            let course_id = $(item).attr("course_id")

            // create array containing the table rows as tab concatenated strings
            let courseAttendances = $(item)
            .find(".attendance_sheet_content_table tr")
            .map(
                function (index, item) {
                    let out = $(item)
                    .find("td,th")
                    .map(
                        function(index, item){
                            let attendanceString = $(item).text() ?? ""
                            let attendeeNameString = $(item).find("input").val() ?? ""
                            return attendanceString + attendeeNameString
                           
                        }
                    ).get().join("\t")

                    return out
                }
            ).get()
            let course_name = $(item).find(".attendance_sheet_course_data[course_data=name]").text()
            let course_trainer = $(item).find(".attendance_sheet_course_data[course_data=trainer]").text()
            let course_begin = $(item).find(".attendance_sheet_course_data[course_data=startTime]").text()
            let course_end = $(item).find(".attendance_sheet_course_data[course_data=endTime]").text()
            let course_day = $(item).find(".attendance_sheet_course_data[course_data=day]").text()
            let course_location = $(item).find(".attendance_sheet_course_data[course_data=location]").text()

            courseAttendances = [
                courseAttendances[1].replaceAll(/\S/g,""),
                course_name,
                course_trainer,
                course_day,
                course_begin + " - " + course_end,
                course_location
            ].concat(
                courseAttendances
            )

            courseAttendances.unshift()
            courseAttendances = courseAttendances.join("\n")


            let fileName = [
                course_trainer,
                course_name,
            ]
            .join("_")
            .replaceAll(" ","_")
            downloadDataAsFile(courseAttendances, fileName + ".csv", "text/csv")
        }
    )
}

function export_all() {
    const dateString = new Date().toLocaleString().replace(/^(?<date>\d\d)\/(?<month>\d\d)\/(?<year>\d\d\d\d).*/,"$<year>-$<month>-$<date>");
    const jq_courses = $(".course_data_trow").not("[hidden]");
    
    let out = new Object();
    
    let  filename = dateString + "_course_and_attendance.json";
    const userInput = prompt("Dateinamen eingeben:", filename);
    if (userInput) filename = userInput;


    jq_courses.each(
        function () {
            let course_and_attendance_object = new Object();
            course_and_attendance_object.course_object = new Object();

            const course_id = $(this).find(".course_data_input[course_data=course_id]").val()
            
            $(this).find(".course_data_input").each(
                function () {
                    course_and_attendance_object.course_object[$(this).attr("course_data")] = $(this).val()

                }
            )
            course_and_attendance_object.attendance_object = get_attendance_list_data(
                $(`.attendance_div[course_id=${course_id}]`)
            )

            out[course_id] = course_and_attendance_object
        }
    );

    downloadAsJSON(out, filename);

    //prompt("JSON Export", JSON.stringify(out))
}

function import_all_by_file(evt) {

    var file = evt.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function (evt) {
        var contents = evt.target.result;
        import_all_helper(JSON.parse(contents))
    };
    reader.readAsText(file);

}


function import_all_helper(user_input_parsed) {
    const quarter_data = {
        quarter_starting_monday: $("#quarter_starting_monday").val(),
        quarter_ending_monday: $("#quarter_ending_monday").val(),
        quarter_attendee_count: $("#quarter_attendee_count").val(),
    }

    quarter_data.quarter_starting_week = calendarWeekOf(new Date(quarter_data.quarter_starting_monday))
    quarter_data.quarter_ending_week = calendarWeekOf(new Date(quarter_data.quarter_ending_monday))

    quarter_data.quarter_week_count = quarter_data.quarter_ending_week - quarter_data.quarter_starting_week + 1

    const html_templates = {
        attendance_list: $(".attendance_div[course_id=template]"),
        attendance_table_row: generate_attendance_row(quarter_data.quarter_week_count),
        attendance_table_calendarweek: generate_attendance_calendar_week_row(
            quarter_data.quarter_week_count,
            quarter_data.quarter_starting_week
        )
    }

    for (course_data_key in user_input_parsed) {
        let course_data = user_input_parsed[course_data_key].course_object
        let attendance_data = user_input_parsed[course_data_key].attendance_object

        let new_course_data_tr = appendToCourseDataTable(course_data);

        const new_course_id = new_course_data_tr.find(".course_data_input[course_data=course_id]").val()

        console.log(course_data, attendance_data, new_course_id)

        let new_attendance_list = generate_single_plan(new_course_data_tr, quarter_data, html_templates)


        if (new_attendance_list.find(".attendance_sheet_table_attendance_row").length < attendance_data.length) {
            console.log("Es sind weniger Zeilen als Daten vorhanden:", course_data.name)
        }

        new_attendance_list.find(".attendance_sheet_table_attendance_row").each(
            function (index0, item) {
                if (index0 >= attendance_data.length) return;
                $(item).find(".attendance_sheet_table_attendee_input").val(attendance_data[index0]["attendee_name"])
                $(item).find(".attendance_sheet_table_attendance_cell").each(
                    function (index1, item) {
                        let cell_content = attendance_data[index0]["attendee_attendance"][index1]
                        $(item).text(cell_content)
                        switch (cell_content) {
                            case "": return;
                            case "a": $(item).addClass("abgesagt"); return;
                            case "c": $(item).addClass("ausgefallen"); return;
                            case "t": $(item).addClass("teilgenommen"); return;
                            case "s": $(item).addClass("schnuppern"); return;
                            default: return;
                        }

                    }
                )

            }
        )
    }

}
/*
function import_all() {
    if (!confirm("Daten laden und alte Einträge überschreiben?")) return;

    let user_input = window.prompt("Input data")

    if (!user_input) return;
    let user_input_parsed = JSON.parse(user_input)
    import_all_helper(user_input_parsed)


    return
}
    */