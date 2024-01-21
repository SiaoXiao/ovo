<template>
  <q-dialog :model-value="isOpen" persistent>
    <q-card class="dialogWrap">
      <div class="row justify-end items-center q-pt-xs q-pr-xs">
        <q-btn icon="close" flat dense @click="close"></q-btn>
      </div>
      <!-- Dialog title -->
      <q-card-section
        class="dialogTitle column no-wrap justify-center items-center"
      >
        <div class="q-ma-none text-h6 text-bold title">新增員工基本資訊</div>
      </q-card-section>
      <!-- Dialog input section -->
      <q-card-section>
        <q-form @submit="confirm" class="q-gutter-md">
          <q-input
            v-model="memberData.name"
            label="姓名"
            placeholder="請輸入員工姓名"
            color="secondary"
            lazy-rules
            :rules="memberData.rules"
          ></q-input>
          <q-input
            v-model="memberData.cellphone"
            label="手機"
            placeholder="請輸入員工電話"
            type="tel"
            color="secondary"
            lazy-rules
            :rules="memberData.numberRules"
          ></q-input>
          <q-input
            v-model="memberData.email"
            label="信箱"
            placeholder="請輸入員工信箱"
            type="email"
            color="secondary"
            lazy-rules
            :rules="memberData.rules"
          ></q-input>
          <q-select
            v-model="memberData.gender"
            :options="genderOptions"
            label="性別"
            emit-value
            map-options
            color="secondary"
            lazy-rules
            :rules="[(val) => (val !== null && val !== '') || '請選擇性別']"
          ></q-select>
          <q-input
            v-model="memberData.birthday"
            type="date"
            color="secondary"
            lazy-rules
            :rules="memberData.rules"
          ></q-input>
          <q-card-actions
            align="center"
            class="row no-wrap justify-center items-center q-px-md q-py-lg"
          >
            <q-btn class="btn" label="取消" @click="close" />
            <q-btn class="btn primaryBtn" type="submit" label="確認" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, reactive } from "vue";

const store = useStore();
const isOpen = computed(() => store.state.addDialog);
const memberData = reactive({
  name: "",
  cellphone: "",
  email: "",
  gender: "",
  birthday: "",
  rules: [(val) => (val && val.length > 0) || "請輸入資料"],
  numberRules: [
    (val) =>
      (val && val.length > 0 && /^09\d{8}$/.test(val)) || "請輸入手機號碼",
  ],
});
const genderOptions = reactive([
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 0,
  },
]);

const newMemberData = computed(() => {
  const data = {
    name: memberData.name,
    cellphone: memberData.cellphone,
    email: memberData.email,
    gender: memberData.gender,
    birthday: `${memberData.birthday}T11:11:11.111Z`,
  };
  return data;
});

const close = () => {
  resetMemberData();
  store.dispatch("handleOpenAddDialog", false);
};

const resetMemberData = () => {
  for (const key in memberData) {
    if (key === "rules") return;
    if (memberData.hasOwnProperty(key)) {
      memberData[key] = "";
    }
  }
};

const confirm = () => {
  store.dispatch("handleOpenAddDialog", false);
  store.dispatch("updateAdd", { state: true, data: newMemberData.value });
  resetMemberData();
};
</script>

<style lang="scss" scoped>
.dialogWrap {
  width: 360px;
}

.dialogTitle {
  gap: 15px;
}
</style>
