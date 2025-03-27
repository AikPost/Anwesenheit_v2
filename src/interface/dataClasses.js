class Course {

    constructor({ trainer, abbreviation, name, startTime, endTime, location, contact, dayVerbatim, day, multipleTrainers, recipient = undefined }) {
        this.trainer = trainer;
        this.abbreviation = abbreviation;
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.contact = contact;
        this.dayVerbatim = dayVerbatim;
        this.day = day;
        this.multipleTrainers = multipleTrainers;

        this.ID = this.trainer + this.day + this.startTime + this.endTime
    }

    static fromCourseTableRow(jqSelector) {
        return new Course({
            trainer: jqSelector.find("[course_data=trainer]").val(),
            abbreviation: jqSelector.find("[course_data=abbreviation]"),
            startTime: jqSelector.find("[course_data=startTime]").val(),
            endTime: jqSelector.find("[course_data=endTime]").val(),
            location: jqSelector.find("[course_data=location]").val(),
            contact: jqSelector.find("[course_data=contact]").val(),
            dayVerbatim: "Montag Dienstag Mittwoch Donnerstag Freitag Samstag Sonntag".split(" ")[+jqSelector.find("[course_data=day]").val()],
            day: jqSelector.find("[course_data=day]").val(),
            name: jqSelector.find("[course_data=name]").val(),
            multipleTrainers: undefined
        })
    }
}