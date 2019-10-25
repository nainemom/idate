function isLeap(year) {
  // calculation source: https://fa.wikipedia.org/wiki/%D8%B3%D8%A7%D9%84_%DA%A9%D8%A8%DB%8C%D8%B3%D9%87
  const list = [
    0,
    4,
    8,
    12,
    16,
    20,
    year > 473 ? 24 : 25,
    29,
    33,
    37,
    41,
    45,
    49,
    53,
    year > 473 ? 57 : 58,
    62,
    66,
    70,
    74,
    78,
    82,
    86,
    year > 473 ? 90 : 91,
    95,
    99,
    103,
    107,
    111,
    115,
    year > 473 ? 119 : 120,
    124,
  ];
  return list.includes(year % 128);
}

function yearLength(year) {
  return isLeap(year) ? 366 : 365;
}

function monthLength(year, month) {
  if (month < 6) {
    return 31;
  }
  if (month === 11 && !isLeap(year)) {
    return 29;
  }
  return 30;
}

function toTimestamp(year, month, date) {
  // 1348/9/11 is start 0, we start from 1348/0/1 and minus 257 days from response at the end
  let days = 0;
  for(let i = 1348; i < year; i += 1) {
    days += yearLength(i);
  }

  for(let i = 0; i < month; i += 1) {
    days += monthLength(year, i);
  }
  days += (date - 1);
  // 286 is offset of start of year 1348 (that we start calcs from) till 1970/0/1
  days -= 286;
  // 86400000 is one day miliseconds
  return days * 86400000;
}


const dt = new Date(2019, 9, 26);
dt.setUTCHours(0);
dt.setUTCMinutes(0);
dt.setUTCSeconds(0);
dt.setUTCMilliseconds(0);
dt.setUTCDate(26);

const dti = toTimestamp(1398, 7, 4);

console.log(dt.getTime() / 86400000, dti / 86400000);