import React from 'react';
import fetchMock from 'fetch-mock';
import CardResult from '../../components/CardResult';
import { mount } from 'enzyme';

describe('CardResult', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('searches for card data on mount', () => {
    fetchMock.mock('*', {
      image_uris: {
        border_crop: 'image uri',
      },
      scryfall_uri: 'card uri',
    });

    const wrapper = mount(
      <CardResult name="Goblin Balloon Brigade" onRequestRemove={() => null} />
    );

    expect(fetchMock.called()).toBe(true);
    expect(fetchMock.lastUrl()).toEqual(
      'https://api.scryfall.com/cards/named?exact=Goblin%20Balloon%20Brigade'
    );
  });

  test('renders image', done => {
    fetchMock.mock('*', {
      image_uris: {
        border_crop: 'image uri',
      },
      scryfall_uri: 'card uri',
    });

    const wrapper = mount(
      <CardResult name="Goblin Balloon Brigade" onRequestRemove={() => null} />
    );

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find('img')).toHaveLength(1);
      expect(wrapper.find('img').prop('src')).toEqual('image uri');
      done();
    });
  });
});
