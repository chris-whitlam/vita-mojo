import { act, renderHook, cleanup } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import useFetch from './useFetch';

const url = 'https://test.com';
const render = () => renderHook(() => useFetch({ url }));

describe('useFetch', () => {
  let axiosMock;

  beforeAll(() => {
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    cleanup();
    axiosMock.reset();
  });

  it('should successfully return data', async () => {
    const expectedData = { firstName: 'Bob', lastName: 'Bobbins' };

    axiosMock.onGet(url).reply(200, expectedData);
    const { result: hook } = render();

    const callback = hook.current[1];

    let callbackReturn;
    act(() => {
      callbackReturn = callback();
    });

    expect(hook.current[0].loading).toBe(true);
    expect(hook.current[0].data).toBeUndefined();
    expect(hook.current[0].error).toBeUndefined();

    await waitFor(() => {
      expect(hook.current[0].loading).toBe(false);
      expect(hook.current[0].error).toBeUndefined();
      expect(hook.current[0].data).toStrictEqual(expectedData);
    });

    const { loading, error, data } = await callbackReturn;

    expect(loading).toBe(false);
    expect(error).toBeUndefined();
    expect(data).toStrictEqual(expectedData);
  });

  it('should return error if call fails', async () => {
    axiosMock.onGet(url).networkErrorOnce();
    const { result: hook } = render();

    const callback = hook.current[1];

    let callbackReturn;
    act(() => {
      callbackReturn = callback();
    });

    // Supress console errors
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .mockImplementation(() => {});

    expect(hook.current[0].loading).toBe(true);
    expect(hook.current[0].data).toBeUndefined();
    expect(hook.current[0].error).toBeUndefined();

    await waitFor(() => {
      expect(hook.current[0].loading).toBe(false);
      expect(hook.current[0].data).toBeUndefined();
      expect(hook.current[0].error).toEqual(new Error('Network Error'));
    });

    const { loading, error, data } = await callbackReturn;

    expect(loading).toBe(false);
    expect(data).toBeUndefined();
    expect(error).toEqual(new Error('Network Error'));

    consoleErrorSpy.mockRestore();
  });
});
