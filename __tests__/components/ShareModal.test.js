import React from 'react';
import ShareModal, { constructLink } from '../../components/ShareModal';
import { Modal, Button, Segment } from 'semantic-ui-react';
import { mount } from 'enzyme';

describe('ShareModal', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('constructLink', () => {
    test('makes link with missing card data', () => {
      expect(constructLink()).toBe('https://whatsthatdo.net');
    });

    test('makes link with no card data', () => {
      localStorage.setItem(
        'CardManager#state',
        JSON.stringify({
          cards: [],
        })
      );
      expect(constructLink()).toBe('https://whatsthatdo.net');
    });

    test('makes link with one card', () => {
      localStorage.setItem(
        'CardManager#state',
        JSON.stringify({
          cards: [
            {
              name: 'Saheeli Rai',
              isPinned: false,
            },
          ],
        })
      );
      expect(constructLink()).toBe(
        'https://whatsthatdo.net#%5B%22Saheeli%20Rai%22%5D'
      );
    });

    test('makes link with multiple cards', () => {
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
      expect(constructLink()).toBe(
        "https://whatsthatdo.net#%5B%22Saheeli%20Rai%22%2C%22Zndrsplt's%20Judgment%22%2C%22Who%20%2F%2F%20What%20%2F%2F%20When%20%2F%2F%20Where%20%2F%2F%20Why%22%5D"
      );
    });
  });

  describe('opening the modal', () => {
    test('opens the modal if no share API is present', () => {
      window.navigator.share = undefined;

      const wrapper = mount(<ShareModal isOpen={false} onClose={jest.fn()} />);

      expect(wrapper.find(Modal)).toHaveLength(1);
      expect(wrapper.find(Modal).prop('open')).toBe(false);

      wrapper.setProps({ isOpen: true });
      wrapper.update();
      expect(wrapper.find(Modal).prop('open')).toBe(true);
    });
  });

  test('invokes navigator.share() instead if present', () => {
    window.navigator.share = jest.fn();
    const onClose = jest.fn();

    const wrapper = mount(<ShareModal isOpen={false} onClose={onClose} />);

    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(wrapper.find(Modal).prop('open')).toBe(false);

    wrapper.setProps({ isOpen: true });
    wrapper.update();
    expect(wrapper.find(Modal).prop('open')).toBe(false);
    expect(window.navigator.share).toHaveBeenCalledTimes(1);
    expect(window.navigator.share).toHaveBeenCalledWith({
      url: 'https://whatsthatdo.net',
      title: "What's that do?",
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
