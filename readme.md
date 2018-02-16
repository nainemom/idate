# IDate

> Iranian Date constractor for Javascript, Just like native js Date.

## Installation

Install via NPM/Yarn:

```
npm install idate
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

For initializing `IDate` you may either pass parameteres of Jalali date to it just like native Date. Other type of params like `Date` object or `ISOString` also supported.

```javascript
const date = new IDate() // => default to today
const date2 = new IDate(1396, 6, 5)
const date3 = new IDate(new Date(2017, 8, 27))
```

### API
```javascript
const date = new IDate(1396, 6, 5)
// Getters
jdate.getFullYear() // 1396
jdate.getMonth() // 6 (indexed from zero, so 6 is mehr)
jdate.getDate() // 5 (day in month)
jdate.getDay() // 1 (day of week started from saturday and indexed from zero)

// Setters
jdate.setFullYear(1394)
jdate.setMonth(6)
jdate.setDate(12)

// Formated output
jdate.toString() // exp: Chaharshanbe 5 Mehr 1396 00:00:00
jdate.toISOString() // exp: 2017-09-26T20:30:00.000Z (so you can sending IDate by ajax libs or stringify it, and anything works wekk. it will automatically converts to ISO)
```
