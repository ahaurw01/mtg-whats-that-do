import React from 'react';
import PrintingsPane from '../../components/PrintingsPane';
import { mount } from 'enzyme';

describe('PrintingsPane', () => {
  const mockCardsData = [
    {
      id: '1',
      image_uris: {
        large: 'image uri',
      },
      scryfall_uri: 'card uri',
      rulings_uri: 'rulings uri',
      set_name: 'set name one',
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
      <PrintingsPane
        onSelectPrinting={jest.fn()}
        allPrintings={mockCardsData}
      />
    );

    expect(wrapper.find('h4')).toHaveLength(2);
  });

  test('renders the set and card names', () => {
    const wrapper = mount(
      <PrintingsPane
        onSelectPrinting={jest.fn()}
        allPrintings={mockCardsData}
      />
    );

    expect(
      wrapper
        .find('h4')
        .at(0)
        .text()
    ).toContain('set name one');
    expect(
      wrapper
        .find('h4')
        .at(1)
        .text()
    ).toContain('set name two');
  });
});
