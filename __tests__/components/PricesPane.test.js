import React from 'react';
import PricesPane from '../../components/PricesPane';
import { Statistic, Message } from 'semantic-ui-react';
import { mount } from 'enzyme';

describe('PricesPane', () => {
  const makeProps = extra => ({
    card: {},
    ...extra,
  });

  describe('no prices available', () => {
    test('renders a message', () => {
      const wrapper = mount(<PricesPane {...makeProps()} />);

      expect(wrapper.find(Message)).toHaveLength(1);
      expect(wrapper.find(Message).prop('content')).toBe(
        'No pricing data found for this printing.'
      );
    });
  });

  describe('both prices available', () => {
    test('renders prices', () => {
      const card = {
        prices: {
          usd: '0.01',
          usd_foil: '1.01',
        },
      };

      const wrapper = mount(<PricesPane {...makeProps({ card })} />);

      expect(wrapper.find(Statistic)).toHaveLength(2);

      expect(
        wrapper
          .find(Statistic)
          .at(0)
          .find(Statistic.Value)
          .text()
      ).toBe('$0.01');
      expect(
        wrapper
          .find(Statistic)
          .at(0)
          .find(Statistic.Label)
          .text()
      ).toBe('Non-foil');

      expect(
        wrapper
          .find(Statistic)
          .at(1)
          .find(Statistic.Value)
          .text()
      ).toBe('$1.01');
      expect(
        wrapper
          .find(Statistic)
          .at(1)
          .find(Statistic.Label)
          .text()
      ).toBe('Foil');
    });
  });

  describe('only usd available', () => {
    test('renders price', () => {
      const card = {
        prices: {
          usd: '0.01',
        },
      };

      const wrapper = mount(<PricesPane {...makeProps({ card })} />);

      expect(wrapper.find(Statistic)).toHaveLength(1);

      expect(
        wrapper
          .find(Statistic)
          .at(0)
          .find(Statistic.Value)
          .text()
      ).toBe('$0.01');
      expect(
        wrapper
          .find(Statistic)
          .at(0)
          .find(Statistic.Label)
          .text()
      ).toBe('Non-foil');
    });
  });

  describe('only usd_foil available', () => {
    test('renders price', () => {
      const card = {
        prices: {
          usd_foil: '1.01',
        },
      };

      const wrapper = mount(<PricesPane {...makeProps({ card })} />);

      expect(wrapper.find(Statistic)).toHaveLength(1);

      expect(
        wrapper
          .find(Statistic)
          .at(0)
          .find(Statistic.Value)
          .text()
      ).toBe('$1.01');
      expect(
        wrapper
          .find(Statistic)
          .at(0)
          .find(Statistic.Label)
          .text()
      ).toBe('Foil');
    });
  });

  describe('link to tcgplayer', () => {
    test('links using card info', () => {
      const card = {
        prices: {
          usd: '0.01',
        },
        purchase_uris: {
          tcgplayer: 'https://tcgplayer.com/some-card',
        },
      };

      const wrapper = mount(<PricesPane {...makeProps({ card })} />);

      expect(wrapper.find('a')).toHaveLength(1);
      expect(wrapper.find('a').prop('target')).toBe('_blank');
      expect(wrapper.find('a').prop('href')).toBe(
        'https://tcgplayer.com/some-card'
      );
    });
  });
});
