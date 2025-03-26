

$(document).ready(
    function () {
        initialize_button_functionality();
        initialize_key_listeners();
    }
)

function initialize_button_functionality() {

    initialize_manual_toggle_functionality();
    initialize_delete_all_courses_functionality();
    initialize_add_row_functionality();
    initialize_checkbox_print_toggle_functionality();
    initialize_jump_to_course_attendance_functionality();
    //initialize_checkbox_drag_functionality();

    // course import and export
    //initialize_course_export_functionality();
    //initialize_course_import_functionality();
    initialize_courses_to_csv_functionality();
    initialize_ical_export_functionality();

    // sorting functionality
    initialize_course_sort_by_time_functionality();
    initialize_course_sort_by_trainer_functionality();

    // functionality of individual courses
    initialize_course_move_functionality();
    initialize_course_deletion_functionality();


    // script_attendance.js
    initialize_generate_plan_functionality();
    // initialize_copy_ordering_functionality();
    initialize_copy_visibility_functionality();
    initialize_print_single_pages_functionality();

    initialize_export_attendance_functionality();
    //initialize_import_attendance_functionality();
    inititalize_import_attendance_by_file_functionality();
    initialize_export_attendance_csv_functionality();
    initialize_export_courseDataToExcel_functionality();

    //initialize_cancel_holidays_functionality();

    initialize_create_rename_command_functionality();

    // th clicking functionality
    initialize_filling_by_tr_functionality();
    initialize_filling_by_td_functionality();

    inititalize_show_email_button_functionality();
    inititalize_send_email_button_functionality();
    initialize_import_emails_from_course_list_functionality();
}

function initialize_key_listeners() {

    document.addEventListener(
        "keydown",
        function (evt) {
            //console.log(evt)
            if (evt.key == "s" && evt.ctrlKey) {
                evt.preventDefault()
                $("#button_export_all").click()
                return false
            }

            if (evt.key == "o" && evt.ctrlKey) {
                evt.preventDefault()
                $("#button_open_json_all_data").click()
                return false
            }
        },
        false
    )
}
    
    
