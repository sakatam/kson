(function(exports) {
  var stringify = function (object) {
    var type = typeof object

    if (object === null || type === "undefined") {
      return "null"
    }

    // NaN & Infinity
    if (type === "number" && (isNaN(object) || !isFinite(object))) {
      return "null"
    }

    if (type === "boolean") {
      return object ? "true" : "false"
    }

    if (type == "number") {
      return object.toString()
    }

    if (type == "string") {
      return '"' + object + '"'
    }

    if (Array.isArray(object)) {
      var arr = []
      for (var i = 0; i < object.length; i++) {
        arr.push(stringify(object[i]))
      }
      return "[" + arr.join(",") + "]"
    }

    if (type === "object") {
      var arr = []
      for (var key in object) {
        if (object.hasOwnProperty(key)) {
          arr.push('"' + key.toString() + '"' + ":" + stringify(object[key]))
        }
      }
      return "{" + arr.join(",") + "}"
    }

    throw new TypeError("Unable to serialize: " + object.toString())
  }


  var rx_one = /^[\],:{}\s]*$/,
      rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
      rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
      rx_four = /(?:^|:|,)(?:\s*\[)+/g

  var parse = function(text) {
    text = String(text);

    if (
      rx_one.test(
        text
        .replace(rx_two, '@')
        .replace(rx_three, ']')
        .replace(rx_four, '')
      )
    ) {
      return eval("(" + text + ")")
    }
    throw new SyntaxError("Malformed JSON string: " + text)
  }

  exports.stringify = stringify
  exports.parse = parse
})(
  (typeof exports !== "undefined")
  ? exports
  : window.KSON || (window.KSON = {})
)
