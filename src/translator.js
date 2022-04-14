import get from "lodash.get";
import isInteger from "lodash.isinteger";
import isObject from "lodash.isobject";

export default function Translator(_strings) {
  let strings = _strings;

  return {
    __(key, data, count) {
      // Switch arguments for pluralization with count and placeholder attributes
      if (isInteger(data)) {
        const c = data;
        data = count;
        count = c;
      }

      // Get text, supports deep path like messages.apples
      let text = get(strings, key, key);

      if (isObject(data)) {
        // Replace placeholder attributes matching from data object
        Object.keys(data).forEach((property) => {
          text = text.replaceAll(`:${property}`, data[property]);
        });
      }

      // Pluralization
      // This implementation is not the full laravel implementation
      // TODO: support full implementation as described here:
      // https://github.com/laravel/framework/blob/9.x/src/Illuminate/Translation/MessageSelector.php
      if (isInteger(count)) {
        // Built-in :count placeholder
        text = text.replaceAll(":count", count);
        const parts = text.split("|");
        parts.forEach((part, i) => {
          let range = "";

          // {0} There are none (it also supports specific count numbers like {1} or {2})
          if (i === 0) {
            const rx = new RegExp(`\\{${count}\\}`);
            let match = part.match(rx);

            if (match && match[0]) {
              console.log("matched");
              text = part.replace(rx, "").trim();
            }

            // [1,19] There are some
          } else if (i === 1) {
            const rx = /\[(\d+),(\d+)]/;
            let match = parts[1].match(rx);
            range =
              match && match[1] && match[2]
                ? [Number(match[1]), Number(match[2])]
                : 0;
            if (count >= range[0] && count <= range[1]) {
              text = part.replace(rx, "").trim();
            }

            // [20,*] There are manye
          } else {
            const rx = /\[(\d+),(\d+|\*)]/;
            let match = parts[2].match(rx);
            let min = 0;
            let max = 0;

            if (match && match[1] && match[2]) {
              min = Number(match[1]);
              max = Number(match[2].replace("*", "Infinity"));
            }

            range = [min, max];

            if (count >= range[0] && count <= range[1]) {
              text = part.replace(rx, "").trim();
            }
          }
        });
      }

      return text;
    },
  };
}
