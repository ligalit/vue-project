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
          @click="showDialog"
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
          @create="createPost"
      />
    </my-dialog>
    <post-list
        @remove="removePost"
        :posts="sortedAndSearchedPosts"
        v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--    <my-pagination-->
    <!--        v-model="page"-->
    <!--        :total-pages="totalPages"-->
    <!--    />-->
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import axios from "axios";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
// import MyPagination from "@/components/UI/MyPagination";

export default {
  components: {
    // MyPagination,
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostForm, PostList
  },
  data() {
    return {
      dialogVisible: false,
      posts: [],
      isPostsLoading: false,
      selectedSort: "",
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [{
        name: "По названию",
        value: "title",
      }, {
        name: "По содержимому",
        value: "body",
      }]
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit);
        this.posts = res.data;
      } catch (e) {
        alert("Ошибка");
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...res.data];
      } catch (e) {
        alert("Ошибка");
      }
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) =>
          a[this.selectedSort]?.localeCompare(b[this.selectedSort])
      );
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // }
  }
}
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.observer {
  height: 30px;
  background: green;
  /*Можно убрать, чисто для ознакомления с infinite pagination*/
}
</style>