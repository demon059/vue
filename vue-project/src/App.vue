<template>
    <main id="app">
        <page-header />
        <page-content />
    </main>
</template>

<script>
    import PageHeader from './components/PageHeader.vue'
    import PageContent from './components/PageContainer.vue'
    import '@/assets/sass/app.scss'

    export default {
        name: 'app',
        components: {
            PageHeader,
            PageContent
        }
    }
</script>
