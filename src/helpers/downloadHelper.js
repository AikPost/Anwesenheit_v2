function downloadDataAsFile(data, filename, type) {
    let file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        let a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

/**
 * Download a json file containing the stringified contents of obj
 * @param {Object} obj Object to be exported
 * @param {string} filename name to save file as
 */
function downloadAsJSON(obj,filename){
    downloadDataAsFile(JSON.stringify(obj), filename, type="text/json");

}