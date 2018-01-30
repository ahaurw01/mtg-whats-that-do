import PropTypes from 'prop-types';
import Head from 'next/head';

const Page = ({ children }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    {children}
    <style jsx global>{`
      html {
        background: lightgrey;
        /*System fonts:*/
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol';
      }
      h1 {
        text-align: center;
      }
      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
