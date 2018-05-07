import { getImageUrl } from '../../utils/card-data';

describe('getImageUrl', () => {
  test('is empty string if card data is falsy', () => {
    expect(getImageUrl()).toBe('');
  });

  test('is image_uris.border_crop if no card faces', () => {
    const card = {
      image_uris: {
        border_crop: 'hi',
      },
    };

    expect(getImageUrl(card)).toBe('hi');
  });

  test('is first face image_uris.border_crop if faces exist', () => {
    const card = {
      card_faces: [
        {
          image_uris: {
            border_crop: 'hi',
          },
        },
      ],
    };

    expect(getImageUrl(card)).toBe('hi');
  });

  test('is given face image_uris.border_crop if faces exist', () => {
    const card = {
      card_faces: [
        {},
        {},
        {},
        {
          image_uris: {
            border_crop: 'hi',
          },
        },
      ],
    };

    expect(getImageUrl(card, 3)).toBe('hi');
  });
});
