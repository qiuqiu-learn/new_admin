<template>
 <el-container class="index">
  <el-header>
    <div class="left">
      <img src="../assets/logo.png" alt="">
    </div>
    <div class="main">
      <h1>秋秋后台管理系统</h1>
    </div>
    <div class="right">
      沙瓦迪卡~
      <a @click="logOut" href="javascript:;">退出</a>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu
      router
      unique-opened
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="users">
        <i class="el-icon-menu"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
          <el-menu-item index="roles">
        <i class="el-icon-menu"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
       <el-menu-item index="rights">
        <i class="el-icon-menu"></i>
        <span slot="title">权限管理</span>
      </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  methods: {
    async logOut () {
      try {
        await this.$confirm('瓜皮,确认退出吗?', '温馨提示', {
          type: 'warning'
        })
        // 提示
        this.$message.success('退出成功')
        // 清除token
        localStorage.removeItem('token')
        // 跳转路由
        this.$router.push('/login')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
  <style lang='scss'>
   .index{
     .el-breadcrumb{
       height: 40px;
       line-height: 40px;
       border-bottom: 1px solid #ccc;
       margin-bottom: 10px;
     }
   }
  </style>
<style lang='scss'>
  .index{
    width: 100%;
    height: 100%;
    .el-header{
      background-color: #d8d8d8;
      display: flex;
      .left{
         width: 180px;
         img{
          height: 40px;
          margin: 10px;
         }
      }
      .main{
       flex: 1;
       h1{
       text-align: center;
       height: 60px;
       line-height: 60px;
       }
      }
      .right{
        width: 180px;
        text-align: right;
        height: 60px;
        line-height: 60px;
        a{
          color: orange
        }
      }
    }
    .el-aside{
    background-color: #545c64;

    }
     .el-main{
    background-color: #ecf0f1
  }
  }
</style>
