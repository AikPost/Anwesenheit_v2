/**
 * Marks a cell as a date when the course did not take place in a planned manner
 * @param {jQuery} cell jQuery selector containing the cell to modify
 */
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

/**
 * Marks a cell as a date when the course was cancelled out of plan
 * @param {jQuery} cell jQuery selector containing the cell to modify
 */
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

/**
 * Marks a cell as a date when the corresponding attendee has attended
 * @param {jQuery} cell jQuery selector containing the cell to modify
 */
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

/**
 * Marks a cell as a date when the corresponding attendee has attended as part of a trial
 * @param {jQuery} cell jQuery selector containing the cell to modify
 */
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

function attendTableHeadClickHandler(evt) {
    const clicked_cell = $(this);
    console.log(clicked_cell);
    const cell_index = clicked_cell.index()

    const the_table = clicked_cell.parent().parent().parent()
    const table_body_rows = the_table.find("tbody tr")


    // durch Trainer ausfallen
    if (evt.ctrlKey) {
        table_body_rows.each(function () {
            set_cell_trainer_cancelled(
                $(this).find("td").eq(cell_index)
            )

        })
    }

    // kein Stattfinden nach Plan
    else {
        table_body_rows.each(function () {
            set_cell_planned_cancelled(
                $(this).find("td").eq(cell_index)
            )
        })

    }
}