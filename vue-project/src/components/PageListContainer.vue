<template>
    <div class="list-layout">
        <div class="list-header space">
            <div class="list-count">
                {{issues.itemsTotalCount}} Open
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
                'loadIssuesList'
            ]),

            // Автор вопроса
            authorName(item) {
                return item.login
            }
        },
        beforeMount() {
            // Загрузка списка вопросов
            this.loadIssuesList()
        }
    }
</script>
