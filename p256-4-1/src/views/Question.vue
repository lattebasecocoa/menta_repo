<template>
  <div class="container">

    <div class="container__header">
      <div class="container__tag-info">STEP2</div>
      <div class="container__title">
        <div class="container__title-text">
          <i class="fas fa-chalkboard-teacher"></i>
          以下にお答えください
        </div>
      </div>
    </div>

    <div class="container__content">
      <div class="container__content-question">
        <div class="container__content-question-title">
          現在、生命保険に加入されていますか？
        </div>
        <div class="control">
          <input type="radio" name="question1" id="yes1" value="yes" v-model="q1_value" />
          <label for="yes1" class="radio">はい</label>

          <input type="radio" name="question1" id="no1" value="no" v-model="q1_value">
          <label for="no1" class="radio">いいえ</label>
        </div>
      </div>

      <div class="container__content-question" v-if="q1_value">
        <div class="container__content-question-title">
          現在、入院中ですか。または、最近３ヶ月以内に医師の診察・検査の結果、入院・手術をすすめられたことはありますか？
        </div>
        <div class="control">
          <input type="radio" name="question2" id="yes2" value="yes" v-model="q2_value" />
          <label for="yes2" class="radio">はい</label>

          <input type="radio" name="question2" id="no2" value="no" v-model="q2_value">
          <label for="no2" class="radio">いいえ</label>
        </div>
      </div>

      <div class="container__content-question" v-if="q2_value">
        <div class="container__content-question-title">
          過去5年以内に、病気やけがで、手術をうけたことまたは継続して7日以上の入院をしたことがありますか？
        </div>
        <div class="control">
          <input type="radio" name="question3" id="yes3" value="yes" v-model="q3_value" />
          <label for="yes3" class="radio">はい</label>

          <input type="radio" name="question3" id="no3" value="no" v-model="q3_value">
          <label for="no3" class="radio">いいえ</label>
        </div>
      </div>

    </div>

    <div class="container__footer">
      <router-link class="button is-primary" to="/">
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

<script>
export default {
	data() {
    return {
      q1_value: '',
      q2_value: '',
      q3_value: '',
    }
  },
}
</script>
