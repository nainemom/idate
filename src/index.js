import {toGregorian, toJalaali, fixDate} from './utils.js'

export default class IDate extends Date {
  constructor (a, b, c, d, e, f, g) {
    super()
    let x
    if (arguments.length === 0) {
      x = Date.now()
    } else if (arguments.length === 1) {
      x = a
    } else if (arguments.length >= 2) {
      const fixed = fixDate(a, b || 0, typeof c === 'undefined' ? 1 : c)
      const converted = toGregorian(fixed[0], fixed[1] + 1, fixed[2])
      x = [converted.gy, converted.gm - 1, converted.gd].concat([d || 0, e || 0, f || 0, g || 0])
    }
    if (Array.isArray(x)) {
      this.gdate = new Date(...x)
    } else {
      this.gdate = new Date(x)
    }
    const converted = toJalaali(this.gdate.getFullYear(), this.gdate.getMonth() + 1, this.gdate.getDate())
    this.jdate = [converted.jy, converted.jm - 1, converted.jd]

    const methods = ['getHours', 'setHours', 'getMinutes', 'setMinutes', 'getSeconds', 'setSeconds', 'getMilliseconds', 'setMilliseconds', 'valueOf', 'toISOString']
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
  toString () {
    const DAY_NAMES = ['Shanbe', 'Yekshanbe', 'Doshanbe', 'Seshanbe', 'Chaharshanbe', 'Panjshanbe', 'Jom\'e']
    const MONTH_NAMES = ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand']
    return `${DAY_NAMES[this.getDay()]} ${this.getDate()} ${MONTH_NAMES[this.getMonth()]} ${this.getFullYear()} ${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`
  }
}
