import React from 'react';
import CardImage from '../../components/CardImage';
import { Icon } from 'semantic-ui-react';
import { mount } from 'enzyme';

describe('CardImage', () => {
  describe('single card source', () => {
    test('renders spinner at first', () => {
      const wrapper = mount(
        <CardImage sources={['/img.jpg']} indexShowing={0} />
      );

      expect(wrapper.find(Icon)).toHaveLength(1);
      expect(wrapper.find(Icon).prop('name')).toBe('spinner');
      expect(wrapper.find('img')).toHaveLength(0);
    });

    test('fetches image and updates with initial src', () => {
      const wrapper = mount(
        <CardImage sources={['/img.jpg']} indexShowing={0} />
      );

      wrapper.instance().images[0].onload();
      wrapper.update();

      expect(wrapper.find(Icon)).toHaveLength(0);
      expect(wrapper.find('img')).toHaveLength(1);
      expect(wrapper.find('img').prop('src')).toBe('/img.jpg');
    });

    test('fetches image and updates with subsequent src', () => {
      const wrapper = mount(<CardImage sources={[]} indexShowing={0} />);
      wrapper.setProps({ sources: ['/img.jpg'] });

      wrapper.instance().images[0].onload();
      wrapper.update();

      expect(wrapper.find(Icon)).toHaveLength(0);
      expect(wrapper.find('img')).toHaveLength(1);
      expect(wrapper.find('img').prop('src')).toBe('/img.jpg');
    });
  });

  describe('double card source', () => {
    test('fetches both images and updates', () => {
      const wrapper = mount(<CardImage sources={[]} indexShowing={0} />);
      wrapper.setProps({ sources: ['/img1.jpg', '/img2.jpg'] });

      expect(wrapper.find(Icon)).toHaveLength(1);
      expect(wrapper.find('img')).toHaveLength(0);

      wrapper.instance().images[0].onload();
      wrapper.update();

      expect(wrapper.find(Icon)).toHaveLength(0);
      expect(wrapper.find('img')).toHaveLength(1);
      expect(wrapper.find('img').prop('src')).toBe('/img1.jpg');

      wrapper.setProps({ indexShowing: 1 });
      expect(wrapper.find(Icon)).toHaveLength(1);
      expect(wrapper.find('img')).toHaveLength(0);

      wrapper.instance().images[1].onload();
      wrapper.update();

      expect(wrapper.find('img')).toHaveLength(1);
      expect(wrapper.find('img').prop('src')).toBe('/img2.jpg');
    });
  });
});
