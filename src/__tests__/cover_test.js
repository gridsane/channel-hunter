jest.dontMock("../components/cover");

describe("Cover", function () {
  var React = require("react/addons");
  var Cover = require("../components/cover");
  var TestUtils = React.addons.TestUtils;

  var cover = TestUtils.renderIntoDocument(<Cover />);
  var image = TestUtils.findRenderedDOMComponentWithClass(cover, "cover-image");

  it("render children", function () {
    cover.setProps({children: "inner children"});
    expect(cover.getDOMNode().textContent).toBe("inner children");
  });

  it("not set backgroundImage, if cover is not defined", function () {
    cover.setProps({cover: null});
    expect(image.getDOMNode().style.backgroundImage).toBe("");
  });

  it("set backgroundImage, if cover is defined", function () {
    cover.setProps({cover: 'cover.jpg'});
    expect(image.getDOMNode().style.backgroundImage).toBe("url(cover.jpg)");
  });

  it("not set width, if width is not defined", function () {
    cover.setProps({width: null});
    expect(cover.getDOMNode().style.width).toBe("");
  });

  it("set width, if width is defined", function () {
    cover.setProps({width: 1000});
    expect(cover.getDOMNode().style.width).toBe("1000px");
  });
});
