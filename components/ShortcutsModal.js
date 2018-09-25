import PropTypes from 'prop-types';
import { List, Modal, Icon } from 'semantic-ui-react';
import './ShortcutsModal.css';

const ShortcutsModal = ({ isOpen, onClose }) => (
  <Modal closeIcon centered={false} onClose={onClose} open={isOpen}>
    <Modal.Header>
      <Icon name="keyboard" /> Shortcuts
    </Modal.Header>
    <Modal.Content>
      <List>
        <List.Item>
          <Icon name="close" />
          <List.Content>
            <List.Header>
              <kbd>esc</kbd>
            </List.Header>
            <List.Description>Close modals like this one.</List.Description>
          </List.Content>
        </List.Item>

        <List.Item>
          <Icon name="search" />
          <List.Content>
            <List.Header>
              <kbd>ctrl</kbd> + <kbd>p</kbd> or <kbd>⌘</kbd> + <kbd>p</kbd>
            </List.Header>
            <List.Description>Seach for a card.</List.Description>
          </List.Content>
        </List.Item>

        <List.Item>
          <Icon name="trash" />
          <List.Content>
            <List.Header>
              <kbd>ctrl</kbd> + <kbd>k</kbd> or <kbd>⌘</kbd> + <kbd>k</kbd>
            </List.Header>
            <List.Description>Clear cards.</List.Description>
          </List.Content>
        </List.Item>

        <List.Item>
          <Icon name="arrow right" />
          <List.Content>
            <List.Header>
              <kbd>ctrl</kbd> + <kbd>j</kbd> or <kbd>⌘</kbd> + <kbd>j</kbd>
            </List.Header>
            <List.Description>Focus the next card showing.</List.Description>
          </List.Content>
        </List.Item>

        <List.Item>
          <Icon name="arrow left" />
          <List.Content>
            <List.Header>
              <kbd>ctrl</kbd> + <kbd>h</kbd> or <kbd>⌘</kbd> + <kbd>h</kbd>
            </List.Header>
            <List.Description>
              Focus the previous card showing.
            </List.Description>
          </List.Content>
        </List.Item>

        <List.Item>
          <Icon name="info" />
          <List.Content>
            <List.Header>
              <kbd>o</kbd>
            </List.Header>
            <List.Description>
              Open the oracle modal for the focused card.
            </List.Description>
          </List.Content>
        </List.Item>

        <List.Item>
          <Icon name="legal" />
          <List.Content>
            <List.Header>
              <kbd>r</kbd>
            </List.Header>
            <List.Description>
              Open the rulings modal for the focused card.
            </List.Description>
          </List.Content>
        </List.Item>

        <List.Item>
          <Icon name="trash" />
          <List.Content>
            <List.Header>
              <kbd>k</kbd>
            </List.Header>
            <List.Description>Remove the focused card.</List.Description>
          </List.Content>
        </List.Item>

        <List.Item>
          <Icon name="pin" />
          <List.Content>
            <List.Header>
              <kbd>p</kbd>
            </List.Header>
            <List.Description>Pin the focused card.</List.Description>
          </List.Content>
        </List.Item>

        <List.Item>
          <Icon name="refresh" />
          <List.Content>
            <List.Header>
              <kbd>f</kbd>
            </List.Header>
            <List.Description>Flip the focused card.</List.Description>
          </List.Content>
        </List.Item>
      </List>
    </Modal.Content>
  </Modal>
);

ShortcutsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShortcutsModal;
