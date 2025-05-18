<template>
  <el-card class="login-card" style="margin-top: 20px">
    <h1 class="title">欢迎登录！</h1>
    <p class="text">
      依据《网络安全法》，为保障您的账户安全和正常使用，请尽快完成手机号验证！
    </p>

    <el-form :model="loginForm" :rules="loginRules" class="el-form">
      <div class="choic">
        <span
          class="psdLogin"
          @click="isPwdLogin = true"
          :class="{ 'bold-text': isPwdLogin }"
          >密码登录</span
        >
        <span
          class="npsdLogin"
          @click="isPwdLogin = false"
          :class="{ 'bold-text': !isPwdLogin }"
          >短信验证</span
        >
      </div>
      <el-form-item prop="mobile">
        <el-input
          v-model="loginForm.mobile"
          placeholder="请输入账号/手机号"
          type="text"
          class="input"
        ></el-input>
      </el-form-item>
      <div class="other">
        <span class="forget" @click="forget">忘记密码</span>
        <router-link to="/register" class="btn-register">立即注册</router-link>
      </div>
      <el-form-item prop="password" v-if="isPwdLogin">
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          type="password"
          class="input"
        ></el-input>
      </el-form-item>
      <el-form-item prop="smsCode" v-else>
        <el-input
          v-model="loginForm.smsCode"
          placeholder="请输入验证码"
          type="text"
          class="input"
        >
          <template #append>
            <el-button @click="sendSms">获取验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="loginForm.checked">用户使用协议</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit" id="loginBtn">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router"; // 导入

// 获取路由实例
const router = useRouter();
const route = useRoute();
// const mobileInput = ref('')
// const psdInput = ref('')
const loginForm = reactive({
  mobile: "",
  password: "",
  smsCode: "",
  checked: false,
});
const loginRules = reactive({
  mobile: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 6, max: 11, message: "账号格式错误", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码至少6位", trigger: "blur" },
  ],
});
const isPwdLogin = ref(true);
const onSubmit = () => {
  // alert('submit!')
  // 判断账号密码是否正确，是否同意使用协议

  if (
    loginForm.mobile === "123456" &&
    loginForm.password === "123456" &&
    loginForm.checked
  ) {
    localStorage.setItem("isLoggedIn", "true");
    const redirectPath = route.query.redirect || "/mine";
    router.push(redirectPath); // 正确跳转
    alert("登录成功");
  } else if (
    loginForm.mobile == "123456" &&
    loginForm.password == "123456" &&
    !loginForm.checked
  ) {
    alert("请同意使用协议");
  } else {
    alert("账号或密码错误");
  }
};
// 判断是否为密码登录

const sendSms = () => {
  alert("发送验证码（暂未开启次此登录方式）");
};
const forget = () => {
  alert("通过手机号重置密码");
};
</script>
<style scoped>
.login-card {
  background-color: #fffae4;
  box-shadow: none;
  border: none;
}
.el-form-item__error {
  color: #ff4d4f;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
}
.title {
  text-align: center;
}
.login-card {
  width: 600px;
  height: 500px;
  margin: 0 auto;
}
.text {
  width: 480px;
  margin: 0 auto;
  background-color: #ffac5f;
  padding: 10px;
  border-radius: 5px;
}
.el-form {
  width: 400px;
  margin: 0 auto;
}

.choic {
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
  margin-top: 25px;
}
.choic span {
  cursor: pointer;
}
.other {
  width: 400px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
.other span {
  cursor: pointer;
  margin-right: 50px;
}
.btn-register {
  text-decoration: none;
  color: black;
}
#loginBtn {
  width: 380px;
  height: 35px;
  margin: 0 auto;
  background-color: #e24b2a;
  color: #fff;
}
.el-input {
  width: 380px;
  height: 35px;
  margin: 0 auto;
}
.bold-text {
  font-weight: bold;
}
</style>
