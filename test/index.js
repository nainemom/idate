const assert = require('assert')
const IDate = require('../dist/jalali.js')

describe('IDate', () => {
  it('should support date object as argument', () => {
    const ndate = new Date(1992, 8, 27)
    const date = new IDate(ndate)
    assert.strictEqual(date.getFullYear(), 1371)
    assert.strictEqual(date.getMonth(), 6)
    assert.strictEqual(date.getDate(), 5)
  })
  it('should support idate object as argument', () => {
    const idate = new IDate(1371, 6, 5)
    const date = new IDate(idate)
    assert.strictEqual(date.getFullYear(), 1371)
    assert.strictEqual(date.getMonth(), 6)
    assert.strictEqual(date.getDate(), 5)
  })
  it('should truly convert date', () => {
    const date = new IDate(1371, 6, 5)
    assert.strictEqual(date.gdate.getFullYear(), 1992)
    assert.strictEqual(date.gdate.getMonth(), 8)
    assert.strictEqual(date.gdate.getDate(), 27)
  })
  describe('#getDate', () => {
    it('should act like native js Date on 0', () => {
      const faDate = new IDate(1397, 0, 0)
      assert.strictEqual(faDate.getMonth(), 11)
      assert.strictEqual(faDate.getDate(), 29)
    })
  })
  describe('#setDate', () => {
    it('should act like native js Date on + (kabise)', () => {
      const enDate = new Date(1553470566470)
      const faDate = new IDate(1553470566470)
      enDate.setDate(enDate.getDate() + 2536)
      faDate.setDate(faDate.getDate() + 2536)
      assert.strictEqual(enDate.toISOString(), faDate.toISOString())
    })
    it('should act like native js Date on + (not-kabise)', () => {
      const enDate = new Date(1534030492804)
      const faDate = new IDate(1534030492804)
      enDate.setDate(enDate.getDate() + 2536)
      faDate.setDate(faDate.getDate() + 2536)
      assert.strictEqual(enDate.toISOString(), faDate.toISOString())
    })
    it('should act like native js Date on - (kabise)', () => {
      const enDate = new Date(1553470566470)
      const faDate = new IDate(1553470566470)
      enDate.setDate(enDate.getDate() - 1231)
      faDate.setDate(faDate.getDate() - 1231)
      assert.strictEqual(enDate.toISOString(), faDate.toISOString())
    })
    it('should act like native js Date on - (not-kabise)', () => {
      const enDate = new Date(1534030492804)
      const faDate = new IDate(1534030492804)
      enDate.setDate(enDate.getDate() - 1231)
      faDate.setDate(faDate.getDate() - 1231)
      assert.strictEqual(enDate.toISOString(), faDate.toISOString())
    })
  })
})
