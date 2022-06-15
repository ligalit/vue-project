import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isPostsLoading: false,
        selectedSort: "",
        searchQuery: "",
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [{
            name: "По названию", value: "title",
        }, {
            name: "По содержимому", value: "body",
        }]
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((a, b) => a[state.selectedSort]?.localeCompare(b[state.selectedSort]));
        }, sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
        }
    }, mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        }, setLoading(state, bool) {
            state.IsLoading = bool;
        }, setPage(state, page) {
            state.page = page;
        }, setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        }, setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        }, setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        }


    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit("setLoading", true);
                const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
                    params: {
                        _page: state.page, _limit: state.limit,
                    }
                });
                commit("setTotalPages", Math.ceil(res.headers['x-total-count'] / state.limit));
                commit("setPosts", res.data);
            } catch (e) {
                console.log(e);
            } finally {
                commit("setLoading", false);
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit("setPage", state.page + 1);
                const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
                    params: {
                        _page: state.page, _limit: state.limit,
                    }
                });
                commit("setTotalPages", Math.ceil(res.headers['x-total-count'] / state.limit));
                commit("setPosts", [...state.posts, ...res.data]);
            } catch (e) {
                console.log(e);
            }
        }
    }, namespaced: true,
};