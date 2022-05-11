import { expect, test } from "vitest";
import Translator from "../src/translator";

const strings = {
  hello: "world",
  helloName: "hello :name",
  count: "There are :count apples",
  apples: "{0} There are none|[1,19] There are some|[20,*] There are many",
  applesWithData:
    "{0} There are none :count :name|[1,19] There are some :count :name|[20,*] There are many :count :name",
};

const translator = Translator(strings);

test("basic translation", () => {
  expect(translator.__("hello")).to.equal("world");
});

test("translation with params", () => {
  expect(translator.__("helloName", { name: "test" })).to.equal("hello test");
});

test("translation with count", () => {
  expect(translator.__("count", 5)).to.equal("There are 5 apples");
});

test("translation with multiple counts", () => {
  expect(translator.__("apples", 0)).to.equal("There are none");
  expect(translator.__("apples", 15)).to.equal("There are some");
  expect(translator.__("apples", 23)).to.equal("There are many");
});

test("translation with multiple counts and custom data", () => {
  expect(translator.__("applesWithData", 0, { name: "test" })).to.equal(
    "There are none 0 test"
  );
  expect(translator.__("applesWithData", 15, { name: "test" })).to.equal(
    "There are some 15 test"
  );
  expect(translator.__("applesWithData", 23, { name: "test" })).to.equal(
    "There are many 23 test"
  );
});
