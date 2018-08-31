import { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Menu } from 'semantic-ui-react';

export default class MainHeader extends Component {
  static propTypes = {
    // onClearCards: PropTypes.func.isRequired,
    onOpenSidebar: PropTypes.func.isRequired,
  };

  state = {
    isShareModalOpen: false,
    isSidebarOpen: false,
  };

  render() {
    const { onOpenSidebar } = this.props;
    const { isShareModalOpen, isSidebarOpen } = this.state;
    return (
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
          {/* <Menu.Item name="Share link" onClick={this.openShareModal} />
          <Menu.Item name="Clear cards" onClick={onClearCards} />
          <Menu.Item
            as="a"
            href="https://github.com/ahaurw01/mtg-whats-that-do/issues"
            target="_blank"
            name="feedback"
          /> */}
          <Menu.Item name="Menu" onClick={onOpenSidebar} />
        </Menu>
      </Header>
    );
  }
}
