<template>
    <div class="container">

      <div class="container__header">
        <div class="container__tag-info">STEP1</div>

        <div class="container__title">
          <div class="container__title-text">
            <i class="fas fa-address-card"></i>
            お客様の情報を入力してください
          </div>
        </div>
      </div>

      <div class="container__content">
        <div class="container__content-question">
          <div class="container__content-question-title">-性別-</div>

          <div class="control">
            <input type="radio" name="gender" value="male" id="male"/>
            <label for="male" class="radio">男性</label>

            <input type="radio" name="gender" value="female" id="female"/>
            <label for="female" class="radio">女性</label>
          </div>
        </div>

        <div class="container__content-question">
          <div class="container__content-question-title">-生年月日-</div>

          <div class="control container__control">
            <div class="select" v-on:change="changeDate()">
              <select id="year" v-model="yearSelected">
                <option v-for="yearValue in yearValues"
                        :value="yearValue.year"
                        :key="yearValue.year">
                  {{ yearValue.jpYear }}
                </option>
              </select>
            </div>
            <span class="ymd-text">年</span>

            <div class="select" v-on:change="changeDate()">
              <select id="month" v-model="monthSelected">
                <option v-for="i in monthValues"
                        :key=i
                        :value=i>
                  {{ i }}
                </option>
              </select>
            </div>
            <span class="ymd-text">月</span>

            <div class="select" v-on:change="changeDate()">
              <select id="day" v-model="daySelected">
                <option v-for="i in dayValues"
                        :key=i
                        :value=i>
                  {{ i }}
                </option>
              </select>
            </div>
            <span class="ymd-text">日</span>

          </div>
        </div>
      </div>

      <div class="container__footer">
        <router-link class="button is-primary" to="/question">
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
      // 本日の年月日を設定
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      // 年月日プルダウン要素の初期値設定
      yearValues: [],
      monthValues: 12,
      dayValues: null,
      // 年月日プルダウンの初期選択の値設定
      yearSelected: null,
      monthSelected: null,
      daySelected: null,
    };
  },
  mounted() {
    // 年月日のセレクトボックス初期値設定
    this.yearSelected = this.year;
    this.monthSelected = this.month;
    this.daySelected = this.day;
    // 年日のセレクトボックスの要素設定
    this.yearValues = this.genereateYear(this.year);
    this.dayValues = this.genereateDay();
  },
  methods: {
    // 西暦 (和暦)の形式で、現在から過去100年分の年の値を配列に格納
    genereateYear(nowYear) {
      const yearValues = [];
      for (let i=nowYear-100; i<=nowYear; i++) {
        if (i > 2018) {
          yearValues.push( {"year": i, "jpYear": `${i} (令和${i-2018})`} );
        } else if (i > 1988) {
          yearValues.push( {"year": i, "jpYear": `${i} (平成${i-1988})`} );
        } else if (i > 1925) {
          yearValues.push( {"year": i, "jpYear": `${i} (昭和${i-1925})`} );
        } else if (i > 1911) {
          yearValues.push( {"year": i, "jpYear": `${i} (大正${i-1911})`} );
        }
      }
      return yearValues;
    },
    genereateDay() {
      // 日付の日数要素を最新の年月に合わせて再設定する
      return new Date(this.yearSelected, this.monthSelected, 0).getDate();
    },
    changeDate() {
      // 変更された年月日の値を元に、Dateクラスのインスタンス生成
      let chkDate = new Date(this.yearSelected,
                             this.monthSelected-1,
                             this.daySelected);

      // 変更前の日付と生成したDateクラスのインスタンスから取得した日付を比較
      if (!(this.yearSelected == chkDate.getFullYear() &&
          this.monthSelected == (chkDate.getMonth()+1) &&
          this.daySelected == chkDate.getDate())) {
        // 不適切な年月日の場合、日付の値を1日に設定する
        this.daySelected = 1;
      }
      // 日付の最大値を再設定する
      this.dayValues = this.genereateDay();
    },
  }
};
</script>

<style>
  .container {
    width: 715px;
    margin: 5% auto;
  }

  .container__header {
    background-color: #daf5f5;
    border-width: 1px 1px 1px 1px;
    border-style: solid;
    border-color: #00d1b2;
    border-radius: 2px 2px 0px 0px;
  }

  .container__tag-info {
    width: 6%;
    color: #fff;
    font-size: 75%;
    font-weight: 100;
    background-color: #3298dc;
    border-radius: 2px;
    position: absolute;
    padding: 0px 7.5px;
    text-align: center;
  }

  .container__title {
    display: block;
    margin: 0px auto;
    padding: 6px;
    text-align: center;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  }

  .container__content {
    border-style: solid;
    border-width: 0px 1px 1px 1px;
    border-color: #00d1b2;
    border-radius: 0px 0px 2px 2px;
  }

  .container__content-question {
    font-size: 90%;
    padding: 20px 20px 20px 20px;
  }

  .container__content-question-title {
    color: #3298dc;
    padding-left: 10px;
    padding-bottom: 10px;
  }

  .container__control {
    width: 55%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .container__footer {
    display: flex;
    justify-content: space-around;
    padding: 7.5% 30%;
  }

  /* input type="radio"タグと labelタグが隣り合っている場合 */
  input[type="radio"] + label {
    /* 右側に余白を設定する */
    margin-right: 1em;
  }
</style>
