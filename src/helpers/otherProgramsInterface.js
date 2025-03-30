function getRenameCommand() {

    const quarter_name = $("#quarter_name").val();

    let courses = getCourseObjectArrays();
    let command = '$index = 0;\n$fileNameArray = @(\n\t';


    // iteriere über die divs
    let file_name_array = courses.map(function (course) {
        return `"${course.trainer}_${course.dayVerbatim.slice(0,2)}_${course.startTime.replace(":","")}_${course.name}_${quarter_name}.pdf"`.replaceAll(" ", "_");
    });

    command += file_name_array.join("\n\t") + "\n)\n";
    command += "Get-ChildItem -Name *.pdf | ForEach-Object { Rename-Item $_ -NewName $fileNameArray[$index]; $index = $index + 1 }";
    return command;
}