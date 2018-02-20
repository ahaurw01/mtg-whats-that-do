import React from 'react';
import fetchMock from 'fetch-mock';
import CardResult from '../../components/CardResult';
import { Button } from 'semantic-ui-react';
import { mount } from 'enzyme';

describe('CardResult', () => {
  const mockCardData = {
    image_uris: {
      border_crop: 'image uri',
    },
    scryfall_uri: 'card uri',
    rulings_uri: 'rulings uri',
  };
  const mockRulingsData = {
    data: [
      {
        source: 'scryfall',
        published_at: '2015-01-19',
        comment:
          'Derevi, Empyrial Tactician is banned as a commander in Duel Commander format, but it may be part of your deck.',
      },
      {
        source: 'wotc',
        published_at: '2013-10-17',
        comment:
          'You can activate Derevi’s last ability only when it is in the command zone.',
      },
      {
        source: 'wotc',
        published_at: '2013-10-17',
        comment:
          'When you activate Derevi’s last ability, you’re not casting Derevi as a spell. The ability can’t be countered by something that counters only spells. The ability isn’t subject to the additional cost of casting commanders from the command zone.',
      },
    ],
  };

  beforeEach(() => {
    fetchMock.getOnce('*', mockCardData);
    fetchMock.getOnce('rulings uri', mockRulingsData);
  });

  afterEach(fetchMock.restore);

  test('searches for card and rulings data on mount', done => {
    const wrapper = mount(
      <CardResult name="Goblin Balloon Brigade" onRequestRemove={() => null} />
    );

    setImmediate(() => {
      expect(fetchMock.calls()).toHaveLength(2);
      expect(fetchMock.calls()[0][0]).toEqual(
        'https://api.scryfall.com/cards/named?exact=Goblin%20Balloon%20Brigade'
      );
      expect(fetchMock.calls()[1][0]).toEqual('rulings uri');
      expect(wrapper.state('card')).toEqual(mockCardData);
      expect(wrapper.state('rulings')).toEqual(mockRulingsData.data);

      done();
    });
  });

  test('renders image', done => {
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

  test('renders rulings button if rulings exist', done => {
    const wrapper = mount(
      <CardResult name="Goblin Balloon Brigade" onRequestRemove={() => null} />
    );

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find('.actions').find(Button)).toHaveLength(2);
      expect(
        wrapper
          .find('.actions')
          .find(Button)
          .at(0)
          .text()
      ).toEqual('Rulings');
      expect(
        wrapper
          .find('.actions')
          .find(Button)
          .at(1)
          .text()
      ).toEqual('Remove');
      done();
    });
  });

  test('does not render rulings button if no rulings', done => {
    fetchMock.restore();
    fetchMock.getOnce('*', mockCardData);
    fetchMock.getOnce('rulings uri', { data: [] });

    const wrapper = mount(
      <CardResult name="Goblin Balloon Brigade" onRequestRemove={() => null} />
    );

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find('.actions').find(Button)).toHaveLength(1);
      expect(
        wrapper
          .find('.actions')
          .find(Button)
          .at(0)
          .text()
      ).toEqual('Remove');
      done();
    });
  });
});
