import PropTypes from 'prop-types';
import Head from 'next/head';

const Page = ({ children }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"
      />
      <link
        href="//cdn.jsdelivr.net/npm/mana-font@1.4.1/css/mana.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <title>{"What's that do?"}</title>
      <link rel="shortcut icon" href="/static/favicon.png" />
      <link rel="manifest" href="/static/manifest.json" />
    </Head>
    {children}
  </div>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
