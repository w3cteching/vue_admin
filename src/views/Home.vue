<template>
  <div class="home">
      <h2>home</h2>
      <button @click="goLogOut">登出</button>
      
  </div>
</template>

<script>


export default {
  name: "Home",
  components: {},
  methods:{
    goLogOut() {
      //清除token
     localStorage.removeItem('token')
      //返回到登录页
      this.$router.push({name:'Login'})
    }
  }

};
</script>
