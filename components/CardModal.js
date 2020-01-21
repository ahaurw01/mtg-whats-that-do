import PropTypes from 'prop-types';
import { Modal, Menu, Grid, Tab, Icon, Responsive } from 'semantic-ui-react';
import OraclePane from './OraclePane';
import RulingsPane from './RulingsPane';
import PrintingsPane from './PrintingsPane';
import PricesPane from './PricesPane';
import styles from './CardModal.css';

const CardModal = ({
  card,
  rulings,
  allPrintings,
  isOpen,
  onClose,
  onSelectPrinting,
}) => {
  const panes = [];
  panes.push({
    menuItem: (
      <Menu.Item key="oracle">
        <Icon name="eye" className={styles.menuIcon} />
        <Responsive
          as="span"
          minWidth={Responsive.onlyTablet.minWidth}
          className={styles.menuText}
        >
          Oracle
        </Responsive>
      </Menu.Item>
    ),
    render() {
      return <OraclePane card={card} />;
    },
  });
  if (rulings && rulings.length) {
    panes.push({
      menuItem: (
        <Menu.Item key="rulings">
          <Icon name="legal" className={styles.menuIcon} />
          <Responsive
            as="span"
            minWidth={Responsive.onlyTablet.minWidth}
            className={styles.menuText}
          >
            Rulings
          </Responsive>
        </Menu.Item>
      ),
      render() {
        return <RulingsPane card={card} rulings={rulings} />;
      },
    });
  }
  if (allPrintings && allPrintings.length > 1) {
    panes.push({
      menuItem: (
        <Menu.Item key="printings">
          <Icon name="picture" className={styles.menuIcon} />
          <Responsive
            as="span"
            minWidth={Responsive.onlyTablet.minWidth}
            className={styles.menuText}
          >
            Printings
          </Responsive>
        </Menu.Item>
      ),
      render() {
        return (
          <PrintingsPane
            allPrintings={allPrintings}
            onSelectPrinting={onSelectPrinting}
          />
        );
      },
    });
  }
  panes.push({
    menuItem: (
      <Menu.Item key="prices">
        <Icon name="dollar" className={styles.menuIcon} />
        <Responsive
          as="span"
          minWidth={Responsive.onlyTablet.minWidth}
          className={styles.menuText}
        >
          Prices
        </Responsive>
      </Menu.Item>
    ),
    render() {
      return <PricesPane card={card} allPrintings={allPrintings} />;
    },
  });

  return (
    <Modal closeIcon onClose={onClose} open={isOpen} centered={false}>
      <Modal.Header>
        <Icon name="info" /> {card.name}
      </Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Column mobile="16">
            <Tab panes={panes} />
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  );
};

CardModal.propTypes = {
  card: PropTypes.object.isRequired,
  rulings: PropTypes.arrayOf(
    PropTypes.shape({
      published_at: PropTypes.string,
      source: PropTypes.string,
      comment: PropTypes.string,
    })
  ).isRequired,
  allPrintings: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectPrinting: PropTypes.func.isRequired,
};

export default CardModal;
