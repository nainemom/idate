import { dateInstanceCreator, fromDateInstance, updateDateInstance, getterMethods, setterMethods, overridingSetterMethods, overridingGetterMethods } from './utils'

export default function DateLib (dateConvertorModule) {
  const { fromGregorian, toGregorian, fixDate, monthNames, weekDayNames, startOfWeekOffset } = dateConvertorModule
  return class extends Date {
    constructor (...args) {
      super()
      this.di = dateInstanceCreator(toGregorian, fixDate, ...args)
      this.dt = fromDateInstance(this.di, fromGregorian)

      getterMethods.forEach(method => {
        this[method] = function (...fargs) {
          return this.di[method](...fargs)
        }
      })

      setterMethods.forEach(method => {
        this[method] = function (...fargs) {
          const val = this.di[method](...fargs)
          this.dt = fromDateInstance(this.di, fromGregorian)
          return val
        }
      })

      overridingSetterMethods.forEach((method, index) => {
        this[method] = function (newValue) {
          this.dt[index] = newValue
          this.dt = fixDate(...this.dt)
          updateDateInstance(this.di, ...toGregorian(...this.dt))
          return this.di.getTime()
        }
      })

      overridingGetterMethods.forEach((method, index) => {
        this[method] = function () {
          return this.dt[index]
        }
      })

      this.getDay = function () {
        return (this.di.getDay() + startOfWeekOffset) % 7
      }

      this.toDateString = function () {
        return `${weekDayNames[this.getDay()]} ${this.getDate()} ${monthNames[this.getMonth()]} ${this.getFullYear()}`
      }
      this.toString = function () {
        return `${this.toDateString()} ${this.toTimeString()}`
      }
    }
  }
}
