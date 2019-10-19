<template>
 <div class="users">
   <!-- 面包屑导航 -->
   <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
   <!-- 输入框 -->
  <el-input class="userInput" placeholder="请输入内容" v-model="query" >
    <el-button @click="serach" slot="append" icon="el-icon-search"></el-button>
  </el-input>
<el-button @click="addUserBtn" plain type="success" >添加用户</el-button>
  <!-- 对话框 -->
  <el-dialog
  title="添加用户"
  :visible.sync="dialogVisible"
  width="40%">
  <!-- 内置的表单 -->
   <el-form :rules="rules" ref="form" :model="form" label-width="80px">
  <el-form-item prop="username" label="用户名">
    <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item prop="password" label="密码">
    <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
  </el-form-item>
  <el-form-item prop="email" label="邮箱">
    <el-input placeholder="请输入邮箱" v-model="form.email"></el-input>
  </el-form-item>
  <el-form-item prop="mobile" label="手机">
    <el-input placeholder="请输入手机号" v-model="form.mobile"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>
<!-- 修改用户 -->
<el-dialog
  title="修改用户"
  :visible.sync="editVisible"
  width="40%">
  <!-- 内置的表单 -->
   <el-form :rules="rules" ref="editForm" :model="editForm" label-width="80px">
          <el-form-item label="用户名">
        <el-tag type="info"> {{editForm.username}} </el-tag>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input placeholder="请输入邮箱" v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="手机">
        <el-input placeholder="请输入手机号" v-model="editForm.mobile"></el-input>
      </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUser">确 定</el-button>
  </span>
</el-dialog>
<!-- 表格 -->
<el-table
      :data="list"
      style="width: 100%">
      <el-table-column prop="username" label="姓名" ></el-table-column>
      <el-table-column prop="email" label="邮箱" ></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
       <el-table-column  label="用户状态">
         <template v-slot:default= 'obj'>
           <el-switch
            v-model="obj.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
         </template>
       </el-table-column>
       <el-table-column label="操作">
       <template v-slot:default ='{row}' >
          <el-button @click="editBtn(row)" plain size="small" icon="el-icon-edit" type="primary"></el-button>
          <el-button @click="delUser(row.id)" plain size="small" icon="el-icon-delete" type="danger"></el-button>
          <el-button plain size="small" icon="el-icon-check" type="success">分配角色</el-button>
       </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
 </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: 0,
      list: [],
      // 添加的数据
      dialogVisible: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 校验的数据
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['change', 'blur'] },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: ['change', 'blur'] }
        ],
        password: [
          { required: true, message: '请输入用户名', trigger: ['change', 'blur'] },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: ['change', 'blur'] }
        ],
        email: [
          { type: 'email', message: '请输入正确格式的邮箱', trigger: ['change', 'blur'] }
        ],
        mobile: [
          { pattern: /^1[3-9]{9}$/, message: '请输入正确的手机号', trigger: ['change', 'blur'] }
        ]
      },
      // 修改的数据
      editForm: {
        usrename: '',
        email: '',
        mobile: '',
        id: ''
      },
      editVisible: false
    }
  },
  created () {
    this.userList()
  },
  methods: {
    // 封装渲染axios
    async userList () {
      const { meta, data } = await this.$axios.get('users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      if (meta.status === 200) {
        this.total = data.total
        this.list = data.users
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 每页条数改变时触发
    handleSizeChange (val) {
      // console.log(val)
      // 修改了每页条数
      this.pagesize = val
      // 重置成第一页, 开始展示
      this.pagenum = 1
      // 重新渲染当前页
      this.userList()
    },
    // 触发当前页是触发
    handleCurrentChange (val) {
      // console.log(val)
      this.pagenum = val
      this.userList()
    },
    // 搜索
    serach () {
      // 因为渲染的是当前页,如果在不是第一页搜索, 搜索的数据却在第一页的问题
      this.pagenum = 1
      this.userList()
    },
    // 点击弹出对话框
    addUserBtn () {
      this.dialogVisible = true
    },
    // 添加功能
    async addUser () {
      try {
        // 校验表单
        await this.$refs.form.validate()
        // 发送axios
        const { meta } = await this.$axios.post('users', this.form)
        if (meta.status === 201) {
          this.$message.success('添加成功')
          // 重置表单
          this.$refs.form.resetFields()
          // 关闭对话框
          this.dialogVisible = false
          // 添加先 + 1, 添加时视图还未更新, 如果不加一 假如刚好 15 / 3 = 5页
          //  此时多渲染出一条还是会多出一页,没有达到跳到最后一页的效果
          this.total++
          // 跳到最后一页重新渲染
          this.pagenum = Math.ceil(this.total / this.pagesize)
          this.userList()
        } else {
          this.$message.error(meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 删除功能
    async delUser (rowId) {
      try {
        await this.$confirm('亲,确认删除吗?', '温馨提示', {
          type: 'warning'
        })
        // 能到这里说明确认成功了, 发送删除的ajax请求
        const { meta } = await this.$axios.delete(`users/${rowId}`)
        if (meta.status === 200) {
          this.$message.success('删除成功')
          //  解决了删除完一页就显示暂无数据的问题
          if (this.userList.length === 1 && this.pagenum > 1) {
            this.pagenum--
          }
          this.userList()
        } else {
          this.$message.success(meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 修改功能 点击弹出对话框,并通过作用域插槽获取row的数据 做到数据回回显
    editBtn (row) {
      // console.log(row)
      this.editVisible = true
      const { username, mobile, email, id } = row
      this.editForm.username = username
      this.editForm.mobile = mobile
      this.editForm.email = email
      this.editForm.id = id
    },
    async editUser () {
      try {
        // 校验数据
        await this.$refs.editForm.validate()
        // 只要能够到这里, 说明成功了
        const { id, mobile, email } = this.editForm
        const { meta } = await this.$axios.put(`users/${id}`, { mobile, email })
        if (meta.status === 200) {
          this.$message.success('修改成功')
          // 关闭对话框
          this.editVisible = false
          // 重新渲染
          this.userList()
        } else {
          this.$message.error(meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang='scss' >
 .users{
   .userInput{
    width: 300px;
    margin-bottom: 10px;
    margin-right: 10px;
   }
 }
</style>
