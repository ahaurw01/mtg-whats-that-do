import React from 'react';
import Index from '../../pages/index';
import CardManager from '../../components/CardManager';
import MainHeader from '../../components/MainHeader';
import { mount } from 'enzyme';

describe('Index', () => {
  test('cards are cleared', () => {
    const wrapper = mount(<Index />);
    const clearCards = jest.fn();
    wrapper.find(CardManager).instance().clearCards = clearCards;

    wrapper
      .find(MainHeader)
      .find('a')
      .at(1)
      .simulate('click');

    expect(clearCards.mock.calls).toHaveLength(1);
  });
});
