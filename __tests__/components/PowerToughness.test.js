import PowerToughness from '../../components/PowerToughness';
import { shallow } from 'enzyme';
import { Icon } from 'semantic-ui-react';

describe('PowerToughness', () => {
  test('renders numbers', () => {
    const wrapper = shallow(<PowerToughness power="3" toughness="7" />);

    expect(wrapper.find('i')).toHaveLength(4);
    expect(
      wrapper
        .find('i')
        .at(0)
        .is('.ms-3')
    ).toBe(true);
    expect(
      wrapper
        .find('i')
        .at(1)
        .is('.ms-power')
    ).toBe(true);
    expect(
      wrapper
        .find('i')
        .at(2)
        .is('.ms-7')
    ).toBe(true);
    expect(
      wrapper
        .find('i')
        .at(3)
        .is('.ms-toughness')
    ).toBe(true);
    expect(wrapper.html()).toContain(' / ');
  });

  test('renders stars', () => {
    const wrapper = shallow(<PowerToughness power="*" toughness="*" />);

    expect(wrapper.find('i')).toHaveLength(2);
    expect(wrapper.find(Icon)).toHaveLength(2);
    expect(
      wrapper
        .find(Icon)
        .at(0)
        .prop('name')
    ).toBe('star');
    expect(
      wrapper
        .find(Icon)
        .at(1)
        .prop('name')
    ).toBe('star');
    expect(
      wrapper
        .find('i')
        .at(0)
        .is('.ms-power')
    ).toBe(true);

    expect(
      wrapper
        .find('i')
        .at(1)
        .is('.ms-toughness')
    ).toBe(true);
    expect(wrapper.html()).toContain(' / ');
  });

  test('renders number plus star', () => {
    const wrapper = shallow(<PowerToughness power="1+*" toughness="2+*" />);

    expect(wrapper.html()).toBe(
      '<span title="Power 1+*, Toughness 2+*"><span><i class="ms ms-1"></i>+<i aria-hidden="true" class="star icon"></i></span><i class="ms ms-power"></i> / <span><i class="ms ms-2"></i>+<i aria-hidden="true" class="star icon"></i></span><i class="ms ms-toughness"></i></span>'
    );
  });

  test('sets title', () => {
    const wrapper = shallow(<PowerToughness power="17" toughness="*" />);

    expect(wrapper.prop('title')).toBe('Power 17, Toughness *');
  });

  test('renders negative numbers', () => {
    const wrapper = shallow(<PowerToughness power="-1" toughness="-2" />);

    expect(wrapper.html()).toBe(
      '<span title="Power -1, Toughness -2">-<i class="ms ms-1"></i><i class="ms ms-power"></i> / -<i class="ms ms-2"></i><i class="ms ms-toughness"></i></span>'
    );
  });
});
