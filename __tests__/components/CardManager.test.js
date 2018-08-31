import React from 'react';
import fetchMock from 'fetch-mock';
import CardManager, { retrieveSavedState } from '../../components/CardManager';
import CardFinder from '../../components/CardFinder';
import CardResult from '../../components/CardResult';
import { Button } from 'semantic-ui-react';
import { shallow, mount } from 'enzyme';

describe('CardManager', () => {
  const mockCardData = {
    image_uris: {
      large: 'image uri',
    },
    scryfall_uri: 'card uri',
    rulings_uri: 'rulings uri',
  };
  const mockRulingsData = {
    data: [],
  };

  beforeEach(() => {
    fetchMock.get(
      'begin:https://api.scryfall.com/cards/named?exact=',
      mockCardData
    );
    fetchMock.get('rulings uri', mockRulingsData);
    localStorage.clear();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  test('renders just the CardFinder to start', () => {
    const wrapper = shallow(<CardManager />);

    expect(wrapper.find(CardFinder)).toHaveLength(1);
    expect(wrapper.find(CardResult)).toHaveLength(0);
  });

  test('adds new cards', done => {
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

    // When mounting, the CardResults fetch data. They haven't finished at this
    // point, but they will after the next tick. If we don't do this, we'll
    // unmock fetch before they call it and we get a warning.
    setImmediate(done);
  });

  test('removes cards', () => {
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

  test('clears cards', () => {
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

    wrapper.instance().clearCards();

    expect(wrapper.find(CardResult)).toHaveLength(3);
  });

  test('does not clear pinned cards', () => {
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
    wrapper
      .find(CardResult)
      .at(1)
      .prop('onRequestPin')();
    wrapper.update();
    expect(wrapper.find(CardResult)).toHaveLength(3);
    wrapper.instance().clearCards();
    wrapper.update();
    expect(wrapper.find(CardResult)).toHaveLength(1);
    expect(wrapper.find(CardResult).prop('name')).toEqual('Lightning Bolt');
  });

  describe('retrieveSavedState', () => {
    afterEach(() => {
      location.hash = '';
      localStorage.clear();
    });

    test('uses hash state', () => {
      location.hash = '#%5B"Saheeli%20Rai"%2C"Saheeli%2C%20the%20Gifted"%5D';

      expect(retrieveSavedState()).toEqual({
        cards: [
          { isPinned: false, name: 'Saheeli Rai' },
          { isPinned: false, name: 'Saheeli, the Gifted' },
        ],
      });
    });

    test('is default state if no storage exists', () => {
      localStorage.clear();

      expect(retrieveSavedState()).toEqual({ cards: [] });
    });

    test('is default state if no storage is bogus', () => {
      localStorage.setItem('CardManager#state', 'BOGUS');

      expect(retrieveSavedState()).toEqual({ cards: [] });
    });

    test('is from storage', () => {
      localStorage.setItem(
        'CardManager#state',
        JSON.stringify({
          cards: [{ name: 'Fling', isPinned: true }],
        })
      );

      expect(retrieveSavedState()).toEqual({
        cards: [{ name: 'Fling', isPinned: true }],
      });
    });

    test('prioritizes hash', () => {
      location.hash = '#%5B"Saheeli%20Rai"%2C"Saheeli%2C%20the%20Gifted"%5D';
      localStorage.setItem(
        'CardManager#state',
        JSON.stringify({
          cards: [{ name: 'Fling', isPinned: true }],
        })
      );

      expect(retrieveSavedState()).toEqual({
        cards: [
          { isPinned: false, name: 'Saheeli Rai' },
          { isPinned: false, name: 'Saheeli, the Gifted' },
        ],
      });
    });

    test('is from storage if hash is bogus', () => {
      location.hash = '#BOGUS';
      localStorage.setItem(
        'CardManager#state',
        JSON.stringify({
          cards: [{ name: 'Fling', isPinned: true }],
        })
      );

      expect(retrieveSavedState()).toEqual({
        cards: [{ name: 'Fling', isPinned: true }],
      });
    });

    test('is default state if all options fail', () => {
      location.hash = '#BOGUS';
      localStorage.setItem('CardManager#state', 'BOGUS');

      expect(retrieveSavedState()).toEqual({
        cards: [],
      });
    });
  });

  describe('componentDidMount', () => {
    test('updates state to saved state', () => {
      localStorage.setItem(
        'CardManager#state',
        JSON.stringify({
          cards: [{ name: 'Fling', isPinned: true }],
        })
      );

      const wrapper = shallow(<CardManager />);
      wrapper.update();

      expect(wrapper.find(CardResult)).toHaveLength(1);
      expect(wrapper.find(CardResult).prop('name')).toBe('Fling');
      expect(wrapper.find(CardResult).prop('isPinned')).toBe(true);
    });

    test('clears hash after mount', () => {
      location.hash = '#something';

      const wrapper = shallow(<CardManager />);

      expect(location.hash).toBe('');
    });
  });

  describe('componentDidUpdate', () => {
    test('saves state', () => {
      const wrapper = shallow(<CardManager />);

      wrapper.setState({ cards: [{ name: 'Fling', isPinned: true }] });

      expect(localStorage.getItem('CardManager#state')).toEqual(
        '{"cards":[{"name":"Fling","isPinned":true}]}'
      );
    });
  });
});
