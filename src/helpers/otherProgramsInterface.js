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