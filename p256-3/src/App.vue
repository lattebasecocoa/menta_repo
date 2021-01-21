<template>
  <!--
    親コンポーネントでimportした子コンポーネント(HelloWorld)の
    "msg"に"Hello World！！"という値を渡している。
    参考：https://reffect.co.jp/vue/vue-js-master-props-for-beginner
     -->
  <HelloWorld msg="Hellow World！！" />
  <!--
    Vueファイルでは要素・処理・装飾を一つのファイルで表現する。
    → ※単一ファイルコンポーネント。SingleFileConponent(SFC)とも呼ばれる。
    <template>タグ内ではテンプレートの定義をHTMLで記載する。
   -->
</template>

<script>
// HelloWorldモジュール(vueファイル)をインポート。
// ここではHelloWorldという名前でインポート対象のdefaultメンバーにアクセスできるようになる。
import HelloWorld from './components/HelloWorld.vue';

// 他のモジュールからも参照できるよう以下をエクスポート
export default {
  name: 'App',
  // HelloWorldをコンポーネントとして定義
  // コンポーネントは「利用する側が親」「利用される側が子」
  components: {
    HelloWorld,
  },
};
// <script>タグ内ではコンポーネントの定義をJavaScriptで記載する。
</script>

<style scoped>
/*
 <style>タグ内ではコンポーネントに適用するスタイルをCSSで記載する。
 scopedを付与するとそのコンポーネント（Vue）だけに適用される。
 ※今回は指定なし
 */
</style>
