import cx from 'classnames';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const parse = value => {
  if (value == +value) {
    return <i key={value} className={cx('ms', `ms-${value}`)} />;
  }

  if (value === '*') {
    return <Icon key={value} name="star" />;
  }

  if (value.indexOf('+') > -1) {
    const parts = value.split('+');
    return (
      <span>
        {parts.map(part => parse(part)).reduce((acc, val, index, arr) => {
          acc.push(val);
          if (index < arr.length - 1) acc.push('+');
          return acc;
        }, [])}
      </span>
    );
  }

  // Fall back to initial value in case there are power/toughness values I don't know about.
  return value;
};

const PowerToughness = ({ power, toughness }) => (
  <span title={`Power ${power}, Toughness ${toughness}`}>
    {parse(power)}
    <i className={cx('ms', 'ms-power')} />
    {' / '}
    {parse(toughness)}
    <i className={cx('ms', 'ms-toughness')} />
  </span>
);

PowerToughness.propTypes = {
  power: PropTypes.string.isRequired,
  toughness: PropTypes.string.isRequired,
};

export default PowerToughness;
