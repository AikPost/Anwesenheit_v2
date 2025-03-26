class CourseDataTRGen {
    static course_id_set = new Set()

    static last_checked_course = null

    static get_new_course_data_tr({
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
            new_course_id = Helpers.generateRandomId()
            console.log(new_course_id)
        } while (CourseDataTRGen.course_id_set.has(new_course_id))

        console.log(new_course_id)
        CourseDataTRGen.course_id_set.add(new_course_id)

        new_course_data_tr.find(".course_data_input[course_data=course_id]").val(new_course_id)

        new_course_data_tr.find(".course_data_input[course_data=name]").val(name)
        new_course_data_tr.find(".course_data_input[course_data=abbreviation]").val(abbreviation)
        new_course_data_tr.find(".course_data_input[course_data=trainer]").val(trainer)
        new_course_data_tr.find(".course_data_input[course_data=day]").val(day)
        new_course_data_tr.find(".course_data_input[course_data=startTime]").val(startTime)
        new_course_data_tr.find(".course_data_input[course_data=endTime]").val(endTime)
        new_course_data_tr.find(".course_data_input[course_data=location]").val(location)
        new_course_data_tr.find(".course_data_input[course_data=contact]").val(contact)

        console.log(new_course_data_tr)
        return new_course_data_tr


    }
}


function add_new_course_data_tr(course_data) {
    const new_course_data_tr = CourseDataTRGen.get_new_course_data_tr(course_data);

    const course_data_container = $("#course_data_tbody");

    course_data_container.append(new_course_data_tr)

    return new_course_data_tr
}
