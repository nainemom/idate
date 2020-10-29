const assert = require('assert')
const IDate = require('../dist/idate.js')

describe('IDate', () => {
  it('should support date object as argument', () => {
    // We should use month index when we use new Date in this format. So we should minus 1 from month
    const ndate = new Date(1992, 8 - 1, 27)
    const date = new IDate(ndate)
    assert.equal(date.getFullYear(), 1371)
    assert.equal(date.getMonth(), 6)
    assert.equal(date.getDate(), 5)
  })
  it('should support idate object as argument', () => {
    const idate = new IDate(1371, 6, 5)
    const date = new IDate(idate)
    assert.equal(date.getFullYear(), 1371)
    assert.equal(date.getMonth(), 6)
    assert.equal(date.getDate(), 5)
  })
  it('should truly convert date', () => {
    const date = new IDate(1371, 6, 5)
    assert.equal(date.gdate.getFullYear(), 1992)
    // getMonth function returns month index. So we should add 1 to month
    assert.equal(date.gdate.getMonth() + 1, 8)
    assert.equal(date.gdate.getDate(), 27)
  })
  describe('#getDate', () => {
    it('should act like native js Date on 0', () => {
      const faDate = new IDate(1397, 0, 0)
      assert.equal(faDate.getMonth(), 11)
      assert.equal(faDate.getDate(), 29)
    })
  })
  describe('#setDate', () => {
    it('should act like native js Date on + (kabise)', () => {
      const enDate = new Date(1553470566470)
      // We should use gregorian type of IDate for setDate from now.
      const faDate = new IDate(1553470566470).gdate
      enDate.setDate(enDate.getDate() + 2536)
      faDate.setDate(faDate.getDate() + 2536)
      assert.equal(enDate.toISOString(), faDate.toISOString())
    })
    it('should act like native js Date on + (not-kabise)', () => {
      const enDate = new Date(1534030492804)
      const faDate = new IDate(1534030492804).gdate
      enDate.setDate(enDate.getDate() + 2536)
      faDate.setDate(faDate.getDate() + 2536)
      assert.equal(enDate.toISOString(), faDate.toISOString())
    })
    it('should act like native js Date on - (kabise)', () => {
      const enDate = new Date(1553470566470)
      const faDate = new IDate(1553470566470).gdate
      enDate.setDate(enDate.getDate() - 1231)
      faDate.setDate(faDate.getDate() - 1231)
      assert.equal(enDate.toISOString(), faDate.toISOString())
    })
    it('should act like native js Date on - (not-kabise)', () => {
      const enDate = new Date(1534030492804)
      const faDate = new IDate(1534030492804).gdate
      enDate.setDate(enDate.getDate() - 1231)
      faDate.setDate(faDate.getDate() - 1231)
      assert.equal(enDate.toISOString(), faDate.toISOString())
    })
  })
})
