function initialize_course_move_functionality() {
    $("#course_data_tbody").on("mousedown", "button.move",
        function () {
            let dragElement = $(this).parent().parent();
            dragElement.css("background-color", "red")
            $("tr.course_data_trow").on("mouseover", function () {
                let moElement = $(this)
                let dragIndex = $("tr.course_data_trow").index(dragElement);
                let moIndex = $("tr.course_data_trow").index(moElement);
                if (dragIndex < moIndex) {
                    moElement.after(dragElement)
                }
                if (dragIndex > moIndex) {
                    moElement.before(dragElement)
                }
            })
            $(document).on("mouseup", function () {
                dragElement.css("background-color", "")
                $("tr.course_data_trow").off("mouseover")
                copy_order_to_attendance_sheets();
            })
        }
    )
}

function initialize_course_deletion_functionality() {
    $("#course_data_tbody").on("mousedown", "button.delete",
        function () {
            let deleteElement = $(this).parent().parent();
            let deleteName = deleteElement.find("input").first().val();
            if (confirm("Den Kurs " + deleteName + " wirklich löschen?")) {
                deleteElement.remove()
            }
        }
    )
}

function initialize_jump_to_course_attendance_functionality(){
    $("#course_data_tbody").on("mousedown", ".scroll_to_attendance_sheet",
        function () {
            let course_id = $(this).parent().parent().find(".course_data_input[course_data=course_id").val();
            
            $(`.attendance_div[course_id=${course_id}]`).get(0).scrollIntoView()
        }
    )
}

function initialize_manual_toggle_functionality() {
    $("#manual").removeAttr("hidden")
    $("button#button_toggle_manual").on(
        "click",
        () => $("#manual").toggle()
    )
}

function initialize_add_row_functionality() {
    $("button#button_add_row").on(
        "click",
        () => add_new_course_data_tr({})
    )
}

function initialize_delete_all_courses_functionality() {
    $("#button_delete_all_courses").on(
        "click",
        function () {
            if (confirm("Alte Kurse löschen?")) {
                $("#course_data_tbody tr").not("[hidden]").remove()
            }

        }
    )
}

function initialize_course_export_functionality() {
    $("#button_export_courses").on(
        "click",
        function () {
            let jq_courses = $(".course_data_trow").not("[hidden]")
            let out = jq_courses.map(
                function () {
                    let courseObject = new Object();
                    $(this).find(".course_data_input").each(
                        function () {
                            courseObject[$(this).attr("course_data")] = $(this).val()

                        }
                    )

                    return courseObject
                }
            )

            Helpers.download(JSON.stringify(out.get()),"Kursdaten.json","text/json;charset=utf-8")
            //prompt("JSON Kursdaten;", (JSON.stringify(out.get())))
            console.log(out.get())
        }
    )
}

function initialize_course_import_functionality() {
   
    $("#button_import_courses").on(
        "change",
        import_courses_by_file
    )
}

function compare_course_by_time(c_1, c_2) {
    const course_1 = $(c_1)
    const course_2 = $(c_2)
    let string_1 = course_1.find(".course_data_input[course_data=day]").val()
    let string_2 = course_2.find(".course_data_input[course_data=day]").val()

    string_1 += course_1.find(".course_data_input[course_data=startTime]").val()
    string_2 += course_2.find(".course_data_input[course_data=startTime]").val()

    return compare_strings(string_1, string_2)
}

function compare_course_by_trainer(c_1, c_2) {
    const course_1 = $(c_1)
    const course_2 = $(c_2)
    let string_1 = course_1.find(".course_data_input[course_data=trainer]").val()
    let string_2 = course_2.find(".course_data_input[course_data=trainer]").val()

    let comp = compare_strings(string_1, string_2)
    if (comp != 0) return comp;

    return compare_course_by_time(c_1, c_2)



}

function initialize_course_sort_by_time_functionality() {


    $("#button_sort_time").on(
        "click",
        function () {
            let time_sorted_courses = $(".course_data_trow:not([hidden])").sort(compare_course_by_time);
            for (course of time_sorted_courses) {
                $("#course_data_tbody").append($(course))
            }
            copy_order_to_attendance_sheets();
        }
    )
}

function initialize_course_sort_by_trainer_functionality() {


    $("#button_sort_trainer").on(
        "click",
        function () {
            let time_sorted_courses = $(".course_data_trow:not([hidden])").sort(compare_course_by_trainer);
            for (course of time_sorted_courses) {
                $("#course_data_tbody").append($(course))
            }

            copy_order_to_attendance_sheets();
        }
    )
}

function initialize_checkbox_print_toggle_functionality() {
    $("#checkbox_toggle_course_selection").on(
        "click",
        function () {
            let toggle_state = $(this).get(0).checked
            $(".course_data_td_buttons input.print_toggle").each(
                function (index, item) {
                    item.checked = toggle_state
                }

            )
        }
    )
}

function initialize_checkbox_drag_functionality(){
    $("#course_data_tbody").on(
        "click",
        "input.print_toggle",
        function(evt){
            if(evt.shiftKey){
                console.log("Pressed Shift Key");
                console.log(CourseDataTRGen.last_checked_course)
                console.log($(this).parent().parent())

                courses_inbetween = CourseDataTRGen.last_checked_course.nextUntil($(this).parent().parent())
                console.log(courses_inbetween)
            }

            CourseDataTRGen.last_checked_course = $(this).parent().parent()
        }
    )
}

function initialize_courses_to_csv_functionality(){
    $("#button_export_courses_as_csv").on(
        "click",
        function(){
            let data= $(".course_data_trow:visible:has(.print_toggle:checked)")
            .map(function(index, item){
                out = [
                    $(item).find(".course_data_input[course_data=course_id").val(),
                    $(item).find(".course_data_input[course_data=name").val(),
                    $(item).find(".course_data_input[course_data=trainer").val(),
                    Helpers.weekDay(+$(item).find(".course_data_input[course_data=day").val()),
                    $(item).find(".course_data_input[course_data=startTime").val(),
                    $(item).find(".course_data_input[course_data=endTime").val(),
                    $(item).find(".course_data_input[course_data=location").val(),
                    $(item).find(".course_data_input[course_data=contact").val()
                ].join("\t")
                
                console.log(out)
                return out
            })
            .get()

            data.unshift("TempID\tKursname\tTrainer\tTag\tBeginn\tEnde\tOrt\tKontaktdaten")
            
            data = data.join("\n")

            Helpers.download(
                data,
                "kursdaten_tabelle.csv",
                "text/csv;charset=utf-8"
            )
        }
    )
}

