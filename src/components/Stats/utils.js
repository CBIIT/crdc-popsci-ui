export const formatFileSize = (size) => {
  if (typeof size !== 'number') {
    return '';
  }
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const sizeStr = (size / (1024 ** i)).toFixed(2) * 1;
  const suffix = ['B', 'KB', 'MB', 'GB', 'TB'][i];
  return `${sizeStr} ${suffix}`;
};

export const formatAsCommaSeparatedNumber = (val) => {
  const parsedValue = parseInt(val, 10);

  if (isNaN(parsedValue)) {
    return '0';
  }

  return parsedValue.toLocaleString();
}

/* 
  Add up the number_of_participants for each Studies to display on Stats Bar.
  [
    {"study_short_name": "SMCT", "number_of_participants": 100,},
    { "study_short_name": "PLTV", "number_of_participants": 20000,},
    { "study_short_name": "BSBN", "number_of_participants": 29000,},
    { "study_short_name": "GTSR", "number_of_participants": 1000, },
    { "study_short_name": "BSCT", "number_of_participants": 100000,},
    { "study_short_name": "HLBB", "number_of_participants": 25007,},
    { "study_short_name": "HBCT","number_of_participants": 25000,},
    { "study_short_name": "PLCO", "number_of_participants": 154887,}
  ]
  calculateStatsTotals => {number_of_participants: 355994}
*/
export const calculateStatsTotals = (data) => {
  return data.reduce((acc, item) => {
    acc.number_of_participants += item.number_of_participants;
    return acc;
  }, { number_of_participants: 0 });
}