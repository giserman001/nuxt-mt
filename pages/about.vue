<template>
  <div class="container">
    about
    <div v-for="(item, index) in str" :key="index">{{ item }}</div>
    <!-- {{ ip }} -->
  </div>
</template>

<script>
/**
 * fetch 主要用于store数据修改
 * asyncData 主要是服务端发起请求获取数据，发送到客户端
 * monuted/created/methods主要是客户端发起请求
 *
 */
export default {
  layout: 'home',
  // async asyncData({ $axios }) {
  //   const ip = await $axios.$get('/users/bar')
  //   // console.log(ip, 'ip')
  //   return { ip }
  // },
  data() {
    return {
      str: [],
    }
  },
  async mounted() {
    const { data } = await this.$axios.$get('/users/bar')
    this.str = data
    // console.log(this.str)
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
