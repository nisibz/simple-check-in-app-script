function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

function setType(type) {
  return type == "Check-out" ? "Check-in" : "Check-out";
}

function getLastRow() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  switch (lastRow) {
    case 0:
      sheet.appendRow(["Date", "Action"]);
      return "Check-in";
    case 1:
      return "Check-in";
    default:
      var data = sheet.getDataRange().getValues();
      return setType(data[data.length - 1][1]);
  }
}

function record() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastType = getLastRow();
  var rowData = [new Date(), lastType];
  sheet.appendRow(rowData);
  return {
    message: `${lastType} recorded successfully!`,
    type: setType(lastType),
  };
}
