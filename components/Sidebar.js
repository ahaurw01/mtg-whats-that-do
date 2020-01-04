import PropTypes from 'prop-types';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';

const SiteSidebar = ({
  isOpen,
  isFullscreen,
  canGoFullscreen,
  onClose,
  onOpenShareModal,
  onClearCards,
  onToggleFullscreen,
}) => (
  <Sidebar
    as={Menu}
    animation="overlay"
    icon="labeled"
    onHide={onClose}
    vertical
    visible={isOpen}
    width="thin"
    direction="right"
  >
    <Menu.Item onClick={onOpenShareModal}>
      <Icon name="share alternate" />
      Share Link
    </Menu.Item>
    <Menu.Item as="a" onClick={onClearCards}>
      <Icon name="trash" />
      Clear Cards
    </Menu.Item>
    <Menu.Item
      as="a"
      href="https://github.com/ahaurw01/mtg-whats-that-do/issues"
      target="_blank"
    >
      <Icon name="github" />
      Feedback
    </Menu.Item>
    {canGoFullscreen && (
      <Menu.Item
        onClick={() => {
          onToggleFullscreen();
          onClose();
        }}
      >
        <Icon name={isFullscreen ? 'compress' : 'expand'} />
        {isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
      </Menu.Item>
    )}
  </Sidebar>
);

SiteSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  canGoFullscreen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpenShareModal: PropTypes.func.isRequired,
  onClearCards: PropTypes.func.isRequired,
  onToggleFullscreen: PropTypes.func.isRequired,
};

export default SiteSidebar;
