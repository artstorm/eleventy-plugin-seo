import test from "ava";
import BaseTag from "../src/BaseTag";

test("Should have an object that can call render and parse", t => {
  const tag = new BaseTag();
  const object = tag.getObject();
  object.parse();
  object.render();

  t.pass();
});
