import { Translator } from "./translator";

const demoStrings = {
  welcome: {
    message: "Welcome :name",
  },
  apples: "{0} There are none|[1,19] There are some|[20,*] There are many",
  applesWithData:
    "{0} There are none :count :name|[1,19] There are some :count :name|[20,*] There are many :count :name",
};

// Create instance with locale texts
const translator = Translator(demoStrings);

const json = `Data: \n` + JSON.stringify(demoStrings, null, 2);

// Do translations
const text1 =
  `translator.__("welcome.message", { name: "Carlos" }) = ` +
  translator.__("welcome.message", { name: "Carlos" });

const text2 = `translator.__("apples", 0) = ` + translator.__("apples", 0);

const text3 = `translator.__("apples", 8) = ` + translator.__("apples", 8);

const text4 = `translator.__("apples", 52) = ` + translator.__("apples", 52);

const text5 =
  `translator.__("applesWithData", 0, { name: "Carlos" }) = ` +
  translator.__("applesWithData", 0, { name: "Carlos" });

const text6 =
  `translator.__("applesWithData", 8, { name: "Carlos" }) = ` +
  translator.__("applesWithData", 8, { name: "Carlos" });

const text7 =
  `translator.__("applesWithData", 52, { name: "Carlos" }) = ` +
  translator.__("applesWithData", 52, { name: "Carlos" });

document.body.appendChild(createPreTag(json));
document.body.appendChild(createPTag(text1));
document.body.appendChild(createPTag(text2));
document.body.appendChild(createPTag(text3));
document.body.appendChild(createPTag(text4));
document.body.appendChild(createPTag(text5));
document.body.appendChild(createPTag(text6));
document.body.appendChild(createPTag(text7));

// Insert texts in the page for the demo
function createPTag(text) {
  const p = document.createElement("p");
  p.textContent = text;
  return p;
}

// Insert pre
function createPreTag(text) {
  const c = document.createElement("pre");
  c.textContent = text;
  return c;
}
