<template>
    <div id="app">
        <page-header />
        <page-content />
    </div>
</template>

<script>
    import PageHeader from './components/PageHeader.vue'
    import PageContent from './components/PageContent.vue'

    export default {
        name: 'app',
        components: {
            PageHeader,
            PageContent
        }
    }
</script>

<style src="../src/assets/sass/app.scss" lang="scss"/>
