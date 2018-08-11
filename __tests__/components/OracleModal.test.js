import React from 'react';
import OracleModal from '../../components/OracleModal';
import { Modal, Button, Segment } from 'semantic-ui-react';
import { mount } from 'enzyme';

describe('OracleModal', () => {
  afterEach(() => {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
  });

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
      border_crop: 'hi',
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
          border_crop: 'hi 1',
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
          border_crop: 'hi 2',
        },
      },
    ],
  };

  test('renders a trigger button', () => {
    const wrapper = mount(<OracleModal card={mockCard} />);

    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).prop('title')).toEqual('Oracle');
  });

  test('renders single faced card data', () => {
    const wrapper = mount(<OracleModal card={mockCard} />);
    wrapper.find(Button).simulate('click');

    const modal = document.querySelector('.modal');
    expect(modal).toBeDefined();
    expect(modal.querySelectorAll('.segment')).toHaveLength(1);
    expect(modal.querySelector('.segment').innerHTML).toContain('Swan Song');
    expect(modal.querySelector('.segment').innerHTML).toContain(
      'Counter target enchantment, instant, or sorcery spell. Its controller creates a 2/2 blue Bird creature token with flying.'
    );
  });

  test('renders double faced card data', () => {
    const wrapper = mount(<OracleModal card={mockCardWithFaces} />);
    wrapper.find(Button).simulate('click');

    const modal = document.querySelector('.modal');
    expect(modal).toBeDefined();
    expect(modal.querySelectorAll('.segment')).toHaveLength(2);
    expect(modal.querySelectorAll('.segment')[0].innerHTML).toContain(
      'Swan Song 1'
    );
    expect(modal.querySelectorAll('.segment')[0].innerHTML).toContain(
      'Counter target enchantment, instant, or sorcery spell. Its controller creates a 2/2 blue Bird creature token with flying.'
    );
    expect(modal.querySelectorAll('.segment')[1].innerHTML).toContain(
      'Swan Song 2'
    );
    expect(modal.querySelectorAll('.segment')[1].innerHTML).toContain(
      'Counter target enchantment, instant, or sorcery spell. Its controller creates a 2/2 blue Bird creature token with flying.'
    );
  });

  test('renders the card image', () => {
    const wrapper = mount(<OracleModal card={mockCard} />);
    wrapper.find(Button).simulate('click');

    const modal = document.querySelector('.modal');
    expect(modal).toBeDefined();
    const images = modal.querySelectorAll('img');
    expect(images).toHaveLength(1);
    expect(images[0].src).toEqual('hi');
  });

  test('renders both card faces', () => {
    const wrapper = mount(<OracleModal card={mockCardWithFaces} />);
    wrapper.find(Button).simulate('click');

    const modal = document.querySelector('.modal');
    expect(modal).toBeDefined();
    const images = modal.querySelectorAll('img');
    expect(images).toHaveLength(2);
    expect(images[0].src).toEqual('hi 1');
    expect(images[1].src).toEqual('hi 2');
  });
});
