import axios from 'axios'

const state = () => {
    return {
        issues: {
            list: [],
            page: 1,
            perPage: 30,
            itemsTotalCount: 0,
            listLoading: true,
            sort: ''
        }
    }
}
const mutations = {
    'issuesList': (state, {list}) => {
        state.issues.list = list
    },
    'issuesCurrentPage': (state, {pageIndex}) => {
        state.issues.page = pageIndex
    },
    'issuesCurrentSort': (state, {key}) => {
        state.issues.sort = key
    },
    'issuesItemsTotalCount': (state, {count}) => {
        state.issues.itemsTotalCount = count
    },
    'issuesListLoading': (state, loading) => {
        state.issues.listLoading = loading
    }
}
const actions = {
    'loadIssuesList': ({commit, state}) => {
        let page = state.issues.page
        let sort = `+sort:${state.issues.sort}`
        let url = `https://api.github.com/search/issues?page=${page}&q=repo:vuejs/vue+type:issue+state:open`
        if (state.issues.sort.length > 0) {
            url += url + sort
        }
        return new Promise((resolve) => {
            commit('issuesListLoading', true)
            axios.get(url)
                .then(xhr => {
                    let list = xhr.data.items
                    let count = xhr.data.total_count
                    commit('issuesList', {list})
                    commit('issuesItemsTotalCount', {count})
                    commit('issuesListLoading', false)
                })
        })
    },
    'issuesGoPage': ({commit, dispatch}, {pageIndex}) => {
        commit('issuesCurrentPage', {pageIndex})
        return dispatch('loadIssuesList')
    },
    'selectSort': ({commit, dispatch}, {key}) => {
        commit('issuesCurrentSort', {key})
        return dispatch('issuesGoPage', {pageIndex: 1})
    }
}

export default {
    namespaced: true,
    ignoreIfExists: true,
    state,
    mutations,
    actions
}