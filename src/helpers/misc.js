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

function compareArrays(arr1, arr2) {
    let len = Math.min(arr1.length, arr2.length);

    // Compare each element one by one
    for (let i = 0; i < len; i++) {
        if (arr1[i] < arr2[i]) return -1; // arr1 is less than arr2
        if (arr1[i] > arr2[i]) return 1;  // arr1 is greater than arr2
    }

    // If arrays are equal so far, compare their lengths
    if (arr1.length < arr2.length) return -1;  // arr1 is shorter, considered less
    if (arr1.length > arr2.length) return 1;   // arr1 is longer, considered greater

    return 0;  // arrays are equal
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

/**
 * 
 * @param {String} s_1 
 * @param {String} s_2 
 */
function compare_strings(s_1, s_2) {
    return s_1.localeCompare(s_2);
}