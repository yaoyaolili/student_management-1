<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-logo">
        <a href="#">
          <img src="../assets/logo.png" alt="logo">
        </a>
      </div>
      <div class="login-form">
        <h3>用户登录</h3>
        <el-form ref="loginForm" :model="loginForm" :rules="rules" label-position="left" label-width="0">

          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left: -10px;" type="primary" @click="do_login('loginForm')" :loading="loading">登录</el-button>
          </el-form-item>
          <div class="rg_right">
            <el-link type="primary" @click="dialogFormVisible = true">忘记密码？</el-link>
          </div>
        </el-form>
      </div>

    </div>
  </div>
</template>
  
<script>
import { setToken } from '@/utils/token'
import user from '@/api/auth/user'
export default {
  data() {
    // 角色身份必选
    var validateRadio = (rule, value, callback) => {
      if (value) {
        // 当值为0的时候当做没选择
        if (value == 0) {
          callback(new Error('请选择工单状态'))
        } else {
          callback();
        }
      } else {
        callback(new Error('请选择工单状态'));
      }
    };

    return {
      // 按钮加载
      loading: false,
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },

    }
  },
  methods: {
    // 清空表单
    clearForm(formName) {
      this.$refs[formName].resetFields();
    },
    open_warning() {
      this.$message({
        showClose: true,
        message: this.msg,
        type: 'warning'
      });
    },
    open_suc() {
      this.$message({
        showClose: true,
        message: this.msg,
        type: 'success'
      });
    },
    open_err() {
      this.$message({
        showClose: true,
        message: this.msg,
        type: 'error'
      });
    },
    do_login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          // 登录请求
          user.login(this.loginForm).then(res => {
            if (res.code == 200) {
              console.log(res.data)
              // 登录成功
              setToken(res.data.token)

              setTimeout(() => {
                this.$router.push({ path: '/home' })
              }, 500);

              this.$message({
                message: '登录成功',
                type: 'success'
              })

            }
            // else {
            //   this.msg = res.msg
            //   this.open_err()
            // }

          }).finally(_ => {
            this.loading = false
          })
        }
      });
    },

  }
}



</script>
  
<style lang="scss">
.rg_right {
  float: right;
  margin-top: -50px;
}

.login-container {
  margin-top: 80px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    width: 400px;
    height: 400px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px #ccc;

    .login-logo {
      margin-top: 20px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        height: 80%;
        padding-top: 50px;
      }
    }

    .login-form {
      padding: 20px;

      h3 {
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
      }
    }
  }
}
</style>

