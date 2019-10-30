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

function fixDate (year, month, date, hour = 0, minute = 0, second = 0, milisecond = 0) {
  let indexes = [
    'milisecond',
    'second',
    'minute',
    'hour',
    'date',
    'month',
    'year',
  ]
  let ret = [
    milisecond,
    second,
    minute,
    hour,
    date,
    month,
    year,
  ]

  const minMax = (index, state) => {
    const name = indexes[index]
    if (name === 'milisecond') {
      return [0, 999];
    }
    if (['minute', 'second'].includes(name)) {
      return [0, 59];
    }
    if (name === 'hour') {
      return [0, 23];
    }
    if (name === 'date') {
      return [
        1,
        monthLength(
          state[indexes.indexOf('year')],
          state[indexes.indexOf('month')]
        )
      ];
    }
    if (name === 'month') {
      return [0, 11]
    }
    return [-Infinity, +Infinity];
  }

  ret.forEach((val, index) => {
    const [min, max] = minMax(index, ret);
    if (min === -Infinity || max === Infinity) {
      return
    }
    const offset = Math.floor(val / (max + 1));
    ret[index + 1] += offset
    ret[index] -= offset * (max + 1)
  })

  return ret.reverse()
  
  let fixedYear = year
  let fixedMonth = month
  let fixedDate = date

  while (fixedMonth > 11) {
    fixedYear += 1
    fixedMonth -= 12
  }
  while (fixedMonth < 0) {
    fixedYear -= 1
    fixedMonth += 12
  }

  while (fixedDate > monthLength(fixedYear, fixedMonth)) {
    fixedDate -= monthLength(fixedYear, fixedMonth)
    fixedMonth = fixedMonth + 1
    if (fixedMonth > 11) {
      fixedYear = fixedYear + 1
      fixedMonth = 0
    }
  }
  while (fixedDate < 1) {
    fixedMonth = fixedMonth - 1
    if (fixedMonth < 0) {
      fixedYear = fixedYear - 1
      fixedMonth = 11
    }
    fixedDate += monthLength(fixedYear, fixedMonth)
  }

  return [fixedYear, fixedMonth, fixedDate]
}


function toTimestamp(year, month, date) {
  // 1348/9/11 is start 0, we start from 1348/0/1 and minus 257 days from response at the end
  // 286 is offset of start of year 1348 (that we start calcs from) till 1970/0/1
  
  let days = -286;
  for(let i = 1348; i < year; i += 1) {
    days += yearLength(i);
  }

  for(let i = 0; i < month; i += 1) {
    days += monthLength(year, i);
  }
  days += (date - 1);
  // 86400000 is one day miliseconds
  return days * 86400000;
}


function fromTimestamp(timestamp) {
  // const daysLength = Math.floor(timestamp / 86400000);
  return fixDate(1348, 9, 11, 0, 0, 0, timestamp)

}


function check(enDate, faDate) {
  const dt = new Date();
  dt.setUTCHours(0);
  dt.setUTCMinutes(0);
  dt.setUTCSeconds(0);
  dt.setUTCMilliseconds(0);
  dt.setUTCFullYear(enDate[0]);
  dt.setUTCMonth(enDate[1]);
  dt.setUTCDate(enDate[2]);
  const enDt = dt.getTime()
  const faDt = toTimestamp(...faDate)
  console.log(enDt, faDt, faDate, fromTimestamp(enDt), enDt === faDt)
}


// console.log(fixDate(
//   1398,
//   6,
//   31,
// ))
// return
// check(
//   [2019, 9, 26],
//   [1398, 7, 4],
// )

// // check(
// //   [1970, 0, 1],
// //   [1348, 9, 11],
// // )

// check(
//   [1969, 11, 30],
//   [1348, 9, 9],
// )


const ts = toTimestamp(1348, 9, 1)
const dt = fromTimestamp(ts);
console.log(dt)