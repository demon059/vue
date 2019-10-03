<template>
    <div class="list-layout">
        <div class="list-header space">
            <div class="list-count">
                {{issues.itemsTotalCount}} Open
            </div>
            <div class="list-actions">
                <details class="list-menu">
                    <summary>Sort</summary>
                    <div class="list-menu-modal">
                        <div class="list-menu-header">
                            <span class="select-menu-title">Sort by</span>
                        </div>
                        <div class="list-menu-content">
                            <div class="list-menu-item" v-for="(item, index) in sortList"
                                 @click="selectSort({key: item.key})"
                                 :key="index"
                                 :class="{active: item.key === issues.sort}">
                                {{item.name}}
                            </div>
                        </div>
                    </div>
                </details>
            </div>
        </div>
        <div class="list-content space" :class="{ loader: issues.listLoading }">
            <div class="list-item" v-for="(item, key) in issuesList" :key="key">
                <div class="list-item__content">
                    <div class="list-item__link">
                        <a href="">
                            {{item.title}}
                        </a>
                        <a href="" v-for="(label, key) in item.labels" :key="key" class="tag"
                           :style="{'background-color': '#' + label.color}">
                            {{label.name}}
                        </a>
                    </div>
                    <div class="list-item__small-text">
                        #{{item.number}} opened yesterday by {{authorName(item.user)}}
                    </div>
                </div>
                <div class="list-item__comments" v-if="item.comments > 0">
                    <div class="list-item__comments-icon"></div>
                    <div class="list-item__comments-count">
                        {{item.comments}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // helpers
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'PageListContainer',
        data () {
            return {
                sortList: [
                    {
                        name: 'Newest',
                        key: 'created-desc'
                    },
                    {
                        name: 'Oldest',
                        key: 'created-asc'
                    },
                    {
                        name: 'Most commented',
                        key: 'comments-desc'
                    },
                    {
                        name: 'Least updated',
                        key: 'comments-asc'
                    },
                    {
                        name: 'Recently updated',
                        key: 'updated-desc'
                    },
                    {
                        name: 'Least recently updated',
                        key: 'updated-asc'
                    },
                    {
                        name: 'Most reactions',
                        key: 'reactions-smile-desc'
                    }
                ]
            }
        },
        computed: {
            ...mapState('issues', [
                'issues'
            ]),

            // Список вопросов
            issuesList() {
                return this.issues.list
            },
        },
        methods: {
            ...mapActions('issues', [
                'loadIssuesList',
                'selectSort'
            ]),

            // Автор вопроса
            authorName(item) {
                return item.login
            },

            closeDetails () {
                let details = document.querySelectorAll('details')
                details.forEach((detail) => {
                    detail.removeAttribute('open')
                })
            }
        },
        beforeMount () {
            // Загрузка списка вопросов
            this.loadIssuesList()
        },
        mounted () {
            window.addEventListener('click', this.closeDetails, false)
        },
        beforeDestroy () {
            window.removeEventListener('click', this.closeDetails, false)
        }
    }
</script>
