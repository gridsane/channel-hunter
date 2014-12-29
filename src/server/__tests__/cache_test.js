jest.dontMock("../cache");

describe("Cache", function () {
  var Cache = require("../cache");
  var cache;

  beforeEach(function () {
    cache = new Cache();
  });

  it("caches items", function () {
    cache.set("foo", "bar", 50 / 1000);
    expect(cache.get("foo")).toBe("bar");
  });

  it("caches items without due date", function () {
    cache.set("foo", "bar");
    expect(cache.get("foo")).toBe("bar");
  });

  it("releases cached items", function () {
    cache.set("foo", "bar", 50 / 1000);

    waits(60);

    runs(function () {
      expect(cache.get("foo")).toBeNull();
    });
  });

  it("unsets cache items", function () {
    cache.set("foo", "bar");
    cache.unset("foo");

    expect(cache.get("foo")).toBeNull();
  });
});
