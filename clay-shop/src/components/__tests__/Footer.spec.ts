import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CustomFooter from '../CustomFooter.vue'

describe('Footer', () => {
  it('footer renders properly', () => {
    const wrapper = mount(CustomFooter)
    expect(wrapper.text()).toContain('Fashion is a popular aesthetic expression at a particular time, place, and in a specific context, especially in clothing, lifestyle, and makeup.')
  })
})
