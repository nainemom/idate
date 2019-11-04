export default class {
  constructor (data = undefined) {
    this.data = data
    this.monthNames = ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Zulqiddah', 'Zulhijjah']
    this.weekDayNames = ['al-Aḥad', 'al-Ithnayn', 'ath-Thulāthā’', 'al-Arba‘ā’', 'al-Khamīs', 'al-Jumu\'ah', 'as-Sabt']
    this.startOfWeekOffset = 0
  }

  isLeap (year) {
    // calculation source: https://fa.wikipedia.org/wiki/%D8%B3%D8%A7%D9%84_%DA%A9%D8%A8%DB%8C%D8%B3%D9%87
    const list = [
      2,
      5,
      7,
      10,
      13,
      16,
      18,
      21,
      24,
      26,
      29
    ]
    return list.includes(year % 30)
  }

  yearLength (year) {
    if (this.data) {
      const currentYear = this.data.find(value => value[0] === year).slice(1)
      return currentYear.reduce((a, b) => a + b, 0)
    }
    return this.isLeap(year) ? 366 : 365
  }

  monthLength (year, month) {
    if (this.data) {
      const currentYear = this.data.find(value => value[0] === year).slice(1)
      return currentYear[month]
    }
    // last month
    if (month === 11) {
      return this.isLeap(year) ? 30 : 29
    }
    // if it is odd
    if (month % 2 === 0) {
      return 30
    }
    // if it is even
    return 29
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
    // 1389/9/22 is start 0, we start from 1389/0/1 and minus 257 days from response at the end
    // 286 is offset of start of year 1389 (that we start calcs from) till 1970/0/1
    let days = -257
    days -= 602 // idk
    for (let i = 1389; i < year; i += 1) {
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
    return this.fixDate(1389, 9, 22, 3, 30, 0, timestamp)
  }
}
