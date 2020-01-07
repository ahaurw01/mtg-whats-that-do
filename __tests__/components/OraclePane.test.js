import React from 'react';
import OraclePane from '../../components/OraclePane';
import CardImage from '../../components/CardImage';
import { Modal, Button, Segment, Header } from 'semantic-ui-react';
import { mount } from 'enzyme';

describe('OraclePane', () => {
  const mockCard = {
    id: '1',
    color_identity: 'u',
    mana_cost: '{U}',
    name: 'Swan Song',
    oracle_text:
      'Counter target enchantment, instant, or sorcery spell. Its controller creates a 2/2 blue Bird creature token with flying.',
    power: null,
    toughness: null,
    type_line: 'Instant',
    flavor_text:
      '“The most enlightened mages create beauty from violence.” —Medomai the Ageless',
    loyalty: null,
    image_uris: {
      large: 'hi',
    },
  };
  const mockCardWithFaces = {
    card_faces: [
      {
        id: '1',
        color_identity: 'u',
        mana_cost: '{U}',
        name: 'Swan Song 1',
        oracle_text:
          'Counter target enchantment, instant, or sorcery spell. Its controller creates a 2/2 blue Bird creature token with flying.',
        power: null,
        toughness: null,
        type_line: 'Instant',
        flavor_text:
          '“The most enlightened mages create beauty from violence.” —Medomai the Ageless',
        loyalty: null,
        image_uris: {
          large: 'hi 1',
        },
      },
      {
        id: '1',
        color_identity: 'u',
        mana_cost: '{U}',
        name: 'Swan Song 2',
        oracle_text:
          'Counter target enchantment, instant, or sorcery spell. Its controller creates a 2/2 blue Bird creature token with flying.',
        power: null,
        toughness: null,
        type_line: 'Instant',
        flavor_text:
          '“The most enlightened mages create beauty from violence.” —Medomai the Ageless',
        loyalty: null,
        image_uris: {
          large: 'hi 2',
        },
      },
    ],
  };

  test('renders single faced card data', () => {
    const wrapper = mount(<OraclePane card={mockCard} />);

    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(Header).text()).toContain('Swan Song');
    expect(wrapper.text()).toContain(
      'Counter target enchantment, instant, or sorcery spell. Its controller creates a 2/2 blue Bird creature token with flying.'
    );
  });

  test('renders double faced card data', () => {
    const wrapper = mount(<OraclePane card={mockCardWithFaces} />);

    expect(wrapper.find(Header)).toHaveLength(2);
    expect(
      wrapper
        .find(Header)
        .at(0)
        .text()
    ).toContain('Swan Song 1');

    expect(
      wrapper
        .find(Segment)
        .at(0)
        .text()
    ).toContain(
      'Counter target enchantment, instant, or sorcery spell. Its controller creates a 2/2 blue Bird creature token with flying.'
    );

    expect(
      wrapper
        .find(Header)
        .at(1)
        .text()
    ).toContain('Swan Song 2');

    expect(
      wrapper
        .find(Segment)
        .at(1)
        .text()
    ).toContain(
      'Counter target enchantment, instant, or sorcery spell. Its controller creates a 2/2 blue Bird creature token with flying.'
    );
  });

  // These tests are difficult because semantic ui portal rendering is not supported here.
  test('renders the card image', () => {
    const wrapper = mount(<OraclePane card={mockCard} />);

    expect(wrapper.find(CardImage)).toHaveLength(1);
  });

  test('renders both card faces', () => {
    const wrapper = mount(<OraclePane card={mockCardWithFaces} />);

    expect(wrapper.find(CardImage)).toHaveLength(2);
  });
});
