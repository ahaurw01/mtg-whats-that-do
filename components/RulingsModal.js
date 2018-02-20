import PropTypes from 'prop-types';
import { Button, Modal, Comment, Grid, Icon } from 'semantic-ui-react';
import WizardsIcon from './WizardsIcon';
import ScryfallIcon from './ScryfallIcon';

const makeCommentData = ruling => {
  let source;
  let avatar;
  switch (ruling.source) {
    case 'scryfall':
      source = 'Scryfall';
      avatar = <ScryfallIcon />;
      break;
    case 'wotc':
      source = 'Wizards';
      avatar = <WizardsIcon />;
      break;
    default:
      source = ruling.source;
      avatar = null;
  }

  const publishedAt = ruling.published_at;
  const comment = ruling.comment;

  return {
    comment,
    publishedAt,
    source,
    avatar,
  };
};

const RulingsModal = ({ card, rulings }) => (
  <Modal trigger={<Button primary>Rulings</Button>}>
    <Modal.Header>
      <Icon name="legal" /> Rulings: {card.name}
    </Modal.Header>
    <Modal.Content>
      <Grid>
        <Grid.Column computer="12" mobile="16">
          <Comment.Group>
            {rulings
              .map(makeCommentData)
              .map(({ comment, publishedAt, source, avatar }) => (
                <Comment key={comment}>
                  <div className="avatar">{avatar}</div>
                  <Comment.Content>
                    <Comment.Author as="span">{source}</Comment.Author>
                    <Comment.Metadata as="span">{publishedAt}</Comment.Metadata>
                    <Comment.Text>{comment}</Comment.Text>
                  </Comment.Content>
                </Comment>
              ))}
          </Comment.Group>
        </Grid.Column>
        <Grid.Column only="computer" width="4">
          <img src={card.image_uris.border_crop} />
        </Grid.Column>
      </Grid>
    </Modal.Content>
    <style jsx>{`
      img {
        width: 100%;
        border-radius: 4px;
      }
    `}</style>
  </Modal>
);

RulingsModal.propTypes = {
  card: PropTypes.shape({
    image_uris: PropTypes.shape({
      border_crop: PropTypes.string,
    }),
    name: PropTypes.string,
  }).isRequired,
  rulings: PropTypes.arrayOf(
    PropTypes.shape({
      published_at: PropTypes.string,
      source: PropTypes.string,
      comment: PropTypes.string,
    })
  ).isRequired,
};

export default RulingsModal;
