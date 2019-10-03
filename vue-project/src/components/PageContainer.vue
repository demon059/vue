<template>
    <div class="page-container">
        <div class="page-content">
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
        </div>
        <div class="page-pagination">
            <button class="page-pagination__btn prev desktop"
                    @click="goPrev"
                    :class="{ disabled: this.currentPage === 1 || this.pagesCount === 0 }">
                <img src="@/assets/images/chevron-left-solid.svg" alt="">
            </button>
            <ul class="page-pagination__list">
                <li v-for="(page, index) in pages" :class=page.class :key="index"
                    v-on:click.prevent="goPage({pageIndex: page.index})">
                    {{ page.label }}
                </li>
            </ul>
            <button class="page-pagination__btn next desktop"
                    @click="goNext"
                    :class="{ disabled: this.currentPage === this.pagesCount || this.pagesCount === 0 }">
                <img src="@/assets/images/chevron-right-solid.svg" alt="">
            </button>
            <div class="page-pagination__btns mobile">
                <button class="page-pagination__btn prev"
                        @click="goPrev"
                        :class="{ disabled: this.currentPage === 1 || this.pagesCount === 0 }">
                    <img src="@/assets/images/chevron-left-solid.svg" alt="">
                </button>
                <button class="page-pagination__btn next"
                        @click="goNext"
                        :class="{ disabled: this.currentPage === this.pagesCount || this.pagesCount === 0 }">
                    <img src="@/assets/images/chevron-right-solid.svg" alt="">
                </button>
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
        issuesList () {
            return this.issues.list
        },

        // Текущая страница
        currentPage () {
            return this.issues.page
        },

        // Количество страниц
        pagesCount: function () {
            return Math.ceil(this.issues.itemsTotalCount / this.issues.perPage)
        },

        pages () {
            const pages = []
            // отображать 2 страницы до и 2 страницы после текущей
            let firstIndex = Math.max(1, this.currentPage - 2)
            let lastIndex = Math.min(this.pagesCount, firstIndex + 2)
            for (let i = firstIndex; i <= lastIndex; i++) {
                pages.push({
                    index: i,
                    label: i,
                    class: i === this.currentPage ? 'active' : ''
                })
            }
            // троеточие после ссылки на 1 страницу
            if (firstIndex > 2) {
                pages.unshift({
                    index: false,
                    label: '...',
                    class: 'disabled'
                })
            }
            // ссылка на 1 страницу
            if (firstIndex > 1) {
                pages.unshift({
                    index: 1,
                    label: 1,
                    class: ''
                })
            }
            // троеточие перед ссылкой на последнюю страницу
            if (lastIndex < (this.pagesCount - 1)) {
                pages.push({
                    index: false,
                    label: '...',
                    class: 'disabled'
                })
            }
            // ссылка на последнюю страницу
            if (lastIndex < this.pagesCount) {
                pages.push({
                    index: this.pagesCount,
                    label: this.pagesCount,
                    class: ''
                })
            }
            return pages
        }
    },
    methods: {
        ...mapActions('issues', [
            'loadIssuesList',
            'loadLabelsList',
            'issuesGoPage',
            'selectSort'
        ]),

        // Автор вопроса
        authorName (item) {
            return item.login
        },

        // Перейти на страницу
        goPage ({pageIndex}) {
            if (pageIndex) {
                this.issuesGoPage({pageIndex})
            }
        },

        // Предыдущая страница
        goPrev () {
            if (this.currentPage > 1) {
                this.issuesGoPage({pageIndex: this.currentPage - 1})
            }
        },

        // Следующая страница
        goNext () {
            if (this.currentPage < this.pagesCount) {
                this.issuesGoPage({pageIndex: this.currentPage + 1})
            }
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
        this.loadLabelsList()
    },
    mounted () {
        window.addEventListener('click', this.closeDetails, false)
    },
    beforeDestroy () {
        window.removeEventListener('click', this.closeDetails, false)
    }
}
</script>

<style src="../assets/sass/components/PageContainer.scss" lang="scss"/>
