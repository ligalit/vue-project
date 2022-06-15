<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Поиск..."
    />
    <div class="app__btns">
      <my-button
      >
        Создать пост
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog
        v-model:show="dialogVisible"
    >
      <post-form
      />
    </my-dialog>
    <post-list
        :posts="sortedAndSearchedPosts"
        v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import {usePosts} from "@/hooks/usePosts";
import {useSortedPosts} from "@/hooks/useSortedPosts";
import {useSortedAndSearchedPosts} from "@/hooks/useSortedAndSearchedPosts";

export default {
  components: {
    MyInput, MySelect, MyButton,
    MyDialog, PostForm, PostList
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [{
        name: "По названию",
        value: "title",
      }, {
        name: "По содержимому",
        value: "body",
      }]
    };
  },
  setup() {
    const {totalPages, isPostsLoading, posts} = usePosts(10);
    const {selectedSort, sortedPosts} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);
    return {
      posts,
      totalPages,
      isPostsLoading,
      selectedSort,
      sortedPosts,
      searchQuery,
      sortedAndSearchedPosts
    }
  },
}
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>