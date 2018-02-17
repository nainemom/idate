const assert = require('assert')
const IDate = require('../dist/idate.js')

describe('IDate', () => {
  it('should support date object as argument', () => {
    const ndate = new Date(1992, 8, 27)
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
    assert.equal(date.gdate.getMonth(), 8)
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
    it('should act like native js Date on +', () => {
      const enDate = new Date()
      const faDate = new IDate()
      enDate.setDate(enDate.getDate() + 2536)
      faDate.setDate(faDate.getDate() + 2536)
      assert.equal(enDate.toISOString(), faDate.toISOString())
    })
    it('should act like native js Date on -', () => {
      const enDate = new Date()
      const faDate = new IDate()
      enDate.setDate(enDate.getDate() - 1231)
      faDate.setDate(faDate.getDate() - 1231)
      assert.equal(enDate.toISOString(), faDate.toISOString())
    })
  })
})
