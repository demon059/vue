<template>
    <div class="page-pagination">
        <button class="page-pagination__btn prev disabled"
                @click="goPrev"
                :class="{ disabled: this.currentPage === 1 || this.pagesCount === 0 }">
            Передыдущая
        </button>
        <ul class="page-pagination__list">
            <li v-for="(page, index) in pages" :class=page.class :key="index"
                v-on:click.prevent="goPage({pageIndex: page.index})">
                {{ page.label }}
            </li>
        </ul>
        <button class="page-pagination__btn next"
                @click="goNext"
                :class="{ disabled: this.currentPage === this.pagesCount || this.pagesCount === 0 }">
            Следующая
        </button>
    </div>
</template>

<script>
    // helpers
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'PagePagination',
        computed: {
            ...mapState('issues', [
                'issues'
            ]),

            currentPage() {
                return this.issues.page
            },

            pagesCount: function () {
                return Math.ceil(this.issues.itemsTotalCount / this.issues.perPage)
            },

            pages() {
                const pages = []
                // отображать 2 страницы до и 2 страницы после текущей
                let firstIndex = Math.max(1, this.currentPage - 2)
                let lastIndex = Math.min(this.pagesCount, firstIndex + 4)
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
                        class: 'waves-effect'
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
                        class: 'waves-effect'
                    })
                }
                return pages
            }
        },
        methods: {
            ...mapActions('issues', [
                'issuesGoPage'
            ]),

            goPage: function ({pageIndex}) {
                this.issuesGoPage({pageIndex})
            },

            goPrev: function () {
                if (this.currentPage > 1) {
                    this.issuesGoPage({pageIndex: this.currentPage - 1})
                }
            },
            goNext: function () {
                if (this.currentPage < this.pagesCount) {
                    this.issuesGoPage({pageIndex: this.currentPage + 1})
                }
            }
        }
    }
</script>
