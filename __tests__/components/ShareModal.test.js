import React from 'react';
import ShareModal, {
  constructPayload,
  getShareUrl,
} from '../../components/ShareModal';
import { Modal, Button, Segment } from 'semantic-ui-react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';

describe('ShareModal', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('constructPayload', () => {
    test('is null with missing card data', () => {
      expect(constructPayload()).toBe(null);
    });

    test('is null with no card data', () => {
      localStorage.setItem(
        'CardManager#state',
        JSON.stringify({
          cards: [],
        })
      );
      expect(constructPayload()).toBe(null);
    });

    test('makes payload with one card', () => {
      localStorage.setItem(
        'CardManager#state',
        JSON.stringify({
          cards: [
            {
              name: 'Saheeli Rai',
              isPinned: false,
              isFocused: false,
            },
          ],
        })
      );
      expect(constructPayload()).toEqual('{"cardNames":["Saheeli Rai"]}');
    });

    test('makes payload with multiple cards', () => {
      localStorage.setItem(
        'CardManager#state',
        JSON.stringify({
          cards: [
            {
              name: 'Saheeli Rai',
              isPinned: false,
            },
            {
              name: "Zndrsplt's Judgment",
              isPinned: true,
            },
            {
              name: 'Who // What // When // Where // Why',
              isPinned: false,
            },
          ],
        })
      );
      expect(constructPayload()).toEqual(
        `{\"cardNames\":[\"Saheeli Rai\",\"Zndrsplt's Judgment\",\"Who // What // When // Where // Why\"]}`
      );
    });
  });

  describe('getShareUrl', () => {
    test('is base url if no card data', () => {
      return getShareUrl().then(result => {
        expect(result).toBe('https://whatsthatdo.net');
      });
    });

    test('has share code if card data exists', () => {
      localStorage.setItem(
        'CardManager#state',
        JSON.stringify({
          cards: [
            {
              name: 'Saheeli Rai',
              isPinned: false,
              isFocused: false,
            },
          ],
        })
      );
      fetchMock.postOnce('*', { code: 'abcxyz' });

      return getShareUrl().then(result => {
        expect(result).toBe('https://whatsthatdo.net/abcxyz');
      });
    });
  });

  describe('opening the modal', () => {
    test('isLoading until url is ready', done => {
      const wrapper = mount(<ShareModal isOpen={false} onClose={jest.fn()} />);
      expect(wrapper.state('isLoading')).toBe(false);

      wrapper.setProps({ isOpen: true });
      wrapper.update();

      expect(wrapper.state('isLoading')).toBe(true);

      setImmediate(() => {
        expect(wrapper.state('isLoading')).toBe(false);
        done();
      });
    });

    test('opens the modal if no share API is present', done => {
      window.navigator.share = undefined;

      const wrapper = mount(<ShareModal isOpen={false} onClose={jest.fn()} />);
      expect(wrapper.state('isOpen')).toBe(false);

      wrapper.setProps({ isOpen: true });
      wrapper.update();

      expect(wrapper.state('isOpen')).toBe(true);

      setImmediate(() => {
        expect(wrapper.state('isOpen')).toBe(true);
        done();
      });
    });

    test('closes the modal if share API is present', done => {
      window.navigator.share = jest.fn();
      const onClose = jest.fn();

      const wrapper = mount(<ShareModal isOpen={false} onClose={onClose} />);
      expect(wrapper.state('isOpen')).toBe(false);

      wrapper.setProps({ isOpen: true });
      wrapper.update();

      expect(wrapper.state('isOpen')).toBe(true);
      expect(onClose).toHaveBeenCalledTimes(0);

      setImmediate(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
