<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3 Project</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button @click="$router.push('/about')">О сайте</my-button>
      <my-button @click="$router.push('/store')">Store</my-button>
      <my-button @click="$router.push('/composition')">Composition</my-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.navbar {
  height: 50px;
  background: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  display: flex;
  gap: 10px;
  margin-left: auto;
}
</style>