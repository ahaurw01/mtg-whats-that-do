import { Component } from 'react';
import Page from '../components/Page';
import CardManager from '../components/CardManager';
import MainHeader from '../components/MainHeader';
import StorageErrorBoundary from '../components/StorageErrorBoundary';
import Sidebar from '../components/Sidebar';
import ShareModal from '../components/ShareModal';
import ShortcutsModal from '../components/ShortcutsModal';
import CardFinderModal from '../components/CardFinderModal';
import Presser from '../utils/presser';

export default class Index extends Component {
  state = {
    isShareModalOpen: false,
    isSidebarOpen: false,
    isShortcutsOpen: false,
    isCardFinderModalOpen: false,
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

  openCardFinderModal = () => {
    this.setState({ isCardFinderModalOpen: true });
  };

  closeCardFinderModal = () => {
    this.setState({ isCardFinderModalOpen: false });
  };

  clearCards = () => {
    this.cardManager.clearCards();
    this.closeSidebar();
  };

  cardSelected = name => {
    this.cardManager.addCard(name);
    this.closeCardFinderModal();
  };

  goFullscreen = () => {
    document.documentElement.requestFullscreen();
  };

  componentDidMount() {
    this.presser = new Presser();
    this.presser.on('clear', this.clearCards);
    this.presser.on('search', this.openCardFinderModal);
  }

  componentWillUnmount() {
    this.presser.off();
  }

  render() {
    const {
      isShareModalOpen,
      isSidebarOpen,
      isShortcutsOpen,
      isCardFinderModalOpen,
    } = this.state;
    return (
      <Page>
        <StorageErrorBoundary>
          <MainHeader
            onOpenSidebar={this.openSidebar}
            onClearCards={this.clearCards}
            onOpenShareModal={this.openShareModal}
            onOpenShortcutsModal={this.openShortcutsModal}
            onOpenCardFinderModal={this.openCardFinderModal}
          />
          <CardManager ref={cardManager => (this.cardManager = cardManager)} />
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={this.closeSidebar}
            onOpenShareModal={this.openShareModal}
            onClearCards={this.clearCards}
            onGoFullscreen={this.goFullscreen}
          />
          <ShareModal
            isOpen={isShareModalOpen}
            onClose={this.closeShareModal}
          />
          <ShortcutsModal
            isOpen={isShortcutsOpen}
            onClose={this.closeShortcutsModal}
          />
          <CardFinderModal
            isOpen={isCardFinderModalOpen}
            onClose={this.closeCardFinderModal}
            onCardSelected={this.cardSelected}
          />
        </StorageErrorBoundary>
      </Page>
    );
  }
}
