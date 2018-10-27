import React from 'react';
import PrintingsModal from '../../components/PrintingsModal';
import { mount } from 'enzyme';

describe('PrintingsModal', () => {
  afterEach(() => {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
  });

  const mockCardsData = [
    {
      id: '1',
      image_uris: {
        large: 'image uri',
      },
      scryfall_uri: 'card uri',
      rulings_uri: 'rulings uri',
      set_name: 'set name',
      set: 'set',
    },
    {
      id: '2',
      image_uris: {
        large: 'image uri',
      },
      scryfall_uri: 'card uri',
      rulings_uri: 'rulings uri',
      set_name: 'set name two',
      set: 'st2',
    },
  ];

  test('renders a number of links appropriate to the number of cards', () => {
    const wrapper = mount(
      <PrintingsModal
        selectCard={jest.fn()}
        onClose={jest.fn()}
        isOpen
        allPrintings={mockCardsData}
      />
    );

    const modal = document.querySelector('.modal');
    expect(modal).toBeDefined();
    expect(modal.querySelectorAll('h4')).toHaveLength(2);
  });

  test('renders the set and card names', () => {
    const wrapper = mount(
      <PrintingsModal
        selectCard={jest.fn()}
        onClose={jest.fn()}
        isOpen
        allPrintings={mockCardsData}
      />
    );

    const modal = document.querySelector('.modal');
    expect(modal).toBeDefined();
    expect(modal.querySelectorAll('h4')[0].innerHTML).toContain('set name');
    expect(modal.querySelectorAll('h4')[0].innerHTML).toContain('set');
  });
});
