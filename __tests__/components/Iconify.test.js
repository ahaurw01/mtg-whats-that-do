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
});
