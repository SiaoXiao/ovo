<template>
  <q-dialog :model-value="isOpen" persistent>
    <q-card class="dialogWrap">
      <div class="row justify-end items-center q-pt-xs q-pr-xs">
        <q-btn icon="close" flat dense @click="close"></q-btn>
      </div>
      <q-card-section class="dialogTitle column no-wrap justify-center items-center">
        <div v-if="count !== 0" class="q-ma-none text-h6 text-bold title">刪除</div>
        <span v-if="count == 0" class="fontBase">請至少選取一筆資料</span>
        <span v-else class="fontBase">{{ `是否確定刪除${count}筆資料?` }}</span>
      </q-card-section>

      <q-card-actions align="center" class="row no-wrap justify-center items-center q-px-md q-py-lg">
        <q-btn class="btn" label="取消" @click="close" />
        <q-btn class="btn primaryBtn" label="確認" @click="confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const isOpen = computed(() => store.state.isOpen);
const count = computed(() => store.state.count);

const close = () => {
  store.dispatch('handleOpenDialog', false);
}

const confirm = () => {
  store.dispatch('handleOpenDialog', false);
  if(count.value === 0) return
  store.dispatch('updateRemove', true);
}
</script>

<style lang="scss" scoped>
.dialogWrap {
  width: 360px;
}

.dialogTitle {
  gap: 15px;
}
</style>
