import { Component } from 'react';
import Page from '../components/Page';
import CardManager from '../components/CardManager';
import MainHeader from '../components/MainHeader';
import StorageErrorBoundary from '../components/StorageErrorBoundary';
import Sidebar from '../components/Sidebar';
import ShareModal from '../components/ShareModal';
import ShortcutsModal from '../components/ShortcutsModal';
import * as presser from '../utils/presser';

export default class Index extends Component {
  state = {
    isShareModalOpen: false,
    isSidebarOpen: false,
    isShortcutsOpen: false,
  };

  openShareModal = () => {
    this.setState({ isShareModalOpen: true, isSidebarOpen: false });
  };

  closeShareModal = () => {
    this.setState({ isShareModalOpen: false });
  };

  openSidebar = () => {
    this.setState({ isSidebarOpen: true });
  };

  closeSidebar = () => {
    this.setState({ isSidebarOpen: false });
  };

  openShortcutsModal = () => {
    this.setState({ isShortcutsOpen: true });
  };

  closeShortcutsModal = () => {
    this.setState({ isShortcutsOpen: false });
  };

  clearCards = () => {
    this.cardManager.clearCards();
    this.closeSidebar();
  };

  componentDidMount() {
    presser.on('clear', this.clearCards);
  }

  componentWillUnmount() {
    presser.off('clear', this.clearCards);
  }

  render() {
    const { isShareModalOpen, isSidebarOpen, isShortcutsOpen } = this.state;
    return (
      <Page>
        <StorageErrorBoundary>
          <MainHeader
            onOpenSidebar={this.openSidebar}
            onClearCards={this.clearCards}
            onOpenShareModal={this.openShareModal}
            onOpenShortcutsModal={this.openShortcutsModal}
          />
          <CardManager ref={cardManager => (this.cardManager = cardManager)} />
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={this.closeSidebar}
            onOpenShareModal={this.openShareModal}
            onClearCards={this.clearCards}
          />
          <ShareModal
            isOpen={isShareModalOpen}
            onClose={this.closeShareModal}
          />
          <ShortcutsModal
            isOpen={isShortcutsOpen}
            onClose={this.closeShortcutsModal}
          />
        </StorageErrorBoundary>
      </Page>
    );
  }
}
