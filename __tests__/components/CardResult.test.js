import React from 'react';
import fetchMock from 'fetch-mock';
import CardResult from '../../components/CardResult';
import CardImage from '../../components/CardImage';
import { Button, Icon } from 'semantic-ui-react';
import { mount } from 'enzyme';

describe('CardResult', () => {
  const mockCardsData = {
    data: [
      {
        id: '1',
        image_uris: {
          large: 'image uri',
        },
        scryfall_uri: 'card uri',
        rulings_uri: 'rulings uri',
      },
      {
        id: '2',
        image_uris: {
          large: 'image uri',
        },
        scryfall_uri: 'card uri',
        rulings_uri: 'rulings uri',
      },
    ],
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
  const mockCardsDataWithFaces = {
    data: [
      {
        id: '1',
        card_faces: [
          {
            image_uris: {
              large: 'image uri face 1',
            },
          },
          {
            image_uris: {
              large: 'image uri face 2',
            },
          },
        ],
        scryfall_uri: 'card uri',
        rulings_uri: 'rulings uri',
      },
      {
        id: '2',
        card_faces: [
          {
            image_uris: {
              large: 'image uri face 1',
            },
          },
          {
            image_uris: {
              large: 'image uri face 2',
            },
          },
        ],
        scryfall_uri: 'card uri',
        rulings_uri: 'rulings uri',
      },
    ],
  };
  const mockCardsDataWithOnePrinting = {
    data: [
      {
        id: '1',
        image_uris: {
          large: 'image uri',
        },
        scryfall_uri: 'card uri',
        rulings_uri: 'rulings uri',
      },
    ],
  };

  beforeEach(() => {
    fetchMock.getOnce('*', mockCardsData);
    fetchMock.getOnce('rulings uri', mockRulingsData);
  });

  afterEach(fetchMock.restore);

  test('searches for card and rulings data on mount', done => {
    const wrapper = mount(
      <CardResult
        name="Goblin Balloon Brigade"
        onRequestRemove={() => null}
        onRequestPin={() => null}
        isPinned={false}
      />
    );

    setImmediate(() => {
      expect(fetchMock.calls()).toHaveLength(2);
      expect(fetchMock.calls()[0][0]).toEqual(
        'https://api.scryfall.com/cards/search?q=!%22Goblin%20Balloon%20Brigade%22+include%3Aextras&unique=prints'
      );
      expect(fetchMock.calls()[1][0]).toEqual('/rulings%20uri');
      expect(wrapper.state('card')).toEqual(mockCardsData.data[0]);
      expect(wrapper.state('rulings')).toEqual(mockRulingsData.data);

      done();
    });
  });

  test('renders image', done => {
    const wrapper = mount(
      <CardResult
        name="Goblin Balloon Brigade"
        onRequestRemove={() => null}
        onRequestPin={() => null}
        isPinned={false}
      />
    );

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find(CardImage)).toHaveLength(1);
      expect(wrapper.find(CardImage).prop('sources')).toEqual(['image uri']);
      expect(wrapper.find(CardImage).prop('indexShowing')).toEqual(0);
      done();
    });
  });

  test('renders face image', done => {
    fetchMock.restore();
    fetchMock.getOnce('*', mockCardsDataWithFaces);
    fetchMock.getOnce('rulings uri', mockRulingsData);

    const wrapper = mount(
      <CardResult
        name="Goblin Balloon Brigade"
        onRequestRemove={() => null}
        onRequestPin={() => null}
        isPinned={false}
      />
    );

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find(CardImage)).toHaveLength(1);
      expect(wrapper.find(CardImage).prop('sources')).toEqual([
        'image uri face 1',
        'image uri face 2',
      ]);
      expect(wrapper.find(CardImage).prop('indexShowing')).toEqual(0);
      done();
    });
  });

  test('renders oracle button', done => {
    const wrapper = mount(
      <CardResult
        name="Goblin Balloon Brigade"
        onRequestRemove={() => null}
        onRequestPin={() => null}
        isPinned={false}
      />
    );

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find('.actions').find(Button)).toHaveLength(6);
      const button = wrapper
        .find('.actions')
        .find(Button)
        .at(0);
      expect(button.prop('title')).toEqual('Oracle');
      done();
    });
  });

  test('renders prices button', done => {
    const wrapper = mount(
      <CardResult
        name="Goblin Balloon Brigade"
        onRequestRemove={() => null}
        onRequestPin={() => null}
        isPinned={false}
      />
    );

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find('.actions').find(Button)).toHaveLength(6);
      const button = wrapper
        .find('.actions')
        .find(Button)
        .at(5);
      expect(button.prop('title')).toEqual('Prices');
      done();
    });
  });

  test('renders active rulings button if rulings exist', done => {
    const wrapper = mount(
      <CardResult
        name="Goblin Balloon Brigade"
        onRequestRemove={() => null}
        onRequestPin={() => null}
        isPinned={false}
      />
    );

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find('.actions').find(Button)).toHaveLength(6);
      const button = wrapper
        .find('.actions')
        .find(Button)
        .at(1);
      expect(button.prop('title')).toEqual('Rulings');
      expect(button.prop('disabled')).toEqual(false);
      done();
    });
  });

  test('renders disabled rulings button if no rulings', done => {
    fetchMock.restore();
    fetchMock.getOnce('*', mockCardsData);
    fetchMock.getOnce('rulings uri', { data: [] });

    const wrapper = mount(
      <CardResult
        name="Goblin Balloon Brigade"
        onRequestRemove={() => null}
        onRequestPin={() => null}
        isPinned={false}
      />
    );

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find('.actions').find(Button)).toHaveLength(6);
      const button = wrapper
        .find('.actions')
        .find(Button)
        .at(1);
      expect(button.prop('title')).toEqual('Rulings');
      expect(button.prop('disabled')).toEqual(true);
      done();
    });
  });

  test('does not show flip button if only one face', done => {
    const wrapper = mount(
      <CardResult
        name="Goblin Balloon Brigade"
        onRequestRemove={() => null}
        onRequestPin={() => null}
        isPinned={false}
      />
    );

    setImmediate(() => {
      wrapper.update();
      const icon = wrapper
        .find('.actions')
        .find(Icon)
        .filter({ name: 'refresh' });
      expect(icon).toHaveLength(0);
      done();
    });
  });

  test('shows flip button if double faced', done => {
    fetchMock.restore();
    fetchMock.getOnce('*', mockCardsDataWithFaces);
    fetchMock.getOnce('rulings uri', mockRulingsData);

    const wrapper = mount(
      <CardResult
        name="Goblin Balloon Brigade"
        onRequestRemove={() => null}
        onRequestPin={() => null}
        isPinned={false}
      />
    );

    setImmediate(() => {
      wrapper.update();
      const icon = wrapper
        .find('.actions')
        .find(Icon)
        .filter({ name: 'refresh' });
      expect(icon).toHaveLength(1);
      expect(icon.parent().is('button')).toBe(true);
      done();
    });
  });

  test('shows other face when flip button is clicked', done => {
    fetchMock.restore();
    fetchMock.getOnce('*', mockCardsDataWithFaces);
    fetchMock.getOnce('rulings uri', mockRulingsData);

    const wrapper = mount(
      <CardResult
        name="Goblin Balloon Brigade"
        onRequestRemove={() => null}
        onRequestPin={() => null}
        isPinned={false}
      />
    );

    setImmediate(() => {
      wrapper.update();
      const button = wrapper
        .find('.actions')
        .find(Icon)
        .filter({ name: 'refresh' })
        .closest(Button);
      expect(wrapper.find(CardImage).prop('sources')).toEqual([
        'image uri face 1',
        'image uri face 2',
      ]);
      expect(wrapper.find(CardImage).prop('indexShowing')).toEqual(0);
      button.simulate('click');
      expect(wrapper.find(CardImage).prop('sources')).toEqual([
        'image uri face 1',
        'image uri face 2',
      ]);
      expect(wrapper.find(CardImage).prop('indexShowing')).toEqual(1);
      done();
    });
  });

  test('does not show printings button if only one printing', done => {
    fetchMock.restore();
    fetchMock.getOnce('*', mockCardsDataWithOnePrinting);
    fetchMock.getOnce('rulings uri', mockRulingsData);
    const wrapper = mount(
      <CardResult
        name="Goblin Balloon Brigade"
        onRequestRemove={() => null}
        onRequestPin={() => null}
        isPinned={false}
      />
    );

    setImmediate(() => {
      wrapper.update();
      const icon = wrapper
        .find('.actions')
        .find(Icon)
        .filter({ name: 'picture' });
      expect(icon).toHaveLength(0);
      done();
    });
  });

  test('shows alternative printings button if more than one printing', done => {
    const wrapper = mount(
      <CardResult
        name="Goblin Balloon Brigade"
        onRequestRemove={() => null}
        onRequestPin={() => null}
        isPinned={false}
      />
    );

    setImmediate(() => {
      wrapper.update();
      const icon = wrapper
        .find('.actions')
        .find(Icon)
        .filter({ name: 'picture' });
      expect(icon).toHaveLength(1);
      expect(icon.parent().is('button')).toBe(true);
      done();
    });
  });

  describe('presser events', () => {
    let wrapper, onRequestRemove, onRequestPin;
    beforeEach(done => {
      onRequestRemove = jest.fn();
      onRequestPin = jest.fn();
      wrapper = mount(
        <CardResult
          name="Goblin Balloon Brigade"
          onRequestRemove={onRequestRemove}
          onRequestPin={onRequestPin}
          isPinned={false}
        />
      );
      setImmediate(done);
    });

    describe('remove', () => {
      test('does nothing if not focused', () => {
        wrapper.instance().presser._emit('remove');

        expect(onRequestRemove).not.toHaveBeenCalled();
      });

      test('calls onRequestRemove if focused', () => {
        wrapper.setProps({ isFocused: true });
        wrapper.instance().presser._emit('remove');

        expect(onRequestRemove).toHaveBeenCalled();
      });
    });

    describe('pin', () => {
      test('does nothing if not focused', () => {
        wrapper.instance().presser._emit('pin');

        expect(onRequestPin).not.toHaveBeenCalled();
      });

      test('calls onRequestPin if focused', () => {
        wrapper.setProps({ isFocused: true });
        wrapper.instance().presser._emit('pin');

        expect(onRequestPin).toHaveBeenCalled();
      });
    });

    describe('oracle', () => {
      test('does nothing if not focused', () => {
        wrapper.instance().presser._emit('oracle');

        expect(wrapper.state('isOracleModalOpen')).toBe(false);
      });

      test('does nothing if no card', () => {
        wrapper.setState({ card: null });
        wrapper.setProps({ isFocused: true });
        wrapper.instance().presser._emit('oracle');

        expect(wrapper.state('isOracleModalOpen')).toBe(false);
      });

      test('opens oracle modal if focused', () => {
        wrapper.setProps({ isFocused: true });
        wrapper.instance().presser._emit('oracle');

        expect(wrapper.state('isOracleModalOpen')).toBe(true);
      });

      test('closes rulings modal if focused', () => {
        wrapper.setProps({ isFocused: true });
        wrapper.setState({ isRulingsModalOpen: true });
        wrapper.instance().presser._emit('oracle');

        expect(wrapper.state('isRulingsModalOpen')).toBe(false);
      });
    });

    describe('rulings', () => {
      test('does nothing if not focused', () => {
        wrapper.instance().presser._emit('rulings');

        expect(wrapper.state('isRulingsModalOpen')).toBe(false);
      });

      test('does nothing if no rulings', () => {
        wrapper.setState({ rulings: [] });
        wrapper.setProps({ isFocused: true });
        wrapper.instance().presser._emit('rulings');

        expect(wrapper.state('isRulingsModalOpen')).toBe(false);
      });

      test('opens rulings modal if focused', () => {
        wrapper.setProps({ isFocused: true });
        wrapper.instance().presser._emit('rulings');

        expect(wrapper.state('isRulingsModalOpen')).toBe(true);
      });

      test('closes oracle modal if focused', () => {
        wrapper.setProps({ isFocused: true });
        wrapper.setState({ isOracleModalOpen: true });
        wrapper.instance().presser._emit('rulings');

        expect(wrapper.state('isOracleModalOpen')).toBe(false);
      });
    });

    describe('flip', () => {
      test('does nothing if not focused', () => {
        wrapper.setState({
          card: {
            card_faces: [
              {
                image_uris: {},
              },
              {
                image_uris: {},
              },
            ],
          },
        });
        wrapper.instance().presser._emit('flip');

        expect(wrapper.state('faceIndex')).toBe(0);
      });

      test('does nothing if not double faced', () => {
        wrapper.setProps({ isFocused: true });
        wrapper.instance().presser._emit('flip');

        expect(wrapper.state('faceIndex')).toBe(0);
      });

      test('flips if focused', () => {
        wrapper.setProps({ isFocused: true });
        wrapper.setState({
          card: {
            card_faces: [
              {
                image_uris: {},
              },
              {
                image_uris: {},
              },
            ],
          },
        });
        wrapper.instance().presser._emit('flip');

        expect(wrapper.state('faceIndex')).toBe(1);
      });
    });
  });
});
