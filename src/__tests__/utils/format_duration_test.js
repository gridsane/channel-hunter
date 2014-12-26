jest.dontMock("../../utils/format_duration");

describe("Format duration", function () {
  var formatDuration = require("../../utils/format_duration");

  it("pads minutes and seconds", function () {
    expect(formatDuration(350)).toBe("05:50");
  });

  it("floors minutes", function () {
    expect(formatDuration(359.99)).toBe("05:59");
  });

  it("rounds minutes to hours", function () {
    expect(formatDuration(366 * 60)).toBe("6h");
  });
});
