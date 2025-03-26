$("button#button_export_attendance_html").on(
    "click",
    export_html
);


function export_html(){
    const css_data = " @media print{.noPrint{display:none!important}.attendance_sheet_table_attendee_input{border:none;outline:none}th.attendance_sheet_table_date_header_cell{width:1.3em;font-weight:normal;background-color:darkgray;color:white;font-size:small}#main_content{margin-left:0!important;padding:0!important}#side_bar{display:none;height:0;width:0;position:fixed;z-index:1;top:0;left:0;border-right:none;overflow-x:hidden;padding:0}}.fit_width_input{width:-moz-available;width:stretch}fieldset{padding:5px;margin:10px 0}#side_bar{height:100%;width:220px;position:fixed;z-index:1;top:0;left:0;border-right:1px solid black;overflow-x:hidden;padding:2px;background-color:darkgray}#main_content{margin-left:224px;padding:0 10px}.teilgenommen{background-color:green}.abgesagt{background-color:red}.schnuppern{background-color:yellow}.ausgefallen{color:gray;background:repeating-linear-gradient(-45deg,gray 0,gray 2px,transparent 2px,transparent 9px)}table.attendance_sheet_content_table{table-layout:fixed}th.attendance_sheet_table_date_header_cell{width:1.3em;font-weight:normal;background-color:darkgray;color:white}input.attendance_sheet_table_attendee_input{background-color:inherit;width:95%;padding:0;margin:1px}.attendance_sheet_table_body tr:nth-child(odd){background-color:lightgray}th{background-color:darkgray;color:white;font-weight:bold}table,th,td{border:1px solid black;border-collapse:collapse;text-align:center}.dateHeaderCell{width:1.3em}.attendance_div{page-break-inside:avoid}table{margin-bottom:10px;width:100%}.col0{width:50%;text-align:left}.col1,.col3{width:20%;color:#acacac}.col2{color:#acacac}tr{height:.8cm}.template{display:none}.entryTable,.footerTable{table-layout:fixed}.signature{color:lightgray;width:10em}";
    console.log("Exporting the lists to html...");
    $("div.attendance_div:visible").each(function(index, item){
        // TODO: remove when testing:
        if(index > 0) return;
        console.log(item.outerHTML);
        download(
            `<!DOCTYPE html><html><head><style solid="">@media print{.noPrint{display:none!important}.attendance_sheet_table_attendee_input{border:none;outline:none}th.attendance_sheet_table_date_header_cell{width:1.3em;font-weight:normal;background-color:darkgray;color:white;font-size:small}#main_content{margin-left:0!important;padding:0!important}#side_bar{display:none;height:0;width:0;position:fixed;z-index:1;top:0;left:0;border-right:none;overflow-x:hidden;padding:0}}.fit_width_input{width:-moz-available;width:stretch}fieldset{padding:5px;margin:10px 0}#side_bar{height:100%;width:220px;position:fixed;z-index:1;top:0;left:0;border-right:1px solid black;overflow-x:hidden;padding:2px;background-color:darkgray}#main_content{margin-left:224px;padding:0 10px}.teilgenommen{background-color:green}.abgesagt{background-color:red}.schnuppern{background-color:yellow}.ausgefallen{color:gray;background:repeating-linear-gradient(-45deg,gray 0,gray 2px,transparent 2px,transparent 9px)}table.attendance_sheet_content_table{table-layout:fixed}th.attendance_sheet_table_date_header_cell{width:1.3em;font-weight:normal;background-color:darkgray;color:white}input.attendance_sheet_table_attendee_input{background-color:inherit;width:95%;padding:0;margin:1px}.attendance_sheet_table_body tr:nth-child(odd){background-color:lightgray}th{background-color:darkgray;color:white;font-weight:bold}table,th,td{border:1px solid black;border-collapse:collapse;text-align:center}.dateHeaderCell{width:1.3em}.attendance_div{page-break-inside:avoid}table{margin-bottom:10px;width:100%}.col0{width:50%;text-align:left}.col1,.col3{width:20%;color:#acacac}.col2{color:#acacac}tr{height:.8cm}.template{display:none}.entryTable,.footerTable{table-layout:fixed}.signature{color:lightgray;width:10em}</style></head><body>${item.outerHTML}</body></html>`,
            "test.html",
            "text/html"
        );

    })
}