import PropTypes from 'prop-types';

const Page = ({ children }) => (
  <div>
    {children}
    <style jsx global>{`
      html {
        background: lightgrey;
      }
    `}</style>
  </div>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
