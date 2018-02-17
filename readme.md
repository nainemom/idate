# IDate

Iranian Date constractor for Javascript, Just like native javascript `Date`.
> Date convertor functions hard copied from [`jalaali-js`](https://github.com/jalaali/jalaali-js)


## Installation

```terminal
npm install idate --save
# or
yarn add idate
```

### Browser

```html
<head>
  <script src="path/to/idate/dist/idate.js"></script>
  <!-- or -->
  <script src="path/to/idate/dist/idate.min.js"></script>
</head>
```
### Node, ESM
```javascript
import IDate from 'idate'
// or
const IDate = require('idate')
```

### Initialization

For initializing `IDate` you may either pass parameteres of Jalali date to it just like native Date. Other type of params like `Date` || `IDate` object or `ISOString` or `Milliseconds` also supported.

```javascript
new IDate()
new IDate(milliseconds)
new IDate(gregorianDateString)
new IDate(jalaliYear, jalaliMonth, jalaliDay, hours, minutes, seconds, milliseconds)
```

### API
```javascript
const date = new IDate(1396, 5, 5)

// Getters
date.getFullYear() // 1396
date.getMonth() // 5 (indexed from zero, so 5 is شهریور)
date.getDate() // 5 (day in month)
date.getDay() // 4 (day of week started from saturday and indexed from zero, so 4 is چهارشنبه)

// Setters
date.setFullYear(1371)
date.setMonth(6)
date.setDate(1)

// Formated output
date.toString() // چهارشنبه ۱ مهر ۱۳۷۱ ساعت ۰۰:۰۰:۰۰
date.toISOString() // 1992-09-22T20:30:00.000Z
```

### Difference with native Date?
`IDate` is instance of native `Date`. All methods acting just like native one, so you can sending `IDate` by ajax libs to server or `JSON.stringify` it, and anything works well. it will automatically converts to ISO.