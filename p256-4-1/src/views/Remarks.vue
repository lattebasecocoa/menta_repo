<template>
  <div class="container">

    <div class="container__header">
      <div class="container__tag-info">STEP3</div>
      <div class="container__title">
        <div class="container__title-text">
          <i class="fas fa-file-alt"></i>
          ご相談内容をご記入ください
        </div>
      </div>
    </div>

    <div class="container__content">
      <div class="container__content-question">
        <div class="container__content-question-title">
          -ご相談内容-
        </div>
        <textarea class="textarea" rows="15">
        </textarea>
      </div>
    </div>

    <div class="container__footer">
      <router-link class="button is-primary" to="/question">
        前へ戻る
        <i class="fas fa-angle-right fa-fw"></i>
      </router-link>

      <router-link class="button is-primary" to="/remarks">
        次へ進む
        <i class="fas fa-angle-right fa-fw"></i>
      </router-link>
    </div>

  </div>
</template>

