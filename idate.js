'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const DateLib = require('./common/date')
const hijriDateConvertor = require('./date-convertors/hijri')
const jalaliDateConvertor = require('./date-convertors/jalali')

const JalaliDate = DateLib(jalaliDateConvertor)
const HijriDate = DateLib(hijriDateConvertor)

exports.HijriDate = HijriDate
exports.JalaliDate = JalaliDate
