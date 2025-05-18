<template>
  <el-card
    class="register-card"
    v-show="active === 0 || active === 1 || active === 2"
  >
    <h1 class="title">欢迎注册</h1>
    <!-- 分步控制器 -->
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="用户信息" />
      <el-step title="密码设置" />
      <el-step title="电话绑定" />
    </el-steps>
    <!-- 用户信息 -->
    <el-form :rules="userRules" :model="userForm" v-show="active === 0">
      <el-form-item prop="userName" label="用户名称">
        <el-input v-model="userForm.userName" placeholder="请输入用户名" />
      </el-form-item>

      <!-- 选择器 -->
      <el-radio-group v-model="radio2" class="my-2 ml-4">
        <el-form-item label="性别选项">
          <el-radio value="1">男</el-radio>
          <el-radio value="0">女</el-radio>
        </el-form-item>
      </el-radio-group>
      <el-form-item prop="userText" label="个人简介">
        <el-input v-model="userForm.intro" placeholder="留下点什么..." />
      </el-form-item>
      <!-- 标签选择 -->
      <el-form-item label="兴趣标签" class="flex gap-2">
        <el-tag
          v-for="tag in dynamicTags"
          :key="tag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          class="w-20"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="showInput"
        >
          + New Tag
        </el-button>
      </el-form-item>
      <!-- 下一步按钮 -->
      <el-button style="margin-top: 12px" @click="ToTwo">下一步</el-button>
    </el-form>
    <!-- 密码设置 -->
    <el-form :rules="passwordRules" :model="passwordForm" v-show="active === 1">
      <el-form-item prop="password" label="输入密码">
        <el-input
          v-model="passwordForm.password"
          placeholder="请输入密码"
          type="password"
        />
      </el-form-item>
      <el-form-item prop="passwordAgain" label="重复密码">
        <el-input
          v-model="passwordForm.passwordAgain"
          placeholder="再次输入密码"
          type="password"
        />
      </el-form-item>
      <el-button style="margin-top: 12px" @click="ToUp">上一步</el-button>
      <!-- 下一步按钮 -->

      <el-button style="margin-top: 12px" @click="ToThree">下一步</el-button>
    </el-form>
    <!-- 电话绑定 -->
    <el-form :rules="mobileRules" :model="mobileForm" v-show="active === 2">
      <el-form-item prop="mobile" label="手机号">
        <el-input v-model="mobileForm.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="smsCode" label="验证码">
        <el-input
          v-model="mobileForm.smsCode"
          placeholder="请输入验证码"
          type="text"
          class="input"
        >
          <template #append>
            <el-button @click="sendSms">获取验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-button style="margin-top: 12px" @click="skip">跳过</el-button>
      <!-- 下一步按钮 -->

      <el-button style="margin-top: 12px" @click="ToOk">下一步</el-button>
    </el-form>
  </el-card>
  <!-- 展示账号信息 -->
  <el-card class="success-card" v-show="active === 3">
    <h1 class="success-title">🎉 注册成功！</h1>
    <el-descriptions :column="1">
      <el-descriptions-item label="用户名">{{
        accountInfo.userName
      }}</el-descriptions-item>
      <el-descriptions-item label="性别">
        {{ accountInfo.sex === "1" ? "男" : "女" }}
      </el-descriptions-item>
      <el-descriptions-item label="个人简介">
        {{ accountInfo.intro || "还没有想法..." }}
      </el-descriptions-item>
      <el-descriptions-item label="兴趣标签">
        <el-tag
          v-for="tag in accountInfo.tags"
          :key="tag"
          type="info"
          class="mr-2"
        >
          {{ tag }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="绑定手机">
        {{ accountInfo.mobile || "未绑定手机号" }}
      </el-descriptions-item>
    </el-descriptions>

    <div class="action-btns">
      <el-button tpye="primary">
        <router-link to="/login" class="btn-toLogin">登录账号</router-link>
      </el-button>
      <el-button>
        <router-link to="/" class="btn-toHome">返回主页</router-link>
      </el-button>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
//单选
const radio2 = ref("1");
// 标签选择
import { nextTick } from "vue";
import type { InputInstance } from "element-plus";

const inputValue = ref("");
const dynamicTags = ref(["Java", "Python", "大数据"]);
const inputVisible = ref(false);
const InputRef = ref<InputInstance>();

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};
// 下一步
const active = ref(0);
const userForm = reactive({
  userName: "",
  sex: "",
  intro: "",
  tags: [],
});
const userRules = reactive({
  userName: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  intro: [],
});
const ToTwo = () => {
  if (userForm.userName !== "") {
    active.value++;
  } else {
    alert("请输入用户名");
  }
};
const passwordForm = reactive({
  password: "",
  passwordAgain: "",
});
const passwordRules = reactive({
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" },
  ],
  passwordAgain: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
  ],
});
const ToUp = () => {
  active.value--;
};
const ToThree = () => {
  if (passwordForm.password == "") {
    alert("请输入密码");
  } else if (passwordForm.passwordAgain == "") {
    alert("请输入第二次密码");
  } else if (passwordForm.password != passwordForm.passwordAgain) {
    alert("两次密码不一致");
  } else {
    active.value++;
  }
};
const mobileForm = reactive({
  mobile: "",
  smsCode: "",
});
const mobileRules = reactive({
  mobile: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { min: 11, max: 11, message: "长度为11位", trigger: "blur" },
  ],
  smsCode: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    { min: 6, max: 6, message: "长度为6位", trigger: "blur" },
  ],
});
const sendSms = () => {
  alert("发送成功");
};
const skip = () => {
  active.value++;
  alert("未绑定手机号");
  // 收集所有注册信息
  Object.assign(accountInfo, {
    userName: userForm.userName,
    sex: radio2.value, // 修正性别绑定
    intro: userForm.intro,
    tags: dynamicTags.value, // 同步标签数据
    mobile: mobileForm.mobile,
  });
};
const ToOk = () => {
  // 收集所有注册信息
  Object.assign(accountInfo, {
    userName: userForm.userName,
    sex: radio2.value, // 修正性别绑定
    intro: userForm.intro,
    tags: dynamicTags.value, // 同步标签数据
    mobile: mobileForm.mobile,
  });

  active.value++;
  // 清空 alert 改为在页面展示
};

const accountInfo = reactive({
  userName: "",
  sex: "",
  intro: "",
  tags: [] as string[],
  mobile: "",
});
</script>
<style scoped>
.register-card,
.success-card {
  width: 500px;
  height: 500px;
  margin: 0 auto;
  background-color: #fffae4;
  box-shadow: none !important;
  border: none;
}
.title {
  text-align: center;
}
.btn-toLogin,
.btn-toHome {
  color: #000;
  text-decoration: none;
}
.success-title {
  text-align: center;
  color: #67c23a;
  margin-bottom: 30px;
}

.action-btns {
  margin-top: 30px;
  text-align: center;
}

.mr-2 {
  margin-right: 8px;
}
.el-form-item.is-required:not(.is-no-asterisk).asterisk-left
  > .el-form-item__label-wrap
  > .el-form-item__label:before,
.el-form-item.is-required:not(.is-no-asterisk).asterisk-left
  > .el-form-item__label:before {
  display: none;
}
</style>
