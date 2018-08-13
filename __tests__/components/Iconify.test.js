import Iconify from '../../components/Iconify';
import { mount } from 'enzyme';
import { Icon } from 'semantic-ui-react';

const render = (children, shadow = false) =>
  mount(
    <span>
      <Iconify shadow={shadow}>{children}</Iconify>
    </span>
  );

describe('Iconify', () => {
  test('leaves plain text alone', () => {
    const wrapper = render('hi');

    expect(wrapper.text()).toBe('hi');
  });

  test('converts icon within other text', () => {
    const wrapper = render('You gotta pay {7} or lose the game.');

    expect(wrapper.html()).toContain(
      'You gotta pay <i class="ms ms-7 ms-cost" title="{7}"></i> or lose the game.'
    );
  });

  test('converts sibling icons', () => {
    const wrapper = render('{1}{G}{B}');

    expect(wrapper.find('i')).toHaveLength(3);
    expect(
      wrapper
        .find('i')
        .at(0)
        .prop('className')
    ).toBe('ms ms-1 ms-cost');
    expect(
      wrapper
        .find('i')
        .at(0)
        .prop('title')
    ).toBe('{1}');
    expect(
      wrapper
        .find('i')
        .at(1)
        .prop('className')
    ).toBe('ms ms-g ms-cost');
    expect(
      wrapper
        .find('i')
        .at(1)
        .prop('title')
    ).toBe('{G}');
    expect(
      wrapper
        .find('i')
        .at(2)
        .prop('className')
    ).toBe('ms ms-b ms-cost');
    expect(
      wrapper
        .find('i')
        .at(2)
        .prop('title')
    ).toBe('{B}');
  });

  test('applies shadow class', () => {
    const wrapper = render('{100}', true);

    expect(wrapper.find('i')).toHaveLength(1);
    expect(
      wrapper
        .find('i')
        .at(0)
        .prop('className')
    ).toBe('ms ms-100 ms-cost ms-shadow');
    expect(
      wrapper
        .find('i')
        .at(0)
        .prop('title')
    ).toBe('{100}');
  });

  describe('beginning of line', () => {
    test('converts 0:', () => {
      const wrapper = render('0: give up');

      expect(wrapper.html()).toBe(
        '<span><i title="0 Loyalty" class="ms ms-loyalty-zero ms-loyalty-0"></i>: give up</span>'
      );
    });

    test('converts −3:', () => {
      const wrapper = render('−3: do a cool thing');

      expect(wrapper.html()).toBe(
        '<span><i title="-3 Loyalty" class="ms ms-loyalty-down ms-loyalty-3"></i>: do a cool thing</span>'
      );
    });

    test('converts +1:', () => {
      const wrapper = render('+1: do a mediocre thing');

      expect(wrapper.html()).toBe(
        '<span><i title="+1 Loyalty" class="ms ms-loyalty-up ms-loyalty-1"></i>: do a mediocre thing</span>'
      );
    });
  });
});
