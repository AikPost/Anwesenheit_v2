

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