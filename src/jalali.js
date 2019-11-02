export default class {
  constructor () {
    this.monthNames = ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand']
    this.weekDayNames = ['Shanbe', 'Yekshanbe', 'Doshanbe', 'Seshanbe', 'Chaharshanbe', 'Panjshanbe', 'Jom\'e']
    this.startOfWeekOffset = 1
  }

  isLeap (year) {
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

  yearLength (year) {
    return this.isLeap(year) ? 366 : 365
  }

  monthLength (year, month) {
    if (month < 6) {
      return 31
    }
    if (month === 11 && !this.isLeap(year)) {
      return 29
    }
    return 30
  }

  fixDate (year, month, date, hour = 0, minute = 0, second = 0, milisecond = 0) {
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

        while (d > this.monthLength(y, m)) {
          d -= this.monthLength(y, m)
          m = m < 11 ? m + 1 : 0
          y = m === 0 ? y + 1 : y
        }
        while (d <= 0) {
          m = m > 0 ? m - 1 : 11
          y = m === 11 ? y - 1 : y
          d += this.monthLength(y, m)
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

  toTimestamp (year, month, date, hour = 0, minute = 0, second = 0, milisecond = 0) {
    // 1348/9/11 is start 0, we start from 1348/0/1 and minus 257 days from response at the end
    // 286 is offset of start of year 1348 (that we start calcs from) till 1970/0/1
    let days = -286
    for (let i = 1348; i < year; i += 1) {
      days += this.yearLength(i)
    }
    for (let i = 0; i < month; i += 1) {
      days += this.monthLength(year, i)
    }
    days += (date - 1)
    const ts = (days * 86400000) + (milisecond + (second * 1000) + (minute * 60000) + (hour * 3600000))
    return ts - 12600000 // 12600000 is iran timezone offset at zero ts
  }

  fromTimestamp (timestamp) {
    return this.fixDate(1348, 9, 11, 3, 30, 0, timestamp)
  }
}
