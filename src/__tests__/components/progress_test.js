jest.dontMock("../../components/progress");

describe("Progress", function () {
  var nodeOffset = require("../../utils/node_offset");
  var React = require("react/addons");
  var Progress = require("../../components/progress");
  var TestUtils = React.addons.TestUtils;
  var progress = TestUtils.renderIntoDocument(<Progress max="100" value="0" />);
  var valueComponent = TestUtils.findRenderedDOMComponentWithClass(progress, "progress-value");

  afterEach(function () {
    nodeOffset.mockClear();
  });

  it("sets width on value change", function () {
    progress.setProps({value: 78});
    expect(valueComponent.getDOMNode().style.width).toBe("78%");
  });

  it("sets percents according to the `max`", function () {
    progress.setProps({max: 500, value: 250});
    expect(valueComponent.getDOMNode().style.width).toBe("50%");
  });

  it("calls onSeek with value on click", function () {
    nodeOffset.mockReturnValue({left: 0, top: 0});

    var onSeekMock = jest.genMockFunction();

    progress.getDOMNode().offsetWidth = 100;
    progress.setProps({max: 200, value: 0, onSeek: onSeekMock});

    React.addons.TestUtils.Simulate.click(progress.getDOMNode(), {
      clientX: 50
    });

    expect(onSeekMock.mock.calls).toEqual([[100]]);
  });

});
