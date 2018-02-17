import {toGregorian, toJalaali, fixDate} from './utils.js'

const methods = [
  'getHours',
  'getMilliseconds',
  'getMinutes',
  'getSeconds',
  'getTime',
  'getTimezoneOffset',
  'getUTCDate',
  'getUTCDay',
  'getUTCFullYear',
  'getUTCHours',
  'getUTCMilliseconds',
  'getUTCMinutes',
  'getUTCMonth',
  'getUTCSeconds',
  'now',
  'parse',
  'setHours',
  'setMilliseconds',
  'setMinutes',
  'setSeconds',
  'setTime',
  'setUTCDate',
  'setUTCFullYear',
  'setUTCHours',
  'setUTCMilliseconds',
  'setUTCMinutes',
  'setUTCMonth',
  'setUTCSeconds',
  'toDateString',
  'toISOString',
  'toJSON',
  'toLocaleDateString',
  'toLocaleTimeString',
  'toLocaleString',
  'toTimeString',
  'toUTCString',
  'UTC',
  'valueOf'
]

const DAY_NAMES = ['Shanbe', 'Yekshanbe', 'Doshanbe', 'Seshanbe', 'Chaharshanbe', 'Panjshanbe', 'Jom\'e']
const PERSIAN_DAY_NAMES = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']
const MONTH_NAMES = ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand']
const PERSIAN_MONTH_NAMES = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']

export default class IDate extends Date {
  constructor () {
    super()

    let date
    const args = Array.from(arguments)
    if (args.length === 0) {
      date = Date.now()
    } else if (args.length === 1) {
      date = args[0] instanceof Date ? args[0].getTime() : args[0]
    } else {
      const fixed = fixDate(
        args[0],
        args[1] || 0,
        typeof args[2] === 'undefined' ? 1 : args[2])
      const converted = toGregorian(fixed[0], fixed[1] + 1, fixed[2])
      date = [converted.gy, converted.gm - 1, converted.gd].concat([args[3] || 0, args[4] || 0, args[5] || 0, args[6] || 0])
    }

    if (Array.isArray(date)) {
      this.gdate = new Date(...date)
    } else {
      this.gdate = new Date(date)
    }

    const converted = toJalaali(this.gdate.getFullYear(), this.gdate.getMonth() + 1, this.gdate.getDate())
    this.jdate = [converted.jy, converted.jm - 1, converted.jd]

    methods.forEach(method => {
      IDate.prototype[method] = function () {
        return this.gdate[method](...arguments)
      }
    })
  }

  getFullYear () {
    return this.jdate[0]
  }

  setFullYear (value) {
    if (!value) {
      return NaN
    } else {
      this.jdate = fixDate(value, this.jdate[1], this.jdate[2])
      this.syncDate()
      return this.gdate.getTime()
    }
  }

  getMonth () {
    return this.jdate[1]
  }

  setMonth (value) {
    if (!value) {
      return NaN
    } else {
      this.jdate = fixDate(this.jdate[0], value, this.jdate[2])
      this.syncDate()
      return this.gdate.getTime()
    }
  }

  getDate () {
    return this.jdate[2]
  }

  setDate (value) {
    if (!value) {
      return NaN
    } else {
      this.jdate = fixDate(this.jdate[0], this.jdate[1], value)
      this.syncDate()
      return this.gdate.getTime()
    }
  }

  getDay () {
    return (this.gdate.getDay() + 1) % 7
  }

  syncDate () {
    const converted = toGregorian(this.jdate[0], this.jdate[1] + 1, this.jdate[2])
    this.gdate.setFullYear(converted.gy)
    this.gdate.setMonth(converted.gm - 1)
    this.gdate.setDate(converted.gd)
  }

  toString (persianString = false) {
    if (persianString) {
      return `${PERSIAN_DAY_NAMES[this.getDay()]} ${this.getDate()} ${PERSIAN_MONTH_NAMES[this.getMonth()]} ${this.getFullYear()} ${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`
    }

    return `${DAY_NAMES[this.getDay()]} ${this.getDate()} ${MONTH_NAMES[this.getMonth()]} ${this.getFullYear()} ${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`
  }
}
