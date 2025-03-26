function compare_strings(s_1, s_2) {
    console.log(s_1, s_2)
    if (s_1 < s_2) return -1
    if (s_1 === s_2) return 0
    if (s_1 > s_2) return 1
}




class Helpers {
    static addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    static range(start, end) {
        let out = new Array(0)
        for (let index = Number(start); index < Number(end); index++) {
            out.push(index)
        }
        return out
        //return Array.from({ length: end - start + 1 }, (_, i) => i)
    }
    static shortDateString(inDate) {
        return inDate.getDate() + "." + (inDate.getMonth() + 1) + "."
    }

    static weekDay(index) {
        return "Montag Dienstag Mittwoch Donnerstag Freitag Samstag Sonntag".split(" ")[index]
    }

    static calendarWeekOf(date_in) {
        let iterating_date = new Date(String(date_in.getFullYear()))
        let week_count = 0
        while (iterating_date <= date_in) {
            week_count += 1
            iterating_date.setDate(iterating_date.getDate() + 7)
        }

        return week_count
    }

    static weekDifference(date_start, date_end) {
        if (date_start > date_end) {
            console.error(`Start date ${date_start} is set after end date ${date_end}.`)
        }

        let iter_end_date = new Date(date_end)
        iter_end_date.setHours(0, 0, 0, 0)
        let iterating_date = new Date(date_start)
        iterating_date.setHours(0, 0, 0, 0)

        let week_count = 0
        while (iterating_date <= date_end) {
            week_count += 1
            iterating_date.setDate(iterating_date.getDate() + 7)
        }

        return week_count

    }

    static generateRandomId(len = 4) {
        let out = ""
        while (out.length != len) {
            out = Math.random().toString(36).substring(2, len + 2)
        }

        return out
    }

    static download(data, filename, type) {
        var file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }
}

function copy_visibility_to_attendance_sheets() {
    const attendance_divs = $(".attendance_div:not([hidden])")

    const attendance_divs_container = $("#attendance_div_container")
    const excluded_course_ids = $(".course_data_trow:not([hidden]):has(.print_toggle:not(:checked)) .course_data_input[course_data=course_id]").map(
        (index, item) => $(item).val()
    ).get()


    attendance_divs.each(
        function (index, item) {
            console.log($(item))
            if (excluded_course_ids.includes($(item).attr("course_id"))) {
                $(item).hide()

            }
            else $(item).show()
        }
    )

}
function copy_order_to_attendance_sheets() {
    console.log("Sort the attendance sheets")
    const attendance_divs = $(".attendance_div:not([hidden])")
    const attendance_divs_container = $("#attendance_div_container")
    const course_ids = $(".course_data_trow:not([hidden]) .course_data_input[course_data=course_id]").map(
        (index, item) => $(item).val()
    ).get()

    for (let course_id of course_ids) {
        let the_course = attendance_divs.filter(`[course_id=${course_id}]`)
        attendance_divs_container.append(
            the_course
        )
    }

    console.log(attendance_divs, course_ids)


}

function get_attendance_list_data(selector) {
    let out = new Array()
    selector.find(".attendance_sheet_table_attendance_row").each(
        function (index, itemTR) {
            let attendee_name_val = $(itemTR).find("input").val()

            out.push(
                {
                    attendee_name: attendee_name_val,
                    attendee_attendance: $(itemTR)
                        .find(".attendance_sheet_table_attendance_cell")
                        .map(
                            (index, item) => $(item).text()
                        )
                        .get()
                }
            )
        }
    )

    return out
}

