function inititalize_send_email_button_functionality() {
    $("#mail_send_button").on("click", sendMails);
}
function inititalize_show_email_button_functionality() {
    $("#button_toggle_email_send").on("click", () => $("#email_tool").toggle())
}

function initialize_import_emails_from_course_list_functionality() {
    $("#button_import_from_course_list").on("click", function () {
        let csv_sep = $("#csv_sep").val().trim();
        let mail_textarea_val = $("#trainer_mail_csv").val()
        let new_mail_data = [...new Set(
            $(".course_data_trow:visible")
            .map(function (course_row_index, course_row_item) {
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
}