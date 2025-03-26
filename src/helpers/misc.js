/**
 * Generate a simple random Identifier
 * @param {int} len Length of the identifier 
 * @returns {string} Identifier
 */
function generateRandomId(len = 4) {
    let out = ""
    while (out.length != len) {
        out = Math.random().toString(36).substring(2, len + 2)
    }

    return out
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