// import { timestampCreator, fromDateInstance, updateDateInstance, getterMethods, setterMethods, overridingSetterMethods, overridingGetterMethods } from './utils'

export default function (CalendarModule, data = undefined) {
  const calendar = new CalendarModule(data)
  return class extends Date {
    constructor (...args) {
      super()
      this.timezoneOffset = new Date().getTimezoneOffset() * 60000

      this.timestamp = (() => {
        if (args.length === 0) {
          return Date.now()
        } else if (args.length === 1) {
          return new Date(args[0] instanceof Date ? args[0].getTime() : args[0]).getTime()
        }
        const fixedParams = [0, 0, 1, 0, 0, 0, 0].map((defaultValue, index) => {
          return typeof args[index] === 'undefined' ? defaultValue : args[index]
        })
        const fixed = calendar.fixDate(...fixedParams)
        return calendar.toTimestamp(...fixed) // + this.timezoneOffset
      })()

      const dateGetters = ['getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds', 'getMiliseconds']
      dateGetters.forEach((method, index) => {
        this[method] = function () {
          const date = calendar.fromTimestamp(this.timestamp)
          return date[index]
        }
      })
      const dateSetters = ['setFullYear', 'setMonth', 'setDate', 'setHours', 'setMinutes', 'setSeconds', 'setMiliseconds']
      dateSetters.forEach((method, index) => {
        this[method] = function (arg) {
          const date = calendar.fromTimestamp(this.timestamp)
          console.log(date)
          date[index] = arg
          console.log('after', date)
          this.timestamp = calendar.toTimestamp(...calendar.fixDate(...date))
          return this.timestamp
        }
      })

      const customMethods = ['getDay', 'toDateString', 'toString']

      this[customMethods[0]] = function () {
        return (new Date(this.timestamp).getDay() + calendar.startOfWeekOffset) % 7
      }

      this[customMethods[1]] = function () {
        return `${calendar.weekDayNames[this.getDay()]} ${this.getDate()} ${calendar.monthNames[this.getMonth()]} ${this.getFullYear()}`
      }
      this[customMethods[2]] = function () {
        return `${this.toDateString()} ${this.toTimeString()}`
      }

      const allThisMethods = [].concat(dateGetters).concat(dateSetters).concat(customMethods).concat('constuctor')
      Object
        .getOwnPropertyNames(Date.prototype)
        .filter(method => !allThisMethods.includes(method))
        .forEach(method => {
          this[method] = function (...args) {
            const date = new Date(this.timestamp)
            const ret = date[method](...args)
            this.timestamp = date.getTime()
            return ret
          }
        })
    }
  }
}
