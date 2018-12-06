import React from 'react';
import CardImage from '../../components/CardImage';
import InlinedCardBackImage from '../../components/InlinedCardBackImage';
import { mount } from 'enzyme';

describe('CardImage', () => {
  describe('single card source', () => {
    test('renders card back before sources are given', () => {
      const wrapper = mount(<CardImage sources={[]} indexShowing={0} />);

      expect(wrapper.find(InlinedCardBackImage).not('.placer')).toHaveLength(1);
      expect(wrapper.find(InlinedCardBackImage).filter('.placer')).toHaveLength(
        1
      );
    });

    test('renders card back while fetching source', () => {
      const wrapper = mount(
        <CardImage sources={['/img.jpg']} indexShowing={0} />
      );

      expect(wrapper.find(InlinedCardBackImage).not('.placer')).toHaveLength(1);
    });

    test('fetches image and updates with initial src', () => {
      const wrapper = mount(
        <CardImage sources={['/img.jpg']} indexShowing={0} />
      );

      wrapper.instance().images[0].onload();
      wrapper.update();

      expect(wrapper.find(InlinedCardBackImage).not('.placer')).toHaveLength(0);
      expect(wrapper.find('img').not('.placer')).toHaveLength(1);
      expect(
        wrapper
          .find('img')
          .not('.placer')
          .prop('src')
      ).toBe('/img.jpg');
    });

    test('fetches image and updates with subsequent src', () => {
      const wrapper = mount(<CardImage sources={[]} indexShowing={0} />);
      wrapper.setProps({ sources: ['/img.jpg'] });

      wrapper.instance().images[0].onload();
      wrapper.update();

      expect(wrapper.find(InlinedCardBackImage).not('.placer')).toHaveLength(0);
      expect(wrapper.find('img').not('.placer')).toHaveLength(1);
      expect(
        wrapper
          .find('img')
          .not('.placer')
          .prop('src')
      ).toBe('/img.jpg');
    });
  });

  describe('double card source', () => {
    test('fetches both images and updates', () => {
      const wrapper = mount(<CardImage sources={[]} indexShowing={0} />);
      wrapper.setProps({ sources: ['/img1.jpg', '/img2.jpg'] });

      expect(
        wrapper.find('.spin.front').filter(InlinedCardBackImage)
      ).toHaveLength(1);
      expect(
        wrapper.find('.spin.back').filter(InlinedCardBackImage)
      ).toHaveLength(1);
      expect(wrapper.find('.card.flipped')).toHaveLength(0);

      wrapper.instance().images[0].onload();
      wrapper.update();

      expect(
        wrapper.find('.spin.front').filter(InlinedCardBackImage)
      ).toHaveLength(0);
      expect(
        wrapper.find('.spin.back').filter(InlinedCardBackImage)
      ).toHaveLength(1);
      expect(
        wrapper.find('img.front').filter({ src: '/img1.jpg' })
      ).toHaveLength(1);
      expect(
        wrapper.find('img.back').filter({ src: '/img2.jpg' })
      ).toHaveLength(0);

      wrapper.setProps({ indexShowing: 1 });
      expect(wrapper.find('.card.flipped')).toHaveLength(1);

      wrapper.instance().images[1].onload();
      wrapper.update();

      expect(
        wrapper.find('.spin.front').filter(InlinedCardBackImage)
      ).toHaveLength(0);
      expect(
        wrapper.find('.spin.back').filter(InlinedCardBackImage)
      ).toHaveLength(0);
      expect(
        wrapper.find('img.front').filter({ src: '/img1.jpg' })
      ).toHaveLength(1);
      expect(
        wrapper.find('img.back').filter({ src: '/img2.jpg' })
      ).toHaveLength(1);
    });
  });
});
