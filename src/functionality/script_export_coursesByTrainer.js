function exportQuarterCourseData() {
    const quarterStart = $("#quarter_starting_monday").val();
    const quarterEnd = $("#quarter_ending_monday").val();
    const quarterName = $("#quarter_name").val();

    let coursesByTrainer = getCourseObjectsByTrainer();
    let outputObj = {
        "courses": coursesByTrainer.values().toArray().flat(),
        "period": {
            "quarterStart": quarterStart,
            "quarterEnd": quarterEnd,
            "quarterName": quarterName
        }
    }

    Helpers.download(JSON.stringify(outputObj),"courses_"+ quarterName +".json", "text/json")
}