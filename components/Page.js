import PropTypes from 'prop-types';

const Page = ({ children }) => (
  <div>
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
