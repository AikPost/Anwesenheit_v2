function initKeyEventHandlers() {

    // Keylistener for save and load functionality
    document.addEventListener("keydown", function (evt) {
        //console.log(evt)
        if (evt.key == "s" && evt.ctrlKey) {
            evt.preventDefault();
            $("#button_export_all").click();
            return false;
        }

        if (evt.key == "o" && evt.ctrlKey) {
            evt.preventDefault();
            $("#button_open_json_all_data").click();
            return false
        }
    }, false);
}

function initSideBarButtons() {
    // initialize_copy_visibility_functionality() {
    $("#button_copy_visibility").on(
        "click",
        function () {
            console.log("Hide and show")

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

    )


    // initialize_print_single_pages_functionality() {
    $("#button_print_each").on(
        "click",
        function () {
            let old_document_title = document.title

            // Geteiltes Dateinamen Präfix generieren
            const today = new Date()
            let document_title_prefix = `${today.getFullYear().toString().padStart(4, "0")
                }-${today.getMonth().toString().padStart(2, "0")
                }-${today.getDate().toString().padStart(2, "0")
                }_${today.getHours().toString().padStart(2, "0")
                }:${today.getMinutes().toString().padStart(2, "0")
                }:${today.getSeconds().toString().padStart(2, "0")
                }_`

            // wähle alle sichtbaren divs aus (zu drucken)
            const attendance_divs = $(".attendance_div:visible")

            attendance_divs.hide()

            // iteriere über die divs
            attendance_divs.each(
                function (index, item) {
                    // zeige das aktuelle div
                    $(item).show(
                    )

                    // setze den dokumententitel per des aktuellen divs
                    debugger
                    const titleObserver = new MutationObserver(
                        function () {
                            console.log("observed title change")
                            window.print()
                        }
                    )

                    const title_element = document.querySelector("title")

                    titleObserver.observe(
                        title_element,
                        {
                            subtree: true,
                            childList: true,
                            characterData: true,
                            attributes: true,

                        }
                    )

                    var target = document.querySelector('title');

                    // create an observer instance
                    var observer = new MutationObserver(function (mutations) {
                        // We need only first event and only new value of the title
                        console.log(mutations[0].target.nodeValue);
                    });

                    // configuration of the observer:
                    var config = { subtree: true, characterData: true, childList: true };

                    // pass in the target node, as well as the observer options
                    observer.observe(target, config);


                    document.querySelector('title').childNodes[0].nodeValue = document_title_prefix
                        .concat(
                            $(item)
                                .find(".attendance_sheet_course_data[course_data=trainer]")
                                .text()
                        )
                        .concat(
                            "_" + $(item)
                                .find(".attendance_sheet_course_data[course_data=name]")
                                .text()
                        )

                    titleObserver.disconnect()

                    // drucke das aktuell sichtbare div aus


                    // verstecke das div wieder
                    $(item).hide()
                }
            )

            //  startzustand des dokuments wiederherstellen
            attendance_divs.show()

            document.title = old_document_title
        }
    )


    // initialize_export_attendance_functionality() {
    $("#button_export_all").on(
        "click",
        export_all
    )



    // inititalize_send_email_button_functionality
    $("#mail_send_button").on("click", sendMails);

    // inititalize_show_email_button_functionality
    $("#button_toggle_email_send").on("click", () => $("#email_tool").toggle())


    // initialize_import_emails_from_course_list_functionality
    $("#button_import_from_course_list").on("click", function () {
        let csv_sep = $("#csv_sep").val().trim();
        let mail_textarea_val = $("#trainer_mail_csv").val()
        let new_mail_data = [...new Set(
            $(".course_data_trow:visible").map(function (course_row_index, course_row_item) {
                let trainer = $(course_row_item).find(".course_data_input[course_data=trainer]").val()
                let contact = $(course_row_item).find(".course_data_input[course_data=contact]").val()

                if (trainer === "") return null

                return trainer + csv_sep + contact
            })
                .get()
        )]
            .join("\n")

        $("#trainer_mail_csv").val(
            [mail_textarea_val, new_mail_data].join("\n").trim()
        )

    })

    // initialize_course_sort_by_trainer_functionality
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

    // initialize_course_sort_by_time_functionality
    $("#button_sort_time").on("click", function () {
        let time_sorted_courses = $(".course_data_trow:not([hidden])").sort(compare_course_by_time);
        for (course of time_sorted_courses) {
            $("#course_data_tbody").append($(course))
        }
        copy_order_to_attendance_sheets();
    })
}

function initImportExportButtons() {

    // initialize_course_export_functionality
    $("#button_export_courses").on("click", function () {
        let jq_courses = $(".course_data_trow").not("[hidden]")
        let out = jq_courses.map(
            function () {
                let courseObject = new Object();
                $(this).find(".course_data_input").each(function () {
                    courseObject[$(this).attr("course_data")] = $(this).val()
                })

                return courseObject
            }
        )

        downloadDataAsFile(JSON.stringify(out.get()), "Kursdaten.json", "text/json;charset=utf-8")
        //prompt("JSON Kursdaten;", (JSON.stringify(out.get())))
        console.log(out.get())
    })
    // initialize_course_import_functionality
    $("#button_import_courses").on(
        "change",
        import_courses_by_file
    )

    $("#button_export_courses_as_csv").on(
        "click",
        function () {
            let data = $(".course_data_trow:visible:has(.print_toggle:checked)")
                .map(function (index, item) {
                    out = [
                        $(item).find(".course_data_input[course_data=course_id").val(),
                        $(item).find(".course_data_input[course_data=name").val(),
                        $(item).find(".course_data_input[course_data=trainer").val(),
                        getVerbatimWeekday(+$(item).find(".course_data_input[course_data=day").val()),
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

            downloadDataAsFile(
                data,
                "kursdaten_tabelle.csv",
                "text/csv;charset=utf-8"
            )
        }
    )
}

function initCourseTableButtons() {

    // initialize_checkbox_print_toggle_functionality() {
    $("#checkbox_toggle_course_selection").on("click", function () {
        let toggle_state = $(this).get(0).checked;
        $(".course_data_td_buttons input.print_toggle").each(function (index, item) {
            item.checked = toggle_state;
        })
    })


    // initialize_course_move_functionality() {
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


    // initialize_course_deletion_functionality() {
    $("#course_data_tbody").on("mousedown", "button.delete",
        function () {
            let deleteElement = $(this).parent().parent();
            let deleteName = deleteElement.find("input").first().val();
            if (confirm("Den Kurs " + deleteName + " wirklich löschen?")) {
                deleteElement.remove()
            }
        }
    )


    // initialize_jump_to_course_attendance_functionality(){
    $("#course_data_tbody").on("mousedown", ".scroll_to_attendance_sheet",
        function () {
            let course_id = $(this).parent().parent().find(".course_data_input[course_data=course_id").val();

            $(`.attendance_div[course_id=${course_id}]`).get(0).scrollIntoView()
        }
    )

    

}

function initButtons() {
    $("#button_generate_plans").on(
        "click",
        generate_plans
    )

    $("#button_sort_plans").on(
        "click",
        function () {
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
    );

    // button to (re)generate plans from course data list
    $("#button_generate_plans").on(
        "click",
        generate_plans
    );

    //initialize ical export button
    $("#button_export_ical").on(
        "click",
        export_courses_as_ical
    );


    // inititalize_import_attendance_by_file_functionality() {
    $("#button_open_json_all_data").on(
        "change",
        import_all_by_file
    );


    // initialize_cancel_holidays_functionality() {
    $("#input_holiday_dates").on(
        "change",
        function (evt) {
            console.log(evt.target.value)
        }
    );


    // initialize_create_rename_command_functionality  
    $("#button_make_rename_command").on(
        "click",
        create_rename_command
    );

    // initialize_export_attendance_csv_functionality() {

    $("#button_export_attendance_csv").on("click", export_attendances_as_csv);


    // initialize_export_courseDataToExcel_functionality() {
    $("#button_export_jsonForExcel").on("click", exportQuarterCourseDataWithRecipients);

    //  initialize_manual_toggle_functionality
    $("button#button_toggle_manual").on("click", () => $("#manual").toggle());


    // initialize_add_row_functionality
    $("button#button_add_row").on("click", () => add_new_course_data_tr({}));


    //  initialize_delete_all_courses_functionality
    $("#button_delete_all_courses").on("click", function () {
        if (!confirm("Alte Kurse löschen?")) return;
        $("#course_data_tbody tr").not("[hidden]").remove();
    });


}

function initAttendanceClickHandlers() {
    $("#attendance_div_container").on(
        "click",
        ".attendance_sheet_table_date_header_cell,.attendance_sheet_table_week_header_cell",
        attendTableHeadClickHandler
    )

    $("#attendance_div_container").on(
        "click",
        ".attendance_sheet_table_attendance_cell",
        function (evt) {
            console.log(evt)
            const clicked_cell = $(this)

            // left click 
            if (!evt.ctrlKey) {
                set_cell_attended(clicked_cell)
            }

            // right click 
            if (evt.ctrlKey) {
                set_cell_first_attended(clicked_cell)
            }

            // kein Stattfinden nach Pla
        }
    )
}