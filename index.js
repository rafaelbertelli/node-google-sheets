const GoogleSpreadSheet = require("google-spreadsheet");
const credentials = require("./credentials.json");
const { promisify } = require("util");

const docId = "1x9TvVcJ5LVtDCPI9wHfbXq4ITRQu0t01WbeRIamqcuM";
const doc = new GoogleSpreadSheet(docId);

const accessSheet = async () => {
  await promisify(doc.useServiceAccountAuth)(credentials);
  const info = await promisify(doc.getInfo)();

  return info;
};

const getSheet = async () => {
  const info = await accessSheet();

  console.log(info);
};

const getFirstWorksheet = async () => {
  const info = await accessSheet();

  const firstWS = info.worksheets[0];
  const rows = await promisify(firstWS.getRows)();

  rows.forEach(row => console.log(row.nome));
};

const getFirstWorksheetOffset = async () => {
  const info = await accessSheet();

  const firstWS = info.worksheets[0];
  const rows = await promisify(firstWS.getRows)({
    offset: 2
  });

  rows.forEach(row => console.log(row.nome));
};

const getFirstWorksheetFilter = async () => {
  const info = await accessSheet();

  const firstWS = info.worksheets[0];
  const rows = await promisify(firstWS.getRows)({
    query: 'nome = "Rafael Bertelli Borges"'
  });

  rows.forEach(row => console.log(row.nome));
};

const addRow = async () => {
  const info = await accessSheet();
  const firstWS = info.worksheets[0];

  await promisify(firstWS.addRow)({
    nome: "novo nome",
    email: "novo e-mail"
  });
};

const deleteRow = async () => {
  const info = await accessSheet();
  const firstWS = info.worksheets[0];

  const rows = await promisify(firstWS.getRows)({
    query: 'nome = "novo nome"'
  });

  rows.forEach(row => row.del());
};

getSheet();
// getFirstWorksheet();
// getFirstWorksheetOffset();
// getFirstWorksheetFilter();
// addRow();
// deleteRow();
