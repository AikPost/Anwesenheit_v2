(function () {
    out = new Object();
    function parse_date_time_string(out_obj, str_in = "") {
        out_obj.day = [
            "Mo",
            "Di",
            "Mi",
            "Do",
            "Fr",
            "Sa",
            "So"
        ].indexOf(str_in.substr(0, 2));

        let time_string = str_in.split(",")[2];
        
        let [startTime, endTime] = time_string.split("–");

        out_obj.startTime = startTime.trim();
        out_obj.endTime = endTime.trim();
    }

    document.querySelectorAll("dl").forEach(
        function (item, index) {
            item.click();
            let out_obj = new Object();
            details_object = document.querySelector(".details");

            out_obj.course_id = index;

            try {
                out_obj.name = details_object.querySelector(".title").innerText;
            }
            catch (err) {
                console.log("No title", item);
            }


            try {
                parse_date_time_string(out_obj, details_object.querySelector(".event-when").innerText);
            }
            catch (err) {
                console.log("Kein parsebares Datum", item);
            }


            try {
                out_obj.location = details_object.querySelector(".event-where").innerText.replace("(Karte)","");
            }
            catch (err) {
                console.log("Kein Ort", item);
            }


            try {
                out_obj.trainer = details_object.querySelector(".event-description").innerText.split(":").at(-1).trim();
            }
            catch (err) {
                console.log("Kein trainer", item);
            }
            out["crs"+index] = new Object();
            out["crs"+index].course_object = out_obj;
            out["crs"+index].attendance_object = new Array();
        }
    )

    console.log(out);
    prompt("Kursdaten", JSON.stringify(out));
}());