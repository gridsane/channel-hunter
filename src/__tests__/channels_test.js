jest.setMock("superagent", {});
jest.dontMock("q");
jest.dontMock("../components/channels");
jest.dontMock("../components/channels_item");

var apiClient = require("../utils/api_client");

describe("Channels", function () {
  var React = require("react/addons");

  var Channels = require("../components/channels");
  var TestUtils = React.addons.TestUtils;

  var channels = TestUtils.renderIntoDocument(
    <Channels channelsUrls={[]} width={100} onUpdate={function(){}} />
  );

  it("adds channels_item when channels urls changes", function () {
    runs(function () {
      mockApiClient({channel_url: {id: 1, name: "Sample channel"}});
      channels.setProps({channelsUrls: ["channel_url"]});
    });

    waitsFor(function () {
      return channels.refs.menuItems.getDOMNode().children.length > 0;
    }, "channels items should render", 100);

    runs(function () {
      var channelsItem = TestUtils.findRenderedDOMComponentWithClass(channels, "channels-item");
      expect(apiClient.getChannel.mock.calls.length).toBe(1);
      expect(channelsItem.getDOMNode().textContent).toContain("Sample channel");
    });
  });
});

var mockApiClient = function (channelsToReturn) {
  var Q = require("q");
  apiClient.getChannel.mockClear();
  apiClient.getChannel.mockImpl(function (channelUrl) {
    return Q.fcall(function () {
      return channelsToReturn[channelUrl];
    });
  });
};
