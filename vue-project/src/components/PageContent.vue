<template>
    <div class="content">
        <div class="list-layout">
            <div class="list-header space">
                <div class="list-count">
                    244 Open
                </div>
            </div>
            <div class="list-content space">
                <div class="list-item">
                    <div class="list-item__content">
                        <div class="list-item__link">
                            <a href="">
                                componentInstance is undefined with v-slot syntax on this.$slots[slots] VNodes
                            </a>
                            <a href="">
                                <span class="tag">
                                    bug
                                </span>
                            </a>
                        </div>
                        <div class="list-item__small-text">
                            #10554 opened yesterday by petr001
                        </div>
                    </div>
                    <div class="list-item__comments">
                        <div class="list-item__comments-icon"></div>
                        <div class="list-item__comments-count">
                            12
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // helpers
    import {mapState, mapActions} from 'vuex'

    // модули
    import store from '@/store'
    import issues from '@/store/modules/issues'

    store.registerModule('issues', {...issues})

    export default {
        name: 'PageContent',
        computed: {
            ...mapState('issues', [
                'issues'
            ])
        },
        methods: {
            ...mapActions('issues', [
                'loadIssuesList'
            ])
        },
        beforeMount () {
            this.loadIssuesList()
        }
    }
</script>

<style src="../assets/sass/components/PageContent.scss" lang="scss"/>
