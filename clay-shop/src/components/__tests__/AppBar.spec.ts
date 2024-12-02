import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppBar from '../AppBar.vue'

describe('AppBar', () => {
  it('appbar renders properly', () => {
    const wrapper = mount(AppBar)
    expect(wrapper.text()).toContain('Home')
  })
})
