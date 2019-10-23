const assert = require('assert')
const JalaliDate = require('../dist/jalali.js')
const HijriDate = require('../dist/hijri.js')

describe('Dates', () => {
  describe('should support date object as argument and truly convert', () => {
    const baseDate = new Date(1992, 8, 27)
    const list = [
      ['JalaliDate', JalaliDate, [1371, 6, 5]],
      ['HijriDate', HijriDate, [1413, 2, 29]]
    ]
    list.forEach(i => {
      it(i[0], () => {
        const date = new i[1](baseDate)
        assert.strictEqual(date.getFullYear(), i[2][0])
        assert.strictEqual(date.getMonth(), i[2][1])
        assert.strictEqual(date.getDate(), i[2][2])
      })
    })
  })

  describe('should act like native js Date on setDate ', () => {
    const baseTS = 1553470566470
    const ofsetDays = 4 // 2536
    const list = [
      ['JalaliDate', JalaliDate],
      ['HijriDate', HijriDate]
    ]
    list.forEach(i => {
      it(i[0], () => {
        const baseDate = new Date(baseTS)
        const date = new i[1](baseTS)
        baseDate.setDate(baseDate.getDate() + ofsetDays)
        date.setDate(date.getDate() + ofsetDays)
        console.warn(baseDate.toISOString(), date.toISOString())
        assert.strictEqual(baseDate.toISOString(), date.toISOString())
      })
    })
  })

  // describe('should support other Date class instance as argument', () => {
  //   const list = [
  //     ['Date', Date, [1992, 8, 27]],
  //     ['JalaliDate', JalaliDate],
  //     ['HijriDate', HijriDate]
  //   ]
  //   list.forEach(i => {
  //     list.forEach(j => {
  //       if (j[0] === 'Date') {
  //         return
  //       }
  //       it(`${i[0]} to ${j[0]}`, () => {
  //         const baseDate = new i[1]()
  //         const checkDate = new j[1](baseDate)
  //         assert.strictEqual(baseDate.getTime(), checkDate.getTime())
  //       })
  //     })
  //   })
  // })

  // // it('should support JalaliDate object as argument', () => {
  // //   const jdate = new JalaliDate(1371, 6, 5)
  // //   const date = new JalaliDate(jdate)
  // //   assert.strictEqual(date.getFullYear(), 1371)
  // //   assert.strictEqual(date.getMonth(), 6)
  // //   assert.strictEqual(date.getDate(), 5)
  // // })
  // it('should truly convert date', () => {
  //   const date = new JalaliDate(1371, 6, 5)
  //   assert.strictEqual(date.di.getFullYear(), 1992)
  //   assert.strictEqual(date.di.getMonth(), 8)
  //   assert.strictEqual(date.di.getDate(), 27)
  // })
  // describe('#getDate', () => {
  //   it('should act like native js Date on 0', () => {
  //     const faDate = new JalaliDate(1397, 0, 0)
  //     assert.strictEqual(faDate.getMonth(), 11)
  //     assert.strictEqual(faDate.getDate(), 29)
  //   })
  // })
  // describe('#setDate', () => {
  //   it('should act like native js Date on + (kabise)', () => {
  //     const enDate = new Date(1553470566470)
  //     const faDate = new JalaliDate(1553470566470)
  //     enDate.setDate(enDate.getDate() + 2536)
  //     faDate.setDate(faDate.getDate() + 2536)
  //     assert.strictEqual(enDate.toISOString(), faDate.toISOString())
  //   })
  //   it('should act like native js Date on + (not-kabise)', () => {
  //     const enDate = new Date(1534030492804)
  //     const faDate = new JalaliDate(1534030492804)
  //     enDate.setDate(enDate.getDate() + 2536)
  //     faDate.setDate(faDate.getDate() + 2536)
  //     assert.strictEqual(enDate.toISOString(), faDate.toISOString())
  //   })
  //   it('should act like native js Date on - (kabise)', () => {
  //     const enDate = new Date(1553470566470)
  //     const faDate = new JalaliDate(1553470566470)
  //     enDate.setDate(enDate.getDate() - 1231)
  //     faDate.setDate(faDate.getDate() - 1231)
  //     assert.strictEqual(enDate.toISOString(), faDate.toISOString())
  //   })
  //   it('should act like native js Date on - (not-kabise)', () => {
  //     const enDate = new Date(1534030492804)
  //     const faDate = new JalaliDate(1534030492804)
  //     enDate.setDate(enDate.getDate() - 1231)
  //     faDate.setDate(faDate.getDate() - 1231)
  //     assert.strictEqual(enDate.toISOString(), faDate.toISOString())
  //   })
  // })
})
