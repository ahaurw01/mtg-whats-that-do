import Page from '../components/Page';
import CardManager from '../components/CardManager';
import { Header } from 'semantic-ui-react';

const Index = () => (
  <Page>
    <Header as="h1" block>
      {"What's that do?"}
    </Header>
    <CardManager />
  </Page>
);

export default Index;
