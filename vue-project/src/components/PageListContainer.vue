<template>
    <div class="list-layout">
        <header class="list-header space">
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
        </header>
        <ul class="list-content space" :class="{ loader: issues.listLoading }">
            <li class="list-item" v-for="(item, key) in issuesList" :key="key">
                <div class="list-item__content">
                    <div class="list-item__link">
                        <a href="#" class="list-item__link-title">
                            {{item.title}}
                        </a>
                        <a href="#" v-for="(label, key) in item.labels" :key="key" class="tag"
                           :style="{'background-color': '#' + label.color, 'color': '#' + getContrastYIQ(label.color)}">
                            {{label.name}}
                        </a>
                    </div>
                    <div class="list-item__small-text">
                        #{{item.number}} opened {{date(item.created_at)}} by {{authorName(item.user)}}
                    </div>
                </div>
                <div class="list-item__comments" v-if="item.comments > 0">
                    <div class="list-item__comments-icon"></div>
                    <div class="list-item__comments-count">
                        {{item.comments}}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    // helpers
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'PageListContainer',
        data() {
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

            closeDetails() {
                let details = document.querySelectorAll('details')
                details.forEach((detail) => {
                    detail.removeAttribute('open')
                })
            },
            date(date) {
                let currentDate = new Date()
                let pastDate = new Date(date)
                let currentYear = currentDate.getFullYear()
                let yearCreatedIssue = pastDate.getFullYear()
                let timeDiff = Math.abs(currentDate.getTime() - pastDate.getTime())
                let amountDay = Math.floor(timeDiff / (1000 * 3600 * 24))
                let day = pastDate.toLocaleString('en-US', {day: 'numeric'})
                let month = pastDate.toLocaleString('en-US', {month: 'short'})
                let year = pastDate.toLocaleString('en-US', {year: 'numeric'})

                if (amountDay === 0) {
                    return ' today'
                }
                if (amountDay === 1) {
                    return ' yesterday'
                }
                if (amountDay > 1 && amountDay <= 31) {
                    return amountDay + ' days ago'
                }
                if (amountDay > 31 && yearCreatedIssue === currentYear) {
                    return 'on ' + day + ' ' + month
                }
                return 'on ' + day + ' ' + month + ' ' + year
            },
            getContrastYIQ(hexcolor) {
                let r = parseInt(hexcolor.substr(0, 2), 16);
                let g = parseInt(hexcolor.substr(2, 2), 16);
                let b = parseInt(hexcolor.substr(4, 2), 16);
                let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
                return (yiq >= 128) ? '000' : 'fff';
            }
        },
        beforeMount() {
            // Загрузка списка вопросов
            this.loadIssuesList()
        },
        mounted() {
            window.addEventListener('click', this.closeDetails, false)
        },
        beforeDestroy() {
            window.removeEventListener('click', this.closeDetails, false)
        }
    }
</script>
