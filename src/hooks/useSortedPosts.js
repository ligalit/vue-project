import {computed, ref} from "vue";

export function useSortedPosts(posts) {
    const selectedSort = ref("");
    const sortedPosts = computed(() => [...posts.value].sort((a, b) =>
        a[selectedSort.value]?.localeCompare(b[selectedSort.value])));
    return {
        sortedPosts, selectedSort
    }
}