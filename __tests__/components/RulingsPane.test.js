import React from 'react';
import RulingsPane from '../../components/RulingsPane';
import { mount } from 'enzyme';
import WizardsIcon from '../../components/WizardsIcon';
import ScryfallIcon from '../../components/ScryfallIcon';
import CardImage from '../../components/CardImage';

describe('RulingsPane', () => {
  const mockCard = {
    image_uris: {
      large: 'image uri',
    },
    name: 'Derevi, Empyrial Tactician',
  };
  const mockCardWithFaces = {
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
    name: 'Derevi, Empyrial Tactician',
  };

  const mockRulings = [
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
  ];

  test('renders formatted rulings', () => {
    const wrapper = mount(
      <RulingsPane card={mockCard} rulings={mockRulings} />
    );

    const comments = wrapper.find('.comment');
    expect(comments).toHaveLength(3);

    expect(
      comments
        .at(0)
        .find('.avatar')
        .find(ScryfallIcon)
    ).toHaveLength(1);
    expect(
      comments
        .at(0)
        .find('.author')
        .text()
    ).toEqual('Scryfall');
    expect(
      comments
        .at(0)
        .find('.metadata')
        .text()
    ).toEqual('2015-01-19');
    expect(
      comments
        .at(0)
        .find('.text')
        .text()
    ).toEqual(
      'Derevi, Empyrial Tactician is banned as a commander in Duel Commander format, but it may be part of your deck.'
    );

    expect(
      comments
        .at(1)
        .find('.avatar')
        .find(WizardsIcon)
    ).toHaveLength(1);
    expect(
      comments
        .at(1)
        .find('.author')
        .text()
    ).toEqual('Wizards');
    expect(
      comments
        .at(1)
        .find('.metadata')
        .text()
    ).toEqual('2013-10-17');
    expect(
      comments
        .at(1)
        .find('.text')
        .text()
    ).toEqual(
      'You can activate Derevi’s last ability only when it is in the command zone.'
    );

    expect(
      comments
        .at(2)
        .find('.avatar')
        .find(WizardsIcon)
    ).toHaveLength(1);
    expect(
      comments
        .at(2)
        .find('.author')
        .text()
    ).toEqual('Wizards');
    expect(
      comments
        .at(2)
        .find('.metadata')
        .text()
    ).toEqual('2013-10-17');
    expect(
      comments
        .at(2)
        .find('.text')
        .text()
    ).toEqual(
      'When you activate Derevi’s last ability, you’re not casting Derevi as a spell. The ability can’t be countered by something that counters only spells. The ability isn’t subject to the additional cost of casting commanders from the command zone.'
    );
  });

  test('renders the card image', () => {
    const wrapper = mount(
      <RulingsPane card={mockCard} rulings={mockRulings} />
    );

    expect(wrapper.find(CardImage)).toHaveLength(1);
    expect(wrapper.find(CardImage).prop('indexShowing')).toBe(0);
  });

  test('renders both card faces', () => {
    const wrapper = mount(
      <RulingsPane card={mockCardWithFaces} rulings={mockRulings} />
    );

    expect(wrapper.find(CardImage)).toHaveLength(2);
    expect(
      wrapper
        .find(CardImage)
        .at(0)
        .prop('indexShowing')
    ).toBe(0);
    expect(
      wrapper
        .find(CardImage)
        .at(1)
        .prop('indexShowing')
    ).toBe(1);
  });
});
