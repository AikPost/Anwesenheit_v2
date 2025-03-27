/** Download a json file containing data on the date period and the courses. 
 * 
 * File will contain duplicate courses only differing by recipient value for every course with multiple trainers.
 *  
 * Intended to be used as the/an argument for the python tool "tabellenFuerTrainerErstellen.py" in ./tools/

@param {(RegExp | string)} [trainerSep=/(\s*,\s*)/]
 */
function exportQuarterCourseDataWithRecipients(trainerSep = /(\s*,\s*)/) {
    const quarterStart = $("#quarter_starting_monday").val();
    const quarterEnd = $("#quarter_ending_monday").val();
    const quarterName = $("#quarter_name").val();

    const coursesByTrainer = getCourseObjectsByTrainer(trainerSep);

    /** may contain duplicate courses only differing by recipient value */
    const courseExportData = coursesByTrainer.values().toArray().flat();
    const outputObj = {
        "courses": courseExportData,
        "period": {
            "quarterStart": quarterStart,
            "quarterEnd": quarterEnd,
            "quarterName": quarterName
        }
    }

    downloadAsJSON(outputObj, "courses_" + quarterName + ".json");
}