
/**
 * Returns a array containing the data given in the course data table.
 * @returns {Array<Course>}
 */
function getCourseObjectArrays() {
    return jQuery(".course_data_trow:visible")
        .map((index, courseTableRow) => Course.fromCourseTableRow($(courseTableRow)))
        .get();
}

function createCourseDataTableRow({
    name = "",
    abbreviation = "",
    trainer = "",
    day = null,
    startTime = "",
    endTime = "",
    location = "Clubheim, Uferweg 4",
    contact = ""
}) {
    let new_course_data_tr = $(".course_data_trow:hidden").clone().removeAttr("hidden");

    let new_course_id = ""
    do {
        new_course_id = generateRandomId();
        console.log(new_course_id);
    } while (State.courseIdSet.has(new_course_id))

    console.log(new_course_id)
    State.courseIdSet.add(new_course_id);

    new_course_data_tr.find(".course_data_input[course_data=course_id]").val(new_course_id);

    new_course_data_tr.find(".course_data_input[course_data=name]").val(name);
    new_course_data_tr.find(".course_data_input[course_data=abbreviation]").val(abbreviation);
    new_course_data_tr.find(".course_data_input[course_data=trainer]").val(trainer);
    new_course_data_tr.find(".course_data_input[course_data=day]").val(day);
    new_course_data_tr.find(".course_data_input[course_data=startTime]").val(startTime);
    new_course_data_tr.find(".course_data_input[course_data=endTime]").val(endTime);
    new_course_data_tr.find(".course_data_input[course_data=location]").val(location);
    new_course_data_tr.find(".course_data_input[course_data=contact]").val(contact);

    console.log(new_course_data_tr);
    return new_course_data_tr;


}

/**
 * Append a new row to the course data table which contains the data form course_data
 * @param {Course} course_data 
 * @returns {jQuery} jQuery selector of the new row
 */
function appendToCourseDataTable(course_data) {
    const course_data_container = $("#course_data_tbody");

    const new_course_data_tr = createCourseDataTableRow(course_data);
    course_data_container.append(new_course_data_tr)

    return new_course_data_tr;
}