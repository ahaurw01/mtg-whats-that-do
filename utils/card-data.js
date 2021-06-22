export const getImageSourcesByType = (card, type) => {
  if (!card) return [];

  if (card.image_uris && card.image_uris[type]) {
    return [card.image_uris[type]];
  }

  if (card.card_faces) {
    return card.card_faces.map(face => face.image_uris[type]);
  }

  return [];
};

export const getImageSources = card => getImageSourcesByType(card, 'large');
export const getHighResImageSources = card => {
  const pngSources = getImageSourcesByType(card, 'png');
  return pngSources.length > 0 ? pngSources : getImageSources();
};

export const isDoubleFaced = card =>
  !!card &&
  !!card.card_faces &&
  card.card_faces.length > 1 &&
  !!card.card_faces[1].image_uris;

/**
 * Extract oracle data from the card. There may be two items if the card is
 * double faced.
 *
 * @param {Object} card   Card object.
 *
 * @return {Object[]|null} Array of oracle info.
 */
export const getOracleData = card => {
  if (!card) return null;

  const mapper = face => ({
    color_identity: face.color_identity,
    mana_cost: face.mana_cost,
    name: face.name,
    oracle_text: face.oracle_text,
    power: face.power,
    toughness: face.toughness,
    type_line: face.type_line,
    flavor_text: face.flavor_text,
    loyalty: face.loyalty,
  });

  return card.card_faces ? card.card_faces.map(mapper) : [mapper(card)];
};

/**
 * Find the first card object that is for paper magic. If no such card is found,
 * provide the first one.
 *
 * @param {Object[]} cards  Card objects
 *
 * @return {Object} Card object from the array.
 */
export const getFirstPaperCard = (cards = []) => {
  return (
    cards.find(({ games = [] }) => games.indexOf('paper') > -1) || cards[0]
  );
};
