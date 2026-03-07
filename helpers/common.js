const path = require("path");

const DATASET_TYPES = [
  "scripted-speech",
  "spontaneous-speech",
  "code-switching",
];

const buildFilePath = (datasetType, datasetName) => {
  const filename = datasetName.endsWith(".json")
    ? datasetName
    : `${datasetName}.json`;
  return path.join(__dirname, "..", "datasets", datasetType, filename);
};

const buildFolderPath = (datasetType, folderName) => {
  return path.join(__dirname, "..", "datasets", datasetType, folderName);
};

const getLocaleFromFilename = (filename) =>
  filename.split(".json")[0].split("_")[1];

const validateDatasetType = (datasetType) => {
  if (!DATASET_TYPES.includes(datasetType)) {
    throw new Error(`"${datasetType}" is not a valid dataset type. Valid: ${DATASET_TYPES.join(", ")}`);
  }
};

module.exports = {
  DATASET_TYPES,
  buildFilePath,
  buildFolderPath,
  getLocaleFromFilename,
  validateDatasetType,
};
