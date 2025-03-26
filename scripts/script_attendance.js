function initialize_generate_plan_functionality() {
    $("#button_generate_plans").on(
        "click",
        generate_plans
    )
}

function initialize_copy_ordering_functionality() {
    // unused
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
    )

}

function set_cell_trainer_cancelled(cell) {
    cell.removeClass(
        "teilgenommen ausgefallen schnuppern"
    )
        .toggleClass(
            "abgesagt"
        )

    if (cell.text() != "a") {
        cell.text("a")
    } else cell.text("")
}

function set_cell_planned_cancelled(cell) {
    cell.removeClass(
        "teilgenommen abgesagt schnuppern"
    )
        .toggleClass(
            "ausgefallen"
        )

    if (cell.text() != "c") {
        cell.text("c")
    }
    else cell.text("")
}

function set_cell_attended(cell) {
    cell.removeClass(
        "ausgefallen abgesagt schnuppern"
    )
        .toggleClass(
            "teilgenommen"
        )

    if (cell.text() != "t") {
        cell.text("t")
    }
    else cell.text("")
}

function set_cell_first_attended(cell) {
    cell.removeClass(
        "ausgefallen abgesagt teilgenommen"
    )
        .toggleClass(
            "schnuppern"
        )

    if (cell.text() != "s") {
        cell.text("s")
    }
    else cell.text("")
}


function initialize_filling_by_tr_functionality() {
    $("#attendance_div_container").on(
        "click",
        ".attendance_sheet_table_date_header_cell,.attendance_sheet_table_week_header_cell",
        function (evt) {

            const clicked_cell = $(this)
            const header_row_cells = clicked_cell.siblings()
            const cell_index = clicked_cell.index()

            const the_table = clicked_cell.parent().parent().parent()
            const table_body_rows = the_table.find("tbody tr")

            console.log(header_row_cells, cell_index)

            // durch Trainer ausfallen
            if (evt.ctrlKey) {
                table_body_rows.each(
                    function () {
                        set_cell_trainer_cancelled(
                            $(this).find("td").eq(cell_index)
                        )

                    }
                )
            }

            // kein Stattfinden nach Plan
            else {
                table_body_rows.each(
                    function () {
                        set_cell_planned_cancelled(
                            $(this).find("td").eq(cell_index)
                        )

                    }
                )
            }


        }
    )
}

function initialize_filling_by_td_functionality() {
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

function initialize_copy_visibility_functionality() {
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
}

function initialize_print_single_pages_functionality() {
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
            return

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
}

function initialize_export_attendance_functionality() {
    $("#button_export_all").on(
        "click",
        export_all
    )
}
/*
function initialize_import_attendance_functionality() {
    $("#button_import_all").on(
        "click",
        import_all
    )
}
*/

function inititalize_import_attendance_by_file_functionality() {
    $("#button_open_json_all_data").on(
        "change",
        import_all_by_file
    )
}

function initialize_cancel_holidays_functionality() {
    $("#input_holiday_dates").on(
        "change",
        function (evt) {
            console.log(evt.target.value)
        }
    )
}

function initialize_create_rename_command_functionality() {

    function create_rename_command() {
        let command = '$index = 0; $fileNameArray = '
        const attendance_divs = $(".attendance_div:visible")


        let quarter_name = $("#quarter_name").val()

        let file_name_array = new Array()

        // iteriere über die divs
        attendance_divs.each(function (index, item) {
            // zeige das aktuelle div
            let trainer_name = $(item)
                .find(".attendance_sheet_course_data[course_data=trainer]")
                .text()

            let course_name = $(item)
                .find(".attendance_sheet_course_data[course_data=name]")
                .text()

            let course_day = $(item)
                .find(".attendance_sheet_course_data[course_data=day]")
                .text()

            let course_startTime = $(item).find(".attendance_sheet_course_data[course_data=startTime]").text().replaceAll(":", "")

            file_name_array.push(
                `"${trainer_name}_${course_day}_${course_startTime}_${course_name}_${quarter_name}.pdf"`.replaceAll(" ", "_")
            )
        })

        command += file_name_array.join() + ";"
        command += "Get-ChildItem -Name *.pdf | ForEach-Object { Rename-Item $_ -NewName $fileNameArray[$index]; $index = $index + 1 }"


        prompt("Folgendes Kommando in powershell ausführen", command)
    }
    $("#button_make_rename_command").on(
        "click",
        create_rename_command
    )
}

function initialize_export_attendance_csv_functionality() {

    $("#button_export_attendance_csv").on("click", () => export_attendances_as_csv());
}

function initialize_export_courseDataToExcel_functionality() {
    $("#button_export_jsonForExcel").on("click", () => exportQuarterCourseData());
}