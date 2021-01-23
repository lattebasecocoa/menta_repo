<template>
  <div>
    <!-- マスタッシュ構文で記述 -->
    <p>{{ msg }}</p>
  </div>
</template>

<script>
// defaultキーワードを用いて他のモジュールからも使えるようにする
export default {
  name: 'HelloWorld',
  // propsプロパティを定義（"msg"をString型で定義）
  props: {
    msg: String,
  },
};
</script>

<style scoped>
/* 指定なし */
</style>
