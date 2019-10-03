<template>
    <div class="page-container">
        <div class="page-content">
            <page-list-container/>
        </div>
        <page-pagination/>
    </div>
</template>

<script>
// модули
import store from '@/store'
import issues from '@/store/modules/issues'
import PageListContainer from './PageListContainer'
import PagePagination from './PagePagination'

store.registerModule('issues', {...issues})

export default {
    name: 'PageContent',
    components: {PagePagination, PageListContainer}
}
</script>

<style src="../assets/sass/components/PageContainer.scss" lang="scss"/>
