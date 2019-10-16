<template>
    <section class="page-container">
        <div class="page-content">
            <page-list-container/>
        </div>
        <page-pagination/>
    </section>
</template>

<script>
// модули
import store from '@/store'
import issues from '@/store/modules/issues'
import PageListContainer from './PageListContainer'
import PagePagination from './PagePagination'

import '@/assets/sass/components/PageContainer.scss'

store.registerModule('issues', {...issues})

export default {
    name: 'PageContent',
    components: {PagePagination, PageListContainer}
}
</script>
