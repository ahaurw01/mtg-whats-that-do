import React from 'react';
import Index from '../../pages/index';
import CardManager from '../../components/CardManager';
import MainHeader from '../../components/MainHeader';
import { mount } from 'enzyme';

describe('Index', () => {
  beforeEach(() => {
    CardManager.getShareCode = () => '';
  });

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

  test('presser can clear cards', () => {
    const wrapper = mount(<Index />);
    const clearCards = jest.fn();
    wrapper.find(CardManager).instance().clearCards = clearCards;

    wrapper.instance().presser._emit('clear');

    expect(clearCards.mock.calls).toHaveLength(1);
  });
});
