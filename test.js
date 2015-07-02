var assert = require("assert")
var KSON = require("./")

console.log("testing stringify")

// null/undefined
assert.equal(KSON.stringify(null), "null")
assert.equal(KSON.stringify(undefined), "null")
assert.equal(KSON.stringify(NaN), "null")
assert.equal(KSON.stringify(Infinity), "null")

// boolean
assert.equal(KSON.stringify(true), "true")
assert.equal(KSON.stringify(false), "false")

// string
assert.equal(KSON.stringify("abc"), '"abc"')
assert.equal(KSON.stringify("123"), '"123"')
assert.equal(KSON.stringify("あいう"), '"あいう"')

// number
assert.equal(KSON.stringify(0), "0")
assert.equal(KSON.stringify(123), "123")
assert.equal(KSON.stringify(123.5), "123.5")
assert.equal(KSON.stringify(-123.5), "-123.5")
// scientific notion
assert.equal(KSON.stringify(1.2e+40), "1.2e+40")
assert.equal(KSON.stringify(1.2E+40), "1.2e+40")
assert.equal(KSON.stringify(1.2e40), "1.2e+40")
assert.equal(KSON.stringify(1.2e-40), "1.2e-40")

// array
assert.equal(KSON.stringify([]), "[]")
assert.equal(KSON.stringify([1,2,3]), "[1,2,3]")
assert.equal(KSON.stringify(["a","b","c"]), '["a","b","c"]')
assert.equal(KSON.stringify([1,"b"]), '[1,"b"]')
assert.equal(KSON.stringify([[1,2],[3,4]]), '[[1,2],[3,4]]')

// object
// empty
assert.equal(KSON.stringify({}), "{}")
// single key
assert.equal(KSON.stringify({abc: "def"})         , '{"abc":"def"}')
assert.equal(KSON.stringify({"abc": "def"})       , '{"abc":"def"}')
assert.equal(KSON.stringify({abc: 123.5})         , '{"abc":123.5}')
assert.equal(KSON.stringify({abc: {}})            , '{"abc":{}}')
assert.equal(KSON.stringify({abc: {def: "ghi"}})  , '{"abc":{"def":"ghi"}}')
assert.equal(KSON.stringify({abc: [1,2,3]})       , '{"abc":[1,2,3]}')
assert.equal(KSON.stringify({1: "abc"})           , '{"1":"abc"}')
assert.equal(KSON.stringify({"1": "abc"})         , '{"1":"abc"}')
// multiple keys
assert.equal(KSON.stringify({a: "aa", b: 123}), '{"a":"aa","b":123}')

// invalid param
assert.throws(function() { KSON.stringify(function() {}) }, TypeError)
assert.throws(function() { KSON.stringify([function() {}]) }, TypeError)


console.log("testing pares")

// null
assert.equal(KSON.parse("null"), null)

// boolean
assert.equal(KSON.parse("true"), true)
assert.equal(KSON.parse("false"), false)

// string
assert.equal(KSON.parse('"abc"'), "abc")
assert.equal(KSON.parse('"123"'), "123")
assert.equal(KSON.parse('"あいう"'), "あいう")

// number
assert.equal(KSON.parse("0"), 0)
assert.equal(KSON.parse("123"), 123)
assert.equal(KSON.parse("123.5"), 123.5)
assert.equal(KSON.parse("-123.5"), -123.5)
assert.equal(KSON.parse("1.2e+40"), 1.2e+40)
assert.equal(KSON.parse("1.2E+40"), 1.2e+40)
assert.equal(KSON.parse("1.2e40"), 1.2e+40)
assert.equal(KSON.parse("1.2e-40"), 1.2e-40)

// array
assert.deepEqual(KSON.parse("[]"), [])
assert.deepEqual(KSON.parse("[1,2,3]"), [1,2,3])
assert.deepEqual(KSON.parse('["a","b","c"]'), ["a","b","c"])
assert.deepEqual(KSON.parse('[1,"b"]'), [1,"b"])
assert.deepEqual(KSON.parse('[[1,2],[3,4]]'), [[1,2],[3,4]])

// object
// empty
assert.deepEqual(KSON.parse("{}"), {})
// single key
assert.deepEqual(KSON.parse('{"abc":"def"}'), {abc: "def"})
assert.deepEqual(KSON.parse('{"abc":"def"}'), {"abc": "def"})
assert.deepEqual(KSON.parse('{"abc":123.5}'), {abc: 123.5})
assert.deepEqual(KSON.parse('{"abc":{}}'), {abc: {}})
assert.deepEqual(KSON.parse('{"abc":{"def":"ghi"}}'), {abc: {def: "ghi"}})
assert.deepEqual(KSON.parse('{"abc":[1,2,3]}'), {abc: [1,2,3]})
assert.deepEqual(KSON.parse('{"1":"abc"}'), {1: "abc"})
assert.deepEqual(KSON.parse('{"1":"abc"}'), {"1": "abc"})
// multiple keys
assert.deepEqual(KSON.parse('{"a":"aa","b":123}'), {a: "aa", b: 123})

// malformed JSON string
assert.throws(function(){ KSON.parse('{1}') }, SyntaxError)
assert.throws(function(){ KSON.parse('window = {}') }, SyntaxError)
