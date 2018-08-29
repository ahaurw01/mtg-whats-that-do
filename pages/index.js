import Page from '../components/Page';
import CardManager from '../components/CardManager';
import MainHeader from '../components/MainHeader';
import StorageErrorBoundary from '../components/StorageErrorBoundary';

let _cardManager;
const onClearCards = () => _cardManager && _cardManager.clearCards();

const Index = () => (
  <Page>
    <StorageErrorBoundary>
      <MainHeader onClearCards={onClearCards} />
      <CardManager
        ref={cardManager => {
          _cardManager = cardManager;
        }}
      />
    </StorageErrorBoundary>
  </Page>
);

export default Index;
