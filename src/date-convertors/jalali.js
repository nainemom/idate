// https://stackoverflow.com/a/58057203
function fromGregorian (gy, gmf, gd) {
  var gm = gmf + 1
  var gDM = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  var jy = (gy <= 1600) ? 0 : 979
  gy -= (gy <= 1600) ? 621 : 1600
  var gy2 = (gm > 2) ? (gy + 1) : gy
  var days = (365 * gy) + (parseInt((gy2 + 3) / 4)) - (parseInt((gy2 + 99) / 100)) +
            (parseInt((gy2 + 399) / 400)) - 80 + gd + gDM[gm - 1]
  jy += 33 * (parseInt(days / 12053))
  days %= 12053
  jy += 4 * (parseInt(days / 1461))
  days %= 1461
  jy += parseInt((days - 1) / 365)
  if (days > 365)days = (days - 1) % 365
  var jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30)
  var jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30))
  return [jy, jm - 1, jd]
}
function toGregorian (jy, jmf, jd) {
  var jm = jmf + 1
  var gy = (jy <= 979) ? 621 : 1600
  jy -= (jy <= 979) ? 0 : 979
  var days = (365 * jy) + ((parseInt(jy / 33)) * 8) + (parseInt(((jy % 33) + 3) / 4)) +
            78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186)
  gy += 400 * (parseInt(days / 146097))
  days %= 146097
  if (days > 36524) {
    gy += 100 * (parseInt(--days / 36524))
    days %= 36524
    if (days >= 365)days++
  }
  gy += 4 * (parseInt((days) / 1461))
  days %= 1461
  gy += parseInt((days - 1) / 365)
  if (days > 365)days = (days - 1) % 365
  var gd = days + 1
  var salA = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  var gm
  for (gm = 0; gm < 13; gm++) {
    var v = salA[gm]
    if (gd <= v) break
    gd -= v
  }
  return [gy, gm - 1, gd]
}

function monthLength (y, m) {
  let d = 28 // all months minimum has 28 days
  do {
    const g = toGregorian(y, m, d)
    const h = fromGregorian(g[0], g[1], g[2])
    if (h[0] !== y || h[1] !== m) {
      return d - 1
    }
    d++
  } while (true)
}

function fixDate (y, m, d) {
  while (m > 11) {
    y += 1
    m -= 12
  }
  while (m < 0) {
    y -= 1
    m += 12
  }

  while (d > monthLength(y, m)) {
    d -= monthLength(y, m)
    m = m < 11 ? m + 1 : 0
    y = m === 0 ? y + 1 : y
  }
  while (d <= 0) {
    m = m > 0 ? m - 1 : 11
    y = m === 11 ? y - 1 : y
    d += monthLength(y, m)
  }
  return [y, m, d]
}

const monthNames = ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand']
const weekDayNames = ['Shanbe', 'Yekshanbe', 'Doshanbe', 'Seshanbe', 'Chaharshanbe', 'Panjshanbe', 'Jom\'e']
const startOfWeekOffset = 1

export default {
  fromGregorian,
  toGregorian,
  monthLength,
  fixDate,
  monthNames,
  weekDayNames,
  startOfWeekOffset
}
