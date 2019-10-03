import {shallowMount} from '@vue/test-utils'
import PageHeader from '../src/components/PageHeader'

describe('PageListContainer.vue', () => {
    it('Содержит ли header текст LIST ISSUES ', () => {
        const text = 'LIST ISSUES'
        const wrapper = shallowMount(PageHeader)
        expect(wrapper.text()).toBe(text)
        // console.log(wrapper)
    })
})
