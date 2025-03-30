function callbackGlobalKeypresses(evt) {
    switch (true) {
        case (evt.key == "s" && evt.ctrlKey):
            evt.preventDefault();
            $("#button_export_all").click();
            return false;

        case (evt.key == "o" && evt.ctrlKey):
            evt.preventDefault();
            $("#button_open_json_all_data").click();
            return false
    }
}

function callbackCourseTBodyKeypress(evt) {
    let colIndex = $(this).parent().index();
    let parentRow = $(this).parent().parent();

    let nextRow = parentRow.next();
    console.log(colIndex, parentRow, nextRow);
    if (nextRow.length == 0 && confirm("Last row. Add new row?")) {
        nextRow = appendToCourseDataTable({});
    }
    console.log(colIndex, parentRow, nextRow);

    nextRow.children().eq(colIndex).find("input:first").focus();
}