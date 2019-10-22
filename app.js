const MyDate = require('./dist/idate').JalaliDate

const dt = new MyDate();
dt.setMonth(0)
console.log(dt.toString())