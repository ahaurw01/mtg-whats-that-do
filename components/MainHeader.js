import PropTypes from 'prop-types';
import { Header, Menu } from 'semantic-ui-react';

const MainHeader = ({ onClearCards }) => (
  <Header
    as="h1"
    block
    style={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <span
      style={{
        flex: 1,
      }}
    >
      {"What's that do?"}
    </span>
    <Menu
      size="tiny"
      style={{
        margin: 0,
      }}
    >
      <Menu.Item name="Clear cards" onClick={onClearCards} />
      <Menu.Item
        as="a"
        href="https://github.com/ahaurw01/mtg-whats-that-do/issues"
        target="_blank"
        name="feedback"
      />
    </Menu>
  </Header>
);

MainHeader.propTypes = {
  onClearCards: PropTypes.func.isRequired,
};

export default MainHeader;
