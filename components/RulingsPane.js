import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tab, Comment, Grid } from 'semantic-ui-react';
import WizardsIcon from './WizardsIcon';
import ScryfallIcon from './ScryfallIcon';
import { getImageSources, isDoubleFaced } from '../utils/card-data';
import Iconify from './Iconify';
import CardImage from './CardImage';
import mixpanel from '../utils/mixpanel';

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

const RulingsPane = ({ card, rulings }) => {
  useEffect(() => {
    mixpanel.track('View Rulings', { name: card.name });
  }, []);

  return (
    <Tab.Pane>
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
                    <Comment.Text>
                      <Iconify>{comment}</Iconify>
                    </Comment.Text>
                  </Comment.Content>
                </Comment>
              ))}
          </Comment.Group>
        </Grid.Column>
        <Grid.Column only="computer" width="4">
          <CardImage sources={getImageSources(card)} indexShowing={0} />
          {isDoubleFaced(card) && (
            <CardImage sources={getImageSources(card)} indexShowing={1} />
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

RulingsPane.propTypes = {
  card: PropTypes.object.isRequired,
  rulings: PropTypes.arrayOf(
    PropTypes.shape({
      published_at: PropTypes.string,
      source: PropTypes.string,
      comment: PropTypes.string,
    })
  ).isRequired,
};

export default RulingsPane;
