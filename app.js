const JalaliCalendar = require('./dist/jalali')
const HijriCalendar = require('./dist/hijri')
const IDate = require('./dist/idate')

const JalaliDate = IDate(JalaliCalendar)
const HijriDate = IDate(HijriCalendar)
// const baseDate = new Date('29 oct 2019')
// const dt = new MyDate(1440, 6, 23) // 23 rajab(06) 1440, 10 farv(00) 98, 30 march(02) 2019
// const dt2 = new MyDate(1440, 6, 24)
// // dt.setMonth(0)
// console.log(dt.toString())
// console.log(dt.di.toString())
// console.log('------------------')
// console.log(dt2.toString())
// console.log(dt2.di.toString())


console.log(new JalaliDate().toString())
console.log(new HijriDate().toString())