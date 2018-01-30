import Page from '../components/Page';
import CardFinder from '../components/CardFinder';

export default () => (
  <Page>
    <h1>What's that do?</h1>
    <CardFinder onCardSelected={name => console.log(name)} />
  </Page>
);
