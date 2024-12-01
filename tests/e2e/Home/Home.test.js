import { Selector } from "testcafe";

fixture`Home`.page`http://localhost:5173/`;

test("Display Home page", async (t) => {
  const homeText = Selector("div");
  await t.expect(homeText.exists).ok();
});
