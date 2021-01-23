import Vue from 'vue'; // Vue本体
import App from './App.vue'; // App.vue読込

// 起動時のヒント情報(falseでオフ)
Vue.config.productionTip = false;

// Vueアプリケーションを起動
new Vue({
  // render関数（HTMLをビルドする描画用の関数）で HTMLをブラウザに表示させる
  // ※ HelloWorld.vueをインポートしたApp.vueをインポート
  // → そのApp.vueを引数にCreateElementメソッドを実行
  // → HTML側に描画される
  render: (h) => h(App),
}).$mount('#app');
