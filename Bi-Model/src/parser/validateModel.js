import checkField from './checkField';

export default function validateModel(model, collectionShortName) {
  const fieldNames = Object.keys(model);
  for (let i = 0, l = fieldNames.length; i < l; i += 1) {
    const fieldName = fieldNames[i];
    const field = model[fieldName];
    checkField(fieldName, field, collectionShortName);
  }
  return true;
}
