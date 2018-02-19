import React from 'react';
import fetchMock from 'fetch-mock';
import CardManager from '../../components/CardManager';
import CardFinder from '../../components/CardFinder';
import CardResult from '../../components/CardResult';
import { Button } from 'semantic-ui-react';
import { shallow, mount } from 'enzyme';

describe('CardManager', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('renders just the CardFinder to start', () => {
    const wrapper = shallow(<CardManager />);

    expect(wrapper.find(CardFinder)).toHaveLength(1);
    expect(wrapper.find(CardResult)).toHaveLength(0);
  });

  test('adds new cards', () => {
    fetchMock.mock('*', {
      image_uris: {
        border_crop: 'image uri',
      },
      scryfall_uri: 'card uri',
    });

    const wrapper = mount(<CardManager />);
    wrapper
      .find(CardFinder)
      .at(0)
      .prop('onCardSelected')('Serra Angel');
    wrapper.update();

    expect(wrapper.find(CardResult)).toHaveLength(1);
    expect(
      wrapper
        .find(CardResult)
        .at(0)
        .prop('name')
    ).toEqual('Serra Angel');

    wrapper
      .find(CardFinder)
      .at(0)
      .prop('onCardSelected')('Goblin King');
    wrapper.update();

    expect(wrapper.find(CardResult)).toHaveLength(2);
    expect(
      wrapper
        .find(CardResult)
        .at(1)
        .prop('name')
    ).toEqual('Goblin King');
  });

  test('removes cards', () => {
    fetchMock.mock('*', {
      image_uris: {
        border_crop: 'image uri',
      },
      scryfall_uri: 'card uri',
    });

    const wrapper = shallow(<CardManager />);
    wrapper
      .find(CardFinder)
      .at(0)
      .prop('onCardSelected')('Serra Angel');
    wrapper
      .find(CardFinder)
      .at(0)
      .prop('onCardSelected')('Lightning Bolt');
    wrapper
      .find(CardFinder)
      .at(0)
      .prop('onCardSelected')('Goblin King');
    wrapper.update();

    expect(wrapper.find(CardResult)).toHaveLength(3);

    wrapper
      .find(CardResult)
      .at(1)
      .prop('onRequestRemove')();
    wrapper.update();

    expect(wrapper.find(CardResult)).toHaveLength(2);
    expect(
      wrapper
        .find(CardResult)
        .at(0)
        .prop('name')
    ).toEqual('Serra Angel');
    expect(
      wrapper
        .find(CardResult)
        .at(1)
        .prop('name')
    ).toEqual('Goblin King');
  });
});
