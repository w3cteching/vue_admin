<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="el_card_box">
      <!-- 1.搜索框，添加用户按钮 -->
      <el-input placeholder="请输入内容" v-model="pageinfo.query" class="searchInput">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary" class="adduser">添加用户</el-button>

      <!-- 2.添加用户表格 -->
      <el-table :data="tableData" class="user_table" border style="width: 100%">
        <el-table-column type="index" label="#" width="40"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="注册时间">
          <!-- {{ create_time | date }} -->
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time | date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <!-- 3.添加分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageinfo.pagenum"
        :page-sizes="[2,3,4,5]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "userlist",
  data() {
    return {
      flag: true,
      pageinfo: {
        query: "",  
        pagenum: 1, //当前页码 第1页，第二页
        pagesize:2 //显示每页条数
      },
      total: 0,
      tableData: []
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    /**
     * query:查询参数可以为空
     * pagenum:当前页码不能为空
     * pagesize:每页显示条数不能为空
     */
    //获取用户列表
    getUserList() {
      //this.$http.get()
      //this.$http.post()
      //this.$http({url:'',method:''})
      //获取token
      const token = localStorage.getItem("token");
      //配置头信息，在封装的request请求中去写
      this.$http.defaults.headers["Authorization"] = token;
      //发送ajax请求
      this.$http({
        method: "get",
        url: "/users",
        params: this.pageinfo
      }).then(res => {
        console.log("res::", res);
        //解构取值
        if (res.data && res.data.data) {
          var {
            data: { pagenum, total, users },
            meta: { msg, status }
          } = res.data;
        } else {
          var {
            meta: { msg, status }
          } = res.data;
        }
        if (status === 200) {
          this.tableData = users;
          this.pageinfo.pagenum = pagenum;
          this.total = total;
          this.$message({
            message: msg,
            type: "success"
          });
        } else {
          this.$message({
            message: msg,
            type: "error"
          });
        }
      });
    },
    //分页相关的方法
    //每页条数不同时触发的方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageinfo.pagesize=val;
      this.getUserList();
    },

    //当前页码方法
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageinfo.pagenum=val;
      this.getUserList();
    }
  }
};
</script>

<style lang="scss" scoped>
.el_card_box {
  margin-top: 20px;
}

.searchInput {
  width: 300px;
}

.adduser {
  margin-left: 20px;
}

.user_table {
  margin-top: 20px;
}
</style>