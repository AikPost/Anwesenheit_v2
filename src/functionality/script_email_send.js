const templateReplacements = new Map([
    [
        "{name}",
        (trainer, {}) => trainer
    ],[
        "{vorname}",
        (trainer, {}) => trainer.split(" ")[0]
    ],[
        "{nachname}",
        (trainer, {}) => trainer.split(" ").at(-1)
    ],[
        "{kurse}",
        (trainer, {}) => "Test"
    ],[
        "{qStart}",
        (trainer, {}) => shortDateString($("#quarter_starting_monday").val())
    ],[
        "{qEnde}",
        (trainer, {}) => shortDateString($("#quarter_ending_monday").val())
    ],[
        "{qName}",
        (trainer, {}) => $("#quarter_Name").val()
    ],

]);

function mailTemplateFill(mailTemplate, trainer, courses) {
    let mailBody = mailTemplate;
    for ([templateString, replacementFunc] of templateReplacements) {
        mailBody = mailBody.replaceAll(
            templateString,
            replacementFunc(trainer, courses)
        )
    }

    return mailBody;
}

/**
 * 
 * @returns {Map<String,String>} Map from trainername to email adress
 */
function getTrainerMailMap() {
    let csv_sep = $("#csv_sep").val();

    return new Map($("#trainer_mail_csv")
        .val()
        .split("\n")
        .filter((item) => item.trim() != "")
        .map(function (item, index) {
            return item.split(csv_sep).map((item) => item.trim())
        })
    )
}


/**
 * Get a Map grouping the Course objects gotten from the DOM by trainer.
 * 
 * Courses with multiple trainers are duplicated and occur in the appropriate groups
 * 
 * The Course objects are augmented by a recipient attr which is set to be the key of the Groupby action.
 * @param {(RegExp|string)} [trainerSep=/(\s*,\s*)/] 
 * @returns {Map<string, Array<CourseWithRecipient>>}
 */
function getCourseObjectsByTrainer(trainerSep=/\s*,\s*/) {

    // get course data as array of Course objects with added item "recipient" containing one trainer name
    // courses with multiple trainers may will be duplicated with differing recipient attribute values
    let courseList = getCourseObjectArrays()
        .map(function (courseObj) {
            let trainers = courseObj.trainer.split(trainerSep);
            return trainers.map(function (cTrainer) {
                let out = { ...courseObj };
                out.multipleTrainers = trainers;
                out.recipient = cTrainer;
                return out;
            })

        })
        .flat()

    return Map.groupBy(
        courseList,
        ({ recipient }) => recipient
    )
}

function missingMailText(trainer, trainerCourseArray) {
    return `${trainer}
    ${trainerCourseArray
            .map(function ({ name, multipleTrainers }) {
                if (multipleTrainers.length > 1) {
                    return `\t${name} mit ${multipleTrainers.filter((trainerName) => trainerName != trainer).join(", ")}`
                }
                return `\t${name}`

            })
            .join("\n")
        }`
}

function sendMail(mailto_a, recipient, subject, body) {

    console.log("mailto:" + recipient + "?subject=" + subject + "&body=" + body);
    console.log(encodeURI("mailto:" + recipient + "?subject=" + subject.replaceAll() + "&body=" + body));

    mailto_a.attr(
        "href",
        [
            "mailto:",
            encodeURI(recipient).replaceAll("&", "%26").replaceAll("?", "%3F"),
            "?subject=",
            encodeURI(subject).replaceAll("&", "%26").replaceAll("?", "%3F"),
            "&body=",
            encodeURI(body).replaceAll("&", "%26").replaceAll("?", "%3F")
        ].join("")
    );
    mailto_a.get(0).click();

}

function sendMails() {
    const quarterStart = $("#quarter_starting_monday").val();
    const quarterEnd = $("#quarter_ending_monday").val();
    const quarterName = $("#quarter_name").val();

    let mailto_a = $(`<a hidden>MailAttr</a>`);
    $("#Hallo").append(mailto_a);

    const mailSubject = $("#mail_betreff").val();

    let mails = getTrainerMailMap();
    let courseGroups = getCourseObjectsByTrainer();

    let noMailTrainers = [];

    for ([recipient, recipientCourseArray] of courseGroups) {
        if (mails.has(recipient)) continue;

        noMailTrainers.push(
            missingMailText(recipient, recipientCourseArray)
        );

    }
    const confirmMessage = "Folgenden Trainer wurde keine Mailadresse zugeordnet: \n" + noMailTrainers.join("\n\n") + "\n\nTrotzdem fortfahren?";
    if (noMailTrainers.length > 0 && !confirm(confirmMessage)) return;
    console.log("Sending mails...");
    let mailBody;
    courseGroups.forEach(function (courses, trainer, theMap) {
        if (!mails.has(trainer)) return [];


        let template = $("#mail_content").val();
        let mailBody = mailTemplateFill(template, trainer, courses);

        sendMail(
            mailto_a,
            mails.get(trainer),
            mailSubject,
            mailBody
        )

    })




    mailto_a.remove();


}

function getCourseDataText(courses, quarterName, startDate, endDate) {
    return courses.map(function ({ name, trainer, dayVerbatim, day, startTime, endTime, location }) {
        return `${name}
${trainer}
${dayVerbatim}
${startTime} - ${endTime}
${location}
${startDate}
${endDate}
${quarterName}
${day}
`
    }).join("\n");
}
