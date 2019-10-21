import test from "ava";
import Config from "../src/Config";

test("Config gets default values", t => {
  const config = new Config();

  t.is("", config.get().url);
});
