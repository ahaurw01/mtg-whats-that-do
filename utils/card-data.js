export const getImageUrl = (card, faceIndex = 0) => {
  if (!card) return '';

  if (card.card_faces) {
    return card.card_faces[faceIndex].image_uris.border_crop;
  }

  return card.image_uris.border_crop;
};
