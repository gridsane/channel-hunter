jest.dontMock("../components/track");

describe("Track", function () {
  var React = require("react/addons");
  var Track = require("../components/track");
  var TestUtils = React.addons.TestUtils;

  var track = TestUtils.renderIntoDocument(<Track />);

  it("render title", function () {
    track.setProps({title: "test title"});
    expect(track.getDOMNode().textContent).toContain("test title");
  });

  it("render artist", function () {
    track.setProps({artist: "test artist"});
    expect(track.getDOMNode().textContent).toContain("test artist");
  });
});
