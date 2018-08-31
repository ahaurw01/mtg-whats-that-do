import { Component } from 'react';
import Page from '../components/Page';
import CardManager from '../components/CardManager';
import MainHeader from '../components/MainHeader';
import StorageErrorBoundary from '../components/StorageErrorBoundary';
import Sidebar from '../components/Sidebar';
import ShareModal from '../components/ShareModal';

export default class Index extends Component {
  state = {
    isShareModalOpen: false,
    isSidebarOpen: false,
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

  clearCards = () => {
    this.cardManager.clearCards();
    this.closeSidebar();
  };

  render() {
    const { isShareModalOpen, isSidebarOpen } = this.state;
    return (
      <Page>
        <StorageErrorBoundary>
          <MainHeader
            onOpenSidebar={this.openSidebar}
            onClearCards={this.clearCards}
            onOpenShareModal={this.openShareModal}
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
        </StorageErrorBoundary>
      </Page>
    );
  }
}
