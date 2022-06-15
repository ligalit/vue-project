<template>
  <div class="page__wrapper">
    <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
            'current-page': modelValue === pageNumber
          }"
        @click="changePage(pageNumber)"
    >
      {{ pageNumber }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    }
  },
  methods: {
    changePage(page) {
      this.$emit('update:modelValue', page)
    }
  }
}
</script>

<style scoped>
.page__wrapper {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
  font-weight: bold;
}
</style>