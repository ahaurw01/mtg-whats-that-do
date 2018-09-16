import PropTypes from 'prop-types';
import { List, Modal, Icon } from 'semantic-ui-react';

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
    <style global jsx>{`
      kbd {
        min-width: 1.8em;
        margin-bottom: 0.5em;
        color: #444444;
        font-family: 'Lucida Grande', Lucida, Verdana, sans-serif;
        font-weight: normal;
        font-style: normal;
        text-align: center;
        line-height: 1em;
        text-shadow: 0 1px 0 #fff;
        display: inline-block;
        padding: 0.3em 0.55em;
        border-radius: 6px;
        background-clip: padding-box;
        border: 1px solid #bbb;
        background-color: #f7f7f7;
        background-image: linear-gradient(
          top,
          rgba(0, 0, 0, 0.1),
          rgba(0, 0, 0, 0)
        );
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(
            startColorstr='#1a000000',
            endColorstr='#00000000',
            GradientType=0
          );
        box-shadow: 0px 2px 0 #bbbbbb, 0 3px 1px #999999, 0 3px 0 #bbbbbb,
          inset 0 1px 1px #ffffff, inset 0 -1px 3px #cccccc;
      }
    `}</style>
  </Modal>
);

ShortcutsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShortcutsModal;
