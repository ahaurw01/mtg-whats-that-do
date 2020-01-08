import { Component } from 'react';
import screenfull from 'screenfull';
import Page from '../components/Page';
import CardManager from '../components/CardManager';
import MainHeader from '../components/MainHeader';
import StorageErrorBoundary from '../components/StorageErrorBoundary';
import Sidebar from '../components/Sidebar';
import ShareModal from '../components/ShareModal';
import ShortcutsModal from '../components/ShortcutsModal';
import CardFinderModal from '../components/CardFinderModal';
import Presser from '../utils/presser';
import mixpanel from '../utils/mixpanel';
import MixpanelInit from '../components/MixpanelInit';

export default class Index extends Component {
  state = {
    isShareModalOpen: false,
    isSidebarOpen: false,
    isShortcutsOpen: false,
    isCardFinderModalOpen: false,
    isFullscreen: false,
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
    mixpanel.track('Add Card', { name });
    this.cardManager.addCard(name);
    this.closeCardFinderModal();
  };

  setFullscreenState = () => {
    const { isFullscreen } = screenfull;
    this.setState({ isFullscreen });
  };

  toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      if (this.state.isFullscreen) screenfull.exit();
      else screenfull.request();
    }
  };

  componentDidMount() {
    mixpanel.track('Page Load');

    this.presser = new Presser();
    this.presser.on('clear', this.clearCards);
    this.presser.on('search', this.openCardFinderModal);

    if (screenfull.isEnabled) screenfull.on('change', this.setFullscreenState);
  }

  componentWillUnmount() {
    this.presser.off();
    if (screenfull.isEnabled) screenfull.off('change', this.setFullscreenState);
  }

  render() {
    const {
      isShareModalOpen,
      isSidebarOpen,
      isShortcutsOpen,
      isCardFinderModalOpen,
      isFullscreen,
    } = this.state;
    return (
      <Page>
        <MixpanelInit token={process.env.MIXPANEL_TOKEN} />
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
            isFullscreen={isFullscreen}
            canGoFullscreen={screenfull.isEnabled}
            onClose={this.closeSidebar}
            onOpenShareModal={this.openShareModal}
            onClearCards={this.clearCards}
            onToggleFullscreen={this.toggleFullscreen}
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
