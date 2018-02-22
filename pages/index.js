import Page from '../components/Page';
import CardManager from '../components/CardManager';
import MainHeader from '../components/MainHeader';

let _cardManager;
const onClearCards = () => _cardManager && _cardManager.clearCards();

const Index = () => (
  <Page>
    <MainHeader onClearCards={onClearCards} />
    <CardManager
      ref={cardManager => {
        _cardManager = cardManager;
      }}
    />
  </Page>
);

export default Index;
