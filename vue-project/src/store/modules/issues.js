import axios from 'axios'

const state = () => {
    return {
        issues: {
            list: [],
            page: 1,
            perPage: 10,
            itemsTotalCount: 0
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
    'issuesPerPage': (state, perPage) => {
        state.issues.perPage = perPage
        state.issues.page = 1
    },
    'issuesItemsTotalCount': (state, {count}) => {
        state.issues.itemsTotalCount = count
    }
}
const actions = {
    'loadIssuesList': ({commit}) => {
        return new Promise((resolve) => {
            axios.get('https://api.github.com/repos/vuejs/vue/issues?state=open')
                .then(xhr => {
                    let list = xhr.data
                    commit('issuesList', {list})
                    resolve(xhr)
                })
        })
    }
}

export default {
    namespaced: true,
    ignoreIfExists: true,
    state,
    mutations,
    actions
}