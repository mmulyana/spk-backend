function hasData(arr) {
  return arr.some((subarray) => subarray.length > 0)
}

module.exports = { hasData }
