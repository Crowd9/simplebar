import { shallowMount, mount } from '@vue/test-utils';
import simplebar from '../index.vue';

describe('simplebar', () => {
  it('renders without crashing', () => {
    const wrapper = shallowMount(simplebar);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with options', () => {
    const wrapper = shallowMount(simplebar, {
      propsData: { 'data-simplebar-auto-hide': 'false' }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with default slot', () => {
    const wrapper = shallowMount(simplebar, {
      slots: {
        default: '<div class="inner-content" />'
      }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('can access SimpleBar instance', () => {
    const wrapper = shallowMount(simplebar);
    expect(wrapper.vm.SimpleBar).toBeDefined();
  });

  it('can access scrollElement property', () => {
    const wrapper = shallowMount(simplebar);
    const scrollElement = wrapper.vm.scrollElement;

    expect(scrollElement).toEqual(
      wrapper.find('.simplebar-content-wrapper').element
    );
  });

  it('can access contentElement property', () => {
    const wrapper = shallowMount(simplebar);
    const scrollElement = wrapper.vm.contentElement;

    expect(scrollElement).toEqual(wrapper.find('.simplebar-content').element);
  });

  it('works with options as attribute', () => {
    const wrapper = shallowMount(simplebar, {
      propsData: { 'data-simplebar-auto-hide': 'false' }
    });
    expect(wrapper.vm.SimpleBar.options.autoHide).toEqual(false);
  });

  // more test setup is required to actually test the interaction (read jsdom)
  // and ensure the listeners is attached to the actual scrollElement
  it('emits a scroll listener', async () => {
    const scrollSpy = jest.fn();
    const wrapper = mount(simplebar, {
      attachTo: document.body,
      listeners: {
        scroll: scrollSpy
      }
    });

    wrapper.vm.$emit('scroll', { x: 0, y: 100 });

    expect(scrollSpy).toHaveBeenCalledTimes(1);
    expect(scrollSpy).toHaveBeenCalledWith({ x: 0, y: 100 });
  });
});
