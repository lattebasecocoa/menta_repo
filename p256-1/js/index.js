const container = document.getElementById('container');
const QUIZ_COUNT = 10; // クイズ出題数
const QUIZ_TYPE = 'multiple'; // クイズ出題形式(選択式)
const TRIVIA_URL = `https://opentdb.com/api.php?
                    amount=${QUIZ_COUNT}&
                    type=${QUIZ_TYPE}`; // クイズデータ取得APIのURL
let quizAry = []; // クイズ一覧
let quizNumber = 0; // クイズ番号
let quizCounter = 0; // クイズ回答数
let score = 0; // 正解数

// 画面描画クラス
class Quiz {
  constructor(top, middle, buttom) {
    this.top = top;
    this.middle = middle;
    this.buttom = buttom;
    this.drawImg(this.top, this.middle, this.buttom);
  }
  drawImg(top, middle, buttom) {
    document.getElementById('top').innerHTML = top;
    document.getElementById('middle').innerHTML = `<hr />${middle}<hr />`;
    document.getElementById('bottom').innerHTML = buttom;
  }
}

// Quizクラスインスタンス作成
const quizImg = new Quiz(
  // コンストラクタで「ようこそ」画面を出力
  `<h1>ようこそ</h1>`, // top
  `以下のボタンをクリック`, // middle
  `<br />
   <input type="button" value="開始" onclick="quiz.startQuiz()" />` // bottom
);

const quiz = {
  startQuiz: () => {
    // 読み込み中画面を描画
    quizImg.drawImg(
      `<h1>取得中</h1>`, // top
      `少々お待ち下さい`, // middle
      `` // bottom
    );

    // APIからJSON形式でクイズを取得
    let loadQuiz = async () => {
      try {
        let hoge = await (await fetch(TRIVIA_URL)).json();
        alterJsonQuiz(hoge);
      } catch (e) {
        console.error(e.message);
      }
    };

    // クイズAPI実行
    loadQuiz();

    // 取得したクイズの加工を行う
    let alterJsonQuiz = (lordQuiz) => {
      // 初期化
      quizAry = [];
      // 取得件数分繰り返す
      for (let lq of lordQuiz.results) {
        // 回答一覧を格納する配列を初期化
        let answers_ary = [];
        // 回答一覧の取得・並べ替え・オブジェクト変換処理
        answers_ary = convertAnsers(answers_ary, lq);

        // クイズ一覧に格納する
        quizAry.push({
          no: ++quizNumber, // 今何問目かを示すクイズ番号
          category: lq.category, // ジャンル
          difficulty: lq.difficulty, // 難易度
          question: lq.question, // 問題文
          answer1: answers_ary['answer1'], // 回答1（ランダムに入れ替えたもの）
          answer2: answers_ary['answer2'], // 回答2（ランダムに入れ替えたもの）
          answer3: answers_ary['answer3'], // 回答3（ランダムに入れ替えたもの）
          answer4: answers_ary['answer4'], // 回答4（ランダムに入れ替えたもの）
          correct: lq.correct_answer, // 正解
        });
      }
      // テンプレート挿入のため、画面非表示
      container.classList.add('hidden');
      // クイズ初期表示画面の描画準備
      drowQuizImg();
      // クイズ回答処理を呼び出し
      startAnswer();
      // 画面非表示解除
      container.classList.remove('hidden');
    };
  },
};

// 回答一覧の取得・並べ替え・オブジェクト変換処理の呼び出し
convertAnsers = (answers_ary, lq) => {
  // 回答一覧を取得（JSON返却値から正解・不正解の回答一覧を取得する）
  answers_ary = getAnswers(answers_ary, lq);
  // 回答一覧をランダムに並び替える（デフォルトだと正解の位置が先頭固定のため）
  answers_ary = sortAnswers(answers_ary, answers_ary.length);
  // 並び替えた回答一覧（配列）をオブジェクトに変換
  answers_ary = arrayToObject(answers_ary);
  return answers_ary;
};

// 回答一覧を取得
getAnswers = (answers_ary, lq) => {
  answers_ary.push(
    lq.correct_answer // 正解の回答を回答一覧に追加
  );
  // 不正解の回答は配列のため、ひとつずつ取得して格納する
  for (let ia of lq.incorrect_answers) {
    answers_ary.push(
      ia // 不正解の回答を回答一覧に追加
    );
  }
  // 正解・不正解の回答一覧を返却
  return answers_ary;
};

// 回答一覧をランダムに並び替える
sortAnswers = (answers_ary, length) => {
  // 回答一覧の配列の並び順を乱数を使って入れ替える
  // ※「乱数生成→乱数を元に配列の値を取得・入れ替え」を配列の長さ分繰り返す
  let num = length;
  while (num) {
    // 配列の範囲内の乱数を作成
    let rdm = Math.floor(Math.random() * num);
    // 配列の最後から値を取得（周回ごとに一つ前の値を取得するようにする）
    let tmp = answers_ary[--num];
    // 処理中の配列の値を乱数から取得した配列の値で上書き
    answers_ary[num] = answers_ary[rdm];
    // 乱数から取得した配列の値を処理中の配列の値（上書き前の値）で上書き
    answers_ary[rdm] = tmp;
  }
  // 入れ替えた配列を返却
  return answers_ary;
};

// 回答一覧（配列）をオブジェクト（連想配列）形式に変換する
let arrayToObject = (ary) => {
  let newAry = {};
  for (let i = 0; i < ary.length; i++) {
    switch (i) {
      case 0:
        newAry.answer1 = ary[i];
        break;
      case 1:
        newAry.answer2 = ary[i];
        break;
      case 2:
        newAry.answer3 = ary[i];
        break;
      case 3:
        newAry.answer4 = ary[i];
        break;
      default:
    }
  }
  return newAry;
};

// クイズ回答処理
let startAnswer = () => {
  // 設定されたクイズの回数分 繰り返す
  if (QUIZ_COUNT > quizCounter) {
    // クイズ画面を表示
    // 今何問目・ジャンル・難易度を更新
    const quizNo = document.getElementById('quiz-no');
    const quizType = document.getElementById('quiz-type');
    quizNo.innerHTML = `問題${quizAry[quizCounter].no}`;
    quizType.innerHTML = `
                        [ジャンル] ${quizAry[quizCounter].category}
                        <br>
                        [難易度] ${quizAry[quizCounter].difficulty}`;
    // 問題文を更新
    const question = document.getElementById('question');
    // 問題文に特殊文字（&nbsp;など）が入っていることがあるのでinnerHTML指定
    question.innerHTML = `${quizAry[quizCounter].question}`;

    // 回答一覧を更新
    const answers = Array.from(document.getElementsByClassName('answer'));
    answers.forEach((answer) => {
      let number = answer.dataset['number'];
      // 回答に特殊文字（&nbsp;など）が入っていることがあるのでinnerHTML指定
      answer.innerHTML = quizAry[quizCounter]['answer' + number];
    });
  } else {
    // クイズ出題数分回答した場合、採点画面表示
    quizImg.drawImg(
      `<h1>あなたの正解数は${score}です！！</h1>`, // top
      `<div>再度チャレンジしたい場合は以下をクリック！！</div>`, // middle
      `<br />
       <button onClick="returnHome()">
         ホームに戻る
       </button>` // bottom
    );
  }
};

// 回答の正誤判定処理
let chkAnswer = (prm) => {
  // 選択された回答の要素を取得し、正解の回答と比較する
  if (
    quizAry[quizCounter].correct ===
    document.getElementById('answer' + prm).innerHTML
  ) {
    // 正解の場合、正解数を加算
    score++;
  }
  // 正解不正解に関わらず、クイズ回答数を加算
  quizCounter++;
  // クイズ回答処理を再度呼び出し
  startAnswer();
};

// ホームへ戻る
let returnHome = () => {
  quizAry = []; // クイズ一覧 初期化
  quizNumber = 0; // クイズ番号 初期化
  quizCounter = 0; // クイズ回答数 初期化
  score = 0; // 正解数 初期化

  // ようこそ画面を再描画
  quizImg.drawImg(
    `<h1>ようこそ</h1>`, // top
    `以下のボタンをクリック`, // middle
    `<br />
   <input type="button" value="開始" onclick="quiz.startQuiz()" />` // bottom
  );
};

// クイズ初期表示画面を描画
let drowQuizImg = () => {
  quizImg.drawImg(
    `<div id="quizImg">
       <h1 id="quiz-no"></h1>
       <h3 id="quiz-type"></h3>
     </div>`, // top
    `<div id="question"></div>`, // middle
    `<div>
       <button class="answer" id="answer1" data-number="1" onclick="chkAnswer(1)">
       </button>
       <br />
       <button class="answer" id="answer2" data-number="2" onclick="chkAnswer(2)">
       </button>
       <br />
       <button class="answer" id="answer3" data-number="3" onclick="chkAnswer(3)">
       </button>
       <br />
       <button class="answer" id="answer4" data-number="4" onclick="chkAnswer(4)">
       </button>
     </div>` // bottom
  );
};
