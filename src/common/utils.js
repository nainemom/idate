export function dateInstanceCreator (toGregorian, fixDate, ...args) {
  if (args.length === 0) {
    return new Date()
  } else if (args.length === 1) {
    return new Date(args[0] instanceof Date ? args[0].getTime() : args[0])
  }

  const fixedParams = [0, 0, 1].map((defaultValue, index) => {
    return typeof args[index] === 'undefined' ? defaultValue : args[index]
  })
  const fixed = fixDate(...fixedParams)
  const converted = toGregorian(fixed[0], fixed[1], fixed[2])
  const params = [
    converted[0],
    converted[1],
    converted[2],
    args[3] || 0,
    args[4] || 0,
    args[5] || 0,
    args[6] || 0
  ]
  return new Date(...params)
}

export function fromDateInstance (dateInstance, fromGregorian) {
  return fromGregorian(dateInstance.getFullYear(), dateInstance.getMonth(), dateInstance.getDate())
}

export function updateDateInstance (dateInstance, y, m, d) {
  dateInstance.setFullYear(y)
  dateInstance.setMonth(m)
  dateInstance.setDate(d)
}

export const getterMethods = [
  'getHours',
  'getMilliseconds',
  'getMinutes',
  'getSeconds',
  'getTime',
  'getTimezoneOffset',
  'getUTCDate',
  'getUTCDay',
  'getUTCFullYear',
  'getUTCHours',
  'getUTCMilliseconds',
  'getUTCMinutes',
  'getUTCMonth',
  'getUTCSeconds',
  'toISOString',
  'toJSON',
  'toLocaleDateString',
  'toLocaleTimeString',
  'toLocaleString',
  'toTimeString',
  'toUTCString',
  'UTC',
  'valueOf'
]
export const setterMethods = [
  'setHours',
  'setMilliseconds',
  'setMinutes',
  'setSeconds',
  'setTime',
  'setUTCDate',
  'setUTCFullYear',
  'setUTCHours',
  'setUTCMilliseconds',
  'setUTCMinutes',
  'setUTCMonth',
  'setUTCSeconds'
]

// orders is important. parent will use the index of methods
export const overridingSetterMethods = [
  'setFullYear',
  'setMonth',
  'setDate'
]

export const overridingGetterMethods = [
  'getFullYear',
  'getMonth',
  'getDate'
]
