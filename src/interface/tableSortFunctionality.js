function sortInputTableByColumn(tableBodySelector, colIndex, descending = false) {
    function rowCompareFunc(r_1, r_2) {
        let v_1 = $(r_1).children().eq(colIndex).find("input,select").map((index, field) => field.value).get();
        let v_2 = $(r_2).children().eq(colIndex).find("input,select").map((index, field) => field.value).get();

        return compareArrays(v_1, v_2);
    }

    sortTable(tableBodySelector, rowCompareFunc, descending);
}
function sortTable(tableBodySelector, rowCompareFunc, descending = false) {
    let time_sorted_courses = tableBodySelector.find("tr").sort((x,y) => (1 - 2 * descending) * rowCompareFunc(x,y));
    for (course of time_sorted_courses) {
        $("#course_data_tbody").append($(course));
    }
}