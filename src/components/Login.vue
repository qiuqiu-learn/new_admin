<template>
  <!-- // 此组件为子组件 被APP组件包括 -->
  <div class="login">
      <!-- type 颜色 plain 朴素按钮 round 圆角按钮 circle 圆 想当于border-radius 50%  -->
      <!-- <el-button class="yyy" type="primary">默认按钮</el-button> -->

      <!--
      el-form 整个form表单组件
        (1) :model="form" 给组件配置了model属性, 属性值是一个form对象
            将来form对象中的所有属性, 会和表单元素双向数据绑定
        (2) label-width 统一设置表单中label标签的宽度
      el-form-item 单个表单项
        (1) label 设置label标签的内容
        (2) label-width 设置自己的label的宽度
      el-input 输入框
        利用v-model和可以form的属性双向数据绑定

      status-icon 设置显示状态图标
     -->

      <el-form ref="form" status-icon :rules="rules" :model="form" label-width="80px">
       <img class="logo" src="../assets/avatar.jpg" alt="">
  <el-form-item label="用户名" prop='username'>
    <el-input placeholder='请输入用户名' v-model="form.username"></el-input>
  </el-form-item>
   <el-form-item  label="密码" prop='password'>
    <el-input placeholder='请输入密码' type='password' v-model="form.password"></el-input>
  </el-form-item>
  <el-form-irem>
    <el-button @click='login' type ='primary' >登录</el-button>
    <el-button @click='reset' >重置</el-button>
  </el-form-irem>

</el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    reset () {
      this.$refs.form.resetFields()
    },
    login () {
      // 参数1: 是否校验成功
      // 参数2: 错误的信息对象
      this.$refs.form.validate(valid => {
        if (!valid) return
        console.log('发送ajax请求')
        // axios({
        //   method: 'post',
        //   url: 'http://localhost:8888/api/private/v1/login',
        //   data: this.form
        // }).then(res => {
        //   console.log(res.data)
        //   const { meta } = res.data
        //   if (meta.status === 200) {

        //   }
        // })
        // axios 另外的写法
        axios.post('http://localhost:8888/api/private/v1/login', this.form).then(res => {
          // 解构meta
          const { meta } = res.data
          // 成功时做的
          if (meta.status === 200) {
            // console.log(meta.msg)
            // 成功提示
            this.$message({
              message: meta.msg,
              type: 'success',
              duration: 1000
            })
            //  切换路由
            // this.$router.push('./index')
            // 路由长的话另外写法
            this.$router.push({ name: 'index' })
          } else {
            // 简写
            this.$message.error(meta.msg)
          }
        })
      })
    }
  }
}
</script>

<style lang='scss'>
  .login {
     width: 100%;
     height: 100%;
     background-color: #2d434c ;
     overflow: hidden;
    .el-form{
      width: 400px;
      margin: 0 auto;
      margin-top: 200px;
      background-color: #fff;
      border-radius: 20px;
      padding: 20px;
      padding-top: 70px;
      position: relative;
      .logo {
        border-radius: 50%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top:-70px;
        border: 3px solid #fff
      }
      .el-button{
        margin-left: 80px;
      }
    }
  }

</style>
