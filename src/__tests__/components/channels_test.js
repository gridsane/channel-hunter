jest.setMock("superagent", {});
jest.dontMock("q");
jest.dontMock("../../components/channels");
jest.dontMock("../../components/channels_item");
jest.dontMock("lodash");

var apiClient = require("../../utils/api_client");

describe("Channels", function () {
  var React = require("react/addons");

  var Channels = require("../../components/channels");
  var TestUtils = React.addons.TestUtils;
  var channels = TestUtils.renderIntoDocument(
    <Channels channelsUrls={[]} width={100} />
  );

  afterEach(function () {
    channels = TestUtils.renderIntoDocument(
      <Channels channelsUrls={[]} width={100} />
    );
  });

  it("adds channels_item when channels urls changes", function () {
    mockApiClient({channel_url: {id: 1, name: "Sample channel"}});
    channels.setProps({channelsUrls: ["channel_url"]});

    waitsFor(function () {
      return channels.refs.menuItems.getDOMNode().children.length > 0;
    }, "channels items should render", 100);

    runs(function () {
      var channelsItem = TestUtils.findRenderedDOMComponentWithClass(channels, "channels-item");
      expect(apiClient.getChannel.mock.calls.length).toBe(1);
      expect(channelsItem.getDOMNode().textContent).toContain("Sample channel");
    });
  });

  it("requests only new channels", function () {
    mockApiClient({
      ch1: {id: 1, name: "One"},
      ch2: {id: 2, name: "Two"}
    });

    channels.setProps({channelsUrls: ["ch1"]});
    channels.setProps({channelsUrls: ["ch1", "ch2"]});

    expect(apiClient.getChannel.mock.calls).toEqual([["ch1"], ["ch2"]]);

    waitsFor(function () {
      return channels.refs.channel2;
    }, "channel with id 2 rendered", 100);

    runs(function () {
      expect(channels.refs.channel1).toBeDefined();
      expect(channels.refs.channel2).toBeDefined();
    });
  });

  it("not shows removed channels", function () {
    mockApiClient({
      ch1: {id: 1, name: "One"},
      ch2: {id: 2, name: "Two"}
    });

    channels.setProps({channelsUrls: ["ch1"]});
    channels.setProps({channelsUrls: ["ch2"]});

    waitsFor(function () {
      return channels.refs.channel2;
    }, "channel with id 2 rendered", 100);

    runs(function () {
      expect(channels.refs.channel1).toBeUndefined();
      expect(channels.refs.channel2).toBeDefined();
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
