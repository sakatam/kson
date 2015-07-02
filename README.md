# kson
Flyweight JSON serializer & parser.

# usage

```bash
npm install --save kson
```

```js
var KSON = require("KSON")
KSON.stringify({name: "KSON", authors: ["sakatam", "kaizen"]})
// --> '{"name":"KSON","authors":["sakatam","kaizen"]}'
KSON.parse('{"name": "KSON"}')
```

# License

MIT
