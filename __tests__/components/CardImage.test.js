import React from 'react';
import CardImage from '../../components/CardImage';
import { Icon } from 'semantic-ui-react';
import { mount } from 'enzyme';

describe('CardImage', () => {
  test('renders spinner at first', () => {
    const wrapper = mount(<CardImage src="/img.jpg" />);

    expect(wrapper.find(Icon)).toHaveLength(1);
    expect(wrapper.find(Icon).prop('name')).toBe('spinner');
    expect(wrapper.find('img')).toHaveLength(0);
  });

  test('fetches image and updates with initial src', () => {
    const wrapper = mount(<CardImage src="/img.jpg" />);

    wrapper.instance().img.onload();
    wrapper.update();

    expect(wrapper.find(Icon)).toHaveLength(0);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('img').prop('src')).toBe('/img.jpg');
  });

  test('fetches image and updates with subsequent src', () => {
    const wrapper = mount(<CardImage src="" />);
    wrapper.setProps({ src: '/img.jpg' });

    wrapper.instance().img.onload();
    wrapper.update();

    expect(wrapper.find(Icon)).toHaveLength(0);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('img').prop('src')).toBe('/img.jpg');
  });

  test('can update src', () => {
    const wrapper = mount(<CardImage src="" />);
    wrapper.setProps({ src: '/img.jpg' });

    const img = wrapper.instance().img;
    img.onload();

    wrapper.update();
    wrapper.setProps({ src: '/other-img.jpg' });
    wrapper.update();

    expect(wrapper.find('img').prop('src')).toBe('/other-img.jpg');
  });
});
