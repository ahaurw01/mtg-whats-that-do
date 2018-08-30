import {
  getImageSources,
  isDoubleFaced,
  getOracleData,
} from '../../utils/card-data';

describe('getImageSources', () => {
  test('is empty array if card data is falsy', () => {
    expect(getImageSources()).toEqual([]);
  });

  test('is [image_uris.large] if no card faces', () => {
    const card = {
      image_uris: {
        large: 'hi',
      },
    };

    expect(getImageSources(card)).toEqual(['hi']);
  });

  test('is image_uris.large entries if faces exist', () => {
    const card = {
      card_faces: [
        {
          image_uris: {
            large: 'hi',
          },
        },
        {
          image_uris: {
            large: 'bye',
          },
        },
      ],
    };

    expect(getImageSources(card)).toEqual(['hi', 'bye']);
  });
});

describe('isDoubleFaced', () => {
  test('is false if card is null', () => {
    expect(isDoubleFaced(null)).toBe(false);
  });

  test('is false if no card_faces', () => {
    const card = {};

    expect(isDoubleFaced(card)).toBe(false);
  });

  test('is true if has card_faces with images', () => {
    const card = {
      card_faces: [{ image_uris: [] }, { image_uris: [] }],
    };

    expect(isDoubleFaced(card)).toBe(true);
  });

  test('is false if has card_faces without images', () => {
    const card = {
      card_faces: [],
    };

    expect(isDoubleFaced(card)).toBe(false);
  });
});

describe('getOracleData', () => {
  test('is null if card is null', () => {
    expect(getOracleData(null)).toBe(null);
  });

  test('is an array of one object for single faced card', () => {
    const card = {
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
    };
    expect(getOracleData(card)).toEqual([
      {
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
      },
    ]);
  });

  test('is an array of two objects for double faced card', () => {
    const card = {
      card_faces: [
        {
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
        },
        {
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
        },
      ],
    };
    expect(getOracleData(card)).toEqual([
      {
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
      },
      {
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
      },
    ]);
  });
});
