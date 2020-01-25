import test from "ava";
import BaseTag from "../../src/Tags/BaseTag";

test("Should have an object that can call render and parse", t => {
  const tag = new BaseTag();
  const object = tag.getLiquidTag();
  object.parse();
  object.render();

  t.pass();
});
