import React from 'react';
import fetchMock from 'fetch-mock';
import CardManager from '../../components/CardManager';
import CardResult from '../../components/CardResult';
import NoCardsYet from '../../components/NoCardsYet';
import { shallow, mount } from 'enzyme';

describe('CardManager', () => {
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
    data: [],
  };
  const mockShareData = {
    cardNames: ['Lightning Bolt', 'Fear'],
  };

  beforeEach(() => {
    fetchMock.get(
      'begin:https://api.scryfall.com/cards/search?q=!%22',
      mockCardsData
    );
    fetchMock.get('rulings uri', mockRulingsData);
    fetchMock.get('https://whatsthatdo.net/share/share-code', mockShareData);
    localStorage.clear();
    jest.spyOn(CardManager, 'getShareCode').mockImplementation(() => '');
    jest.spyOn(window.history, 'replaceState').mockImplementation(jest.fn());
  });

  afterEach(() => {
    fetchMock.restore();
  });

  test('adds new cards', done => {
    const wrapper = mount(<CardManager />);
    wrapper.instance().addCard('Serra Angel');
    wrapper.update();

    expect(wrapper.find(CardResult)).toHaveLength(1);
    expect(
      wrapper
        .find(CardResult)
        .at(0)
        .prop('name')
    ).toEqual('Serra Angel');

    wrapper.instance().addCard('Goblin King');
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
    wrapper.instance().addCard('Serra Angel');
    wrapper.instance().addCard('Lightning Bolt');
    wrapper.instance().addCard('Goblin King');
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
    wrapper.instance().addCard('Serra Angel');
    wrapper.instance().addCard('Lightning Bolt');
    wrapper.instance().addCard('Goblin King');
    wrapper.update();

    expect(wrapper.find(CardResult)).toHaveLength(3);

    wrapper.instance().clearCards();

    expect(wrapper.find(CardResult)).toHaveLength(0);
  });

  test('does not clear pinned cards', () => {
    const wrapper = shallow(<CardManager />);
    wrapper.instance().addCard('Serra Angel');
    wrapper.instance().addCard('Lightning Bolt');
    wrapper.instance().addCard('Goblin King');

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

  test('renders NoCardsYet if no cards present', done => {
    const wrapper = mount(<CardManager />);
    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find(NoCardsYet)).toHaveLength(1);
      wrapper.instance().addCard('Serra Angel');
      setImmediate(() => {
        wrapper.update();
        expect(wrapper.find(NoCardsYet)).toHaveLength(0);
        done();
      });
    });
  });

  describe('componentDidMount', () => {
    test('updates state to saved state', done => {
      localStorage.setItem(
        'CardManager#state',
        JSON.stringify({
          cards: [{ name: 'Fling', isPinned: true }],
        })
      );

      const wrapper = shallow(<CardManager />);
      setImmediate(() => {
        wrapper.update();
        expect(wrapper.find(CardResult)).toHaveLength(1);
        expect(wrapper.find(CardResult).prop('name')).toBe('Fling');
        expect(wrapper.find(CardResult).prop('isPinned')).toBe(true);

        expect(window.history.replaceState).not.toHaveBeenCalled();
        done();
      });
    });

    test('updates state to shared state', done => {
      CardManager.getShareCode.mockImplementation(() => 'share-code');

      const wrapper = shallow(<CardManager />);
      setImmediate(() => {
        wrapper.update();
        expect(wrapper.find(CardResult)).toHaveLength(2);
        expect(
          wrapper
            .find(CardResult)
            .at(0)
            .prop('name')
        ).toBe('Lightning Bolt');
        expect(
          wrapper
            .find(CardResult)
            .at(0)
            .prop('isPinned')
        ).toBe(false);
        expect(
          wrapper
            .find(CardResult)
            .at(1)
            .prop('name')
        ).toBe('Fear');
        expect(
          wrapper
            .find(CardResult)
            .at(1)
            .prop('isPinned')
        ).toBe(false);

        expect(window.history.replaceState).toHaveBeenCalledWith({}, '', '/');
        done();
      });
    });

    test('prioritizes shared state', done => {
      localStorage.setItem(
        'CardManager#state',
        JSON.stringify({
          cards: [{ name: 'Fling', isPinned: true }],
        })
      );
      CardManager.getShareCode.mockImplementation(() => 'share-code');

      const wrapper = shallow(<CardManager />);
      setImmediate(() => {
        wrapper.update();
        expect(wrapper.find(CardResult)).toHaveLength(2);
        expect(
          wrapper
            .find(CardResult)
            .at(0)
            .prop('name')
        ).toBe('Lightning Bolt');
        expect(
          wrapper
            .find(CardResult)
            .at(0)
            .prop('isPinned')
        ).toBe(false);
        expect(
          wrapper
            .find(CardResult)
            .at(1)
            .prop('name')
        ).toBe('Fear');
        expect(
          wrapper
            .find(CardResult)
            .at(1)
            .prop('isPinned')
        ).toBe(false);
        done();
      });
    });
  });

  describe('componentDidUpdate', () => {
    test('saves state', () => {
      const wrapper = shallow(<CardManager />);

      wrapper.setState({
        cards: [{ name: 'Fling', isPinned: true, isFocused: false }],
      });

      expect(localStorage.getItem('CardManager#state')).toEqual(
        '{"cards":[{"name":"Fling","isPinned":true,"isFocused":false}]}'
      );
    });
  });

  describe('presser events', () => {
    localStorage.setItem(
      'CardManager#state',
      JSON.stringify({
        cards: [{ name: 'Fling', isPinned: true }],
      })
    );

    test('nextCard sets first card as focused', () => {
      const wrapper = shallow(<CardManager />);
      wrapper.setState({
        cards: [
          { name: 'Fling', isPinned: false, isFocused: false },
          { name: 'Shock', isPinned: false, isFocused: false },
          { name: 'Grapeshot', isPinned: false, isFocused: false },
        ],
      });

      wrapper.instance().presser._emit('nextCard');

      expect(wrapper.state('cards')).toEqual([
        { name: 'Fling', isPinned: false, isFocused: true },
        { name: 'Shock', isPinned: false, isFocused: false },
        { name: 'Grapeshot', isPinned: false, isFocused: false },
      ]);
    });

    test('nextCard sets next card as focused', () => {
      const wrapper = shallow(<CardManager />);
      wrapper.setState({
        cards: [
          { name: 'Fling', isPinned: false, isFocused: true },
          { name: 'Shock', isPinned: false, isFocused: false },
          { name: 'Grapeshot', isPinned: false, isFocused: false },
        ],
      });

      wrapper.instance().presser._emit('nextCard');

      expect(wrapper.state('cards')).toEqual([
        { name: 'Fling', isPinned: false, isFocused: false },
        { name: 'Shock', isPinned: false, isFocused: true },
        { name: 'Grapeshot', isPinned: false, isFocused: false },
      ]);
    });

    test('nextCard wraps around', () => {
      const wrapper = shallow(<CardManager />);
      wrapper.setState({
        cards: [
          { name: 'Fling', isPinned: false, isFocused: false },
          { name: 'Shock', isPinned: false, isFocused: false },
          { name: 'Grapeshot', isPinned: false, isFocused: true },
        ],
      });

      wrapper.instance().presser._emit('nextCard');

      expect(wrapper.state('cards')).toEqual([
        { name: 'Fling', isPinned: false, isFocused: true },
        { name: 'Shock', isPinned: false, isFocused: false },
        { name: 'Grapeshot', isPinned: false, isFocused: false },
      ]);
    });

    test('previousCard sets last card as focused', () => {
      const wrapper = shallow(<CardManager />);
      wrapper.setState({
        cards: [
          { name: 'Fling', isPinned: false, isFocused: false },
          { name: 'Shock', isPinned: false, isFocused: false },
          { name: 'Grapeshot', isPinned: false, isFocused: false },
        ],
      });

      wrapper.instance().presser._emit('previousCard');

      expect(wrapper.state('cards')).toEqual([
        { name: 'Fling', isPinned: false, isFocused: false },
        { name: 'Shock', isPinned: false, isFocused: false },
        { name: 'Grapeshot', isPinned: false, isFocused: true },
      ]);
    });

    test('previousCard sets previous card as focused', () => {
      const wrapper = shallow(<CardManager />);
      wrapper.setState({
        cards: [
          { name: 'Fling', isPinned: false, isFocused: false },
          { name: 'Shock', isPinned: false, isFocused: true },
          { name: 'Grapeshot', isPinned: false, isFocused: false },
        ],
      });

      wrapper.instance().presser._emit('previousCard');

      expect(wrapper.state('cards')).toEqual([
        { name: 'Fling', isPinned: false, isFocused: true },
        { name: 'Shock', isPinned: false, isFocused: false },
        { name: 'Grapeshot', isPinned: false, isFocused: false },
      ]);
    });

    test('previousCard wraps around', () => {
      const wrapper = shallow(<CardManager />);
      wrapper.setState({
        cards: [
          { name: 'Fling', isPinned: false, isFocused: true },
          { name: 'Shock', isPinned: false, isFocused: false },
          { name: 'Grapeshot', isPinned: false, isFocused: false },
        ],
      });

      wrapper.instance().presser._emit('previousCard');

      expect(wrapper.state('cards')).toEqual([
        { name: 'Fling', isPinned: false, isFocused: false },
        { name: 'Shock', isPinned: false, isFocused: false },
        { name: 'Grapeshot', isPinned: false, isFocused: true },
      ]);
    });
  });
});
