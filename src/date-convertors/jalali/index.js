function isLeap (year) {
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
    124
  ]
  return list.includes(year % 128)
}

function yearLength (year) {
  return isLeap(year) ? 366 : 365
}

function monthLength (year, month) {
  if (month < 6) {
    return 31
  }
  if (month === 11 && !isLeap(year)) {
    return 29
  }
  return 30
}

function fixDate (year, month, date, hour = 0, minute = 0, second = 0, milisecond = 0) {
  const indexes = [
    'milisecond',
    'second',
    'minute',
    'hour',
    'date',
    'month',
    'year'
  ]
  const ret = [
    milisecond,
    second,
    minute,
    hour,
    date,
    month,
    year
  ]
  const max = [
    1000,
    60,
    60,
    24
  ]

  ret.forEach((val, index) => {
    if (['year', 'month', 'date'].includes(indexes[index])) {
      let d = ret[indexes.indexOf('date')]
      let m = ret[indexes.indexOf('month')]
      let y = ret[indexes.indexOf('year')]
      const monthOffset = Math.floor(m / 12)
      y += monthOffset
      m -= monthOffset * 12

      while (d > monthLength(y, m)) {
        d -= monthLength(y, m)
        m = m < 11 ? m + 1 : 0
        y = m === 0 ? y + 1 : y
      }
      while (d <= 0) {
        m = m > 0 ? m - 1 : 11
        y = m === 11 ? y - 1 : y
        d += monthLength(y, m)
      }
      ret[indexes.indexOf('date')] = d
      ret[indexes.indexOf('month')] = m
      ret[indexes.indexOf('year')] = y
    } else {
      const offset = Math.floor(val / (max[index]))
      ret[index + 1] += offset
      ret[index] -= offset * (max[index])
    }
  })
  return ret.reverse()
}

function toTimestamp (year, month, date, hour = 0, minute = 0, second = 0, milisecond = 0) {
  // 1348/9/11 is start 0, we start from 1348/0/1 and minus 257 days from response at the end
  // 286 is offset of start of year 1348 (that we start calcs from) till 1970/0/1
  let days = -286
  for (let i = 1348; i < year; i += 1) {
    days += yearLength(i)
  }
  for (let i = 0; i < month; i += 1) {
    days += monthLength(year, i)
  }
  days += (date - 1)
  return (days * 86400000) + (milisecond + (second * 1000) + (minute * 60000) + (hour * 3600000))
}

function fromTimestamp (timestamp) {
  return fixDate(1348, 9, 11, 0, 0, 0, timestamp)
}

function check (enDate, faDate) {
  const dt = new Date()
  dt.setUTCHours(0)
  dt.setUTCMinutes(0)
  dt.setUTCSeconds(0)
  dt.setUTCMilliseconds(0)
  dt.setUTCFullYear(enDate[0])
  dt.setUTCMonth(enDate[1])
  dt.setUTCDate(enDate[2])
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

// const ts = toTimestamp(1398, 11, 25)
// const dt = fromTimestamp(ts);
const dt = fromTimestamp(Date.now())
console.log(dt)
