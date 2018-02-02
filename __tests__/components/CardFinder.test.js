import React from 'react';
import fetchMock from 'fetch-mock';
import CardFinder from '../../components/CardFinder';
import { mount } from 'enzyme';

describe('CardFinder', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('searches for cards on input', () => {
    fetchMock.mock('*', {
      data: ['Serra Angel'],
    });

    const wrapper = mount(<CardFinder onCardSelected={() => null} />);

    wrapper
      .find('input')
      .simulate('change', { target: { value: 'Serra Angel' } });
    expect(fetchMock.called()).toBe(true);
    expect(fetchMock.lastUrl()).toEqual(
      'https://api.scryfall.com/cards/autocomplete?q=Serra%20Angel'
    );
  });

  test('does not search for input < 3 characters', () => {
    fetchMock.mock('*', {
      data: ['Serra Angel'],
    });

    const wrapper = mount(<CardFinder onCardSelected={() => null} />);

    wrapper.find('input').simulate('change', { target: { value: '' } });
    wrapper.find('input').simulate('change', { target: { value: 'S' } });
    wrapper.find('input').simulate('change', { target: { value: 'Se' } });
    expect(fetchMock.called()).toBe(false);

    wrapper.find('input').simulate('change', { target: { value: 'Ser' } });
    expect(fetchMock.called()).toBe(true);
  });

  test('sets results after searchings cards', done => {
    fetchMock.mock('*', {
      data: ['Serra Angel'],
    });

    const wrapper = mount(<CardFinder onCardSelected={() => null} />);

    wrapper
      .find('input')
      .simulate('change', { target: { value: 'Serra Angel' } });

    setTimeout(() => {
      expect(wrapper.state().results).toEqual([{ title: 'Serra Angel' }]);
      done();
    }, 1);
  });

  test('renders results', () => {
    const wrapper = mount(<CardFinder onCardSelected={() => null} />);
    wrapper.setState({
      results: [
        {
          title: 'Goblin Spy',
        },
        {
          title: 'Goblin Lore',
        },
        {
          title: 'Goblin King',
        },
      ],
    });

    expect(wrapper.find('.result')).toHaveLength(3);
    expect(
      wrapper
        .find('.result')
        .at(0)
        .text()
    ).toEqual('Goblin Spy');
    expect(
      wrapper
        .find('.result')
        .at(1)
        .text()
    ).toEqual('Goblin Lore');
    expect(
      wrapper
        .find('.result')
        .at(2)
        .text()
    ).toEqual('Goblin King');
  });

  test('invokes onCardSelected', () => {
    const onCardSelected = jest.fn();
    const wrapper = mount(<CardFinder onCardSelected={onCardSelected} />);
    wrapper.setState({ results: [{ title: 'Serra Angel' }] });

    wrapper.find('.result').simulate('click', {
      nativeEvent: {
        stopImmediatePropagation: () => null,
      },
    });

    expect(onCardSelected.mock.calls).toHaveLength(1);
    expect(onCardSelected.mock.calls[0][0]).toEqual('Serra Angel');
  });
});
