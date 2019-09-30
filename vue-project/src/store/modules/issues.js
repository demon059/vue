import axios from 'axios'

const state = () => {
    return {
        issues: {
            list: [],
            page: 1,
            perPage: 30,
            itemsTotalCount: 0,
            listLoading: true
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
        return new Promise((resolve) => {
            commit('issuesListLoading', true)
            axios.get(`https://api.github.com/search/issues?page=${page}&q=repo:vuejs/vue+type:issue+state:open`)
                .then(xhr => {
                    let list = xhr.data.items
                    let count = xhr.data.total_count
                    commit('issuesList', {list})
                    commit('issuesItemsTotalCount', {count})
                    commit('issuesListLoading', false)
                    resolve(xhr)
                })
        })
    },
    'issuesGoPage': ({commit, dispatch}, {pageIndex}) => {
        commit('issuesCurrentPage', {pageIndex})
        return dispatch('loadIssuesList')
    },
}

export default {
    namespaced: true,
    ignoreIfExists: true,
    state,
    mutations,
    actions
}