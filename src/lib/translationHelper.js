function flatTrans({ data, trans_fields, trans_field }) {
  if (Array.isArray(data))
    return data.map((e) => flatTrans({ data: e, trans_fields, trans_field }));
  const result = { ...data, [trans_field]: undefined };
  for (let trans of data[trans_field]) {
    for (let field of trans_fields) {
      if (!result[field]) result[field] = {};
      result[field][trans.locale] = trans[field];
    }
  }
  return result;
}
function splitTrans({ data, trans_fields }) {
  const trans = {};
  const tempData = { ...data };
  for (let field of trans_fields)
    if (tempData[field]) {
      for (let [locale, value] of Object.entries(tempData[field])) {
        if (!trans[locale]) trans[locale] = {};
        trans[locale][field] = value;
      }
      delete tempData[field];
    }
  const translateArr = Object.entries(trans).map(([locale, data]) => ({
    ...data,
    locale,
  }));
  return [tempData, translateArr];
}

module.exports = { flatTrans, splitTrans };
