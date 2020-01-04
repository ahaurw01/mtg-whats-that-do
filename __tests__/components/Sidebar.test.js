import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Icon, Menu } from 'semantic-ui-react';
import { mount } from 'enzyme';

describe('Sidebar', () => {
  const makeProps = extra => ({
    isOpen: true,
    isFullscreen: false,
    canGoFullscreen: true,
    onClose: jest.fn(),
    onOpenShareModal: jest.fn(),
    onClearCards: jest.fn(),
    onToggleFullscreen: jest.fn(),
    ...extra,
  });

  describe('fullscreen', () => {
    test('does not show menu item if not enabled', () => {
      const wrapper = mount(
        <Sidebar {...makeProps({ canGoFullscreen: false })} />
      );

      expect(wrapper.find(Menu.Item)).toHaveLength(3);
    });

    test('shows if enabled', () => {
      const wrapper = mount(
        <Sidebar {...makeProps({ canGoFullscreen: true })} />
      );

      expect(wrapper.find(Menu.Item)).toHaveLength(4);
    });

    test('has expand button if not fullscreen', () => {
      const wrapper = mount(
        <Sidebar
          {...makeProps({ canGoFullscreen: true, isFullscreen: false })}
        />
      );

      expect(
        wrapper
          .find(Menu.Item)
          .at(3)
          .find(Icon)
      ).toHaveLength(1);
      expect(
        wrapper
          .find(Menu.Item)
          .at(3)
          .find(Icon)
          .prop('name')
      ).toBe('expand');
      expect(
        wrapper
          .find(Menu.Item)
          .at(3)
          .text()
      ).toBe('Go Fullscreen');
    });

    test('has compress button if fullscreen', () => {
      const wrapper = mount(
        <Sidebar
          {...makeProps({ canGoFullscreen: true, isFullscreen: true })}
        />
      );

      expect(
        wrapper
          .find(Menu.Item)
          .at(3)
          .find(Icon)
      ).toHaveLength(1);
      expect(
        wrapper
          .find(Menu.Item)
          .at(3)
          .find(Icon)
          .prop('name')
      ).toBe('compress');
      expect(
        wrapper
          .find(Menu.Item)
          .at(3)
          .text()
      ).toBe('Exit Fullscreen');
    });

    test('can click the button', () => {
      const onToggleFullscreen = jest.fn();
      const wrapper = mount(
        <Sidebar
          {...makeProps({ canGoFullscreen: true, onToggleFullscreen })}
        />
      );

      wrapper
        .find(Menu.Item)
        .at(3)
        .simulate('click');

      expect(onToggleFullscreen).toHaveBeenCalled();
    });
  });
});
