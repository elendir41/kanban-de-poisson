fixture`Login page`.page`http://localhost:5173/login`;

test("Display Login page", async (t) => {
  const loginText = Selector("h1");
  await t.expect(loginText.exists).ok();
});
