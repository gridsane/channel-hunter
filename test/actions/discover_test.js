import * as api from '../../src/api/browser';
import * as actions from '../../src/actions/discover';

describe('Discover actions @now', () => {

  it('searches channels', (done) => {
    const dispatchSpy = expect.createSpy();
    const apiSpy = expect.spyOn(api, 'searchChannels');
    const expectedChannels = ['ch1', 'ch2'];

    apiSpy.andReturn(addAbort(Promise.resolve(expectedChannels)));
    actions.createSearchAction(5)('search term')(dispatchSpy);

    setTimeout(() => {
      expect(dispatchSpy.calls.length).toBe(2);
      expect(dispatchSpy.calls[0].arguments[0]).toEqual(actions.setLoading(true));
      expect(dispatchSpy.calls[1].arguments[0]).toEqual(actions.setChannels(expectedChannels));
      done();
    }, 6);

  });

  it('aborts search channels requests', (done) => {
    const dispatchSpy = expect.createSpy();
    const apiSpy = expect.spyOn(api, 'searchChannels');
    const expectedChannels = ['ch1', 'ch2'];
    const search = actions.createSearchAction(5);
    const abortablePromise = addAbort(
      Promise.resolve([]),
      expect.createSpy()
    );

    apiSpy.andCall((query) => {
      if (query === 'search term 1') {
        return abortablePromise;
      }

      return addAbort(Promise.resolve(expectedChannels));
    });

    search('search term 1')(dispatchSpy);

    setTimeout(() => {
      search('search term 2')(dispatchSpy);
      expect(abortablePromise.abort.calls.length).toBe(1);
      done();
    }, 6);
  });

  function addAbort(promise, abort = () => null) {
    promise.abort = abort;
    return promise;
  }

});
