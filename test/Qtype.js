// import QType from "./test";

class QType {
  constructor(type, varName, items = [], option = [], essential = false) {
    this.questionType = type;
    this.varName = varName;
    this.items = items;
    this.option = option;
    this.essential = essential;
    this.element = this.setType();
    
  }

  //type設定
  setType() {
    switch(this.questionType) {
      case "textfield":
        return this.textfield();
        break;
      case "textarea":
        return this.textarea();
        break;
      case "radio":
        return this.radio();
        break;
      case "checkbox":
        return this.checkbox();
        break;
      case "select":
        return this.select();
          break;
      case "ranking":
        return this.ranking();
        break;
      default:
        console.log("設定されたタイプが正しくありません");
        return "設定されたタイプが正しくありません";
        break;
    }
  }
//各typeごとの表示メソッド
  //textfield
  textfield() {
    let tf = document.createElement('input');
    tf.className = this.questionType;
    tf.type = 'text';
    tf.name = this.varName;
    tf.id = this.varName;
    let label = document.createElement('label');
    label.appendChild(tf);
    //varNames
    varNames.push(tf.name);
    return label
  }
  //textarea
  textarea() {
    let ta = document.createElement('textarea');
    ta.className = this.questionType;
    ta.name = this.varName;
    ta.id = this.varName;
    ta.rows = 4;
    ta.cols = 80;
    let label = document.createElement('label');
    label.appendChild(ta);
    //varNames
    varNames.push(ta.name);
    return label;
  }
  //radio
  radio() {
    let label = document.createElement('label');
    label.id = this.varName;
    let item = this.items;
    switch (this.items) {
      case "YN":
        item =  ["はい", "いいえ"];
        break;

      case "YYNN":
        item = ["はい", "どちらかと言えばはい", "どちらかと言えばいいえ", "いいえ"];
        break;
        
      case "think":
        item = ["そう思う", "まあそう思う", "あまりそう思わない", "そう思わない"];
        break;

      default:
        item = this.items;
        break;
    }
    item.forEach((text, i)  => {
      let r = document.createElement('input');
      r.className = this.questionType;
      r.type = 'radio';
      r.name = this.varName;
      r.value = i;
      // r.innerHTML = text;
      let l = document.createElement('label');
      label.appendChild(r);
      // let ll = document.createElement('label');
      l.textContent = text;
      label.appendChild(l);
      
      // console.log(r.textContent);
      
      // label.appendChild(l);
      // label.innerHTML += text;
    });
    //varNames
    varNames.push(this.varName);
    return label;
  }
  //checkbox
  checkbox() {
    let label = document.createElement('label');
    label.id = this.varName;
    //varNames
    varNames.push(this.varName);
    this.items.forEach((item) => {
      let c = document.createElement('input');
      c.className = this.questionType;
      c.type = 'checkbox';
      c.name = this.varName;
      c.value = item;
      // c.textContent = item;
      label.appendChild(c);
      let l = document.createElement('label');
      l.textContent = item;
      label.appendChild(l);
      if (item == 'その他' || item == 'others' || item == 'others') {
        let sl = document.createElement('label');
        let o = document.createElement('input');
        sl.appendChild(o);
        sl.className = 'otherText hidden';
        o.type = 'text';
        o.name = `${this.varName}Other`;
        //varNames
        varNames.push(o.name);

        sl.hidden = true;
        c.onchange = ()=> {
          sl.hidden = !c.checked;
          if (sl.hidden) {
            sl.classList = 'otherText hidden';
            
          } else {
            sl.className = 'otherText';
          }
        };
        label.appendChild(sl);
      }
    });
    return label;
  }
  //select
  select() {
    let s = document.createElement('select');
    s.className = this.questionType;
    s.name = this.varName;
    s.id = this.varName;
    //varNames
    varNames.push(this.varName);
    this.items.forEach((item) => {
      let op = document.createElement('option');
      op.className = `${this.questionType}Option`;
      op.value = item;
      op.textContent = item;
      s.appendChild(op);
    });
    return s;
  }
  //ranking
  ranking() {
    if (typeof(this.items[0]) === "number" && this.items[0] <= this.items.length-1) {
      this.options = this.items.slice(1);
      this.removes = {};
      let pDiv = document.createElement('div');
      pDiv.className = 'rankingDiv';
      for (var i = 0; i < this.items[0]; i++) {
        
        let label = document.createElement('label');
        label.class = 'rankingLabel';
        label.textContent = `${i+1}. `;
        pDiv.appendChild(label);
        let s = document.createElement('select');
        s.className = this.questionType;
        s.id = `${this.varName}${i+1}`;
        s.name = `${this.varName}${i+1}`;
        //varNames
        varNames.push(`${this.varName}${i+1}`);
        this.options.forEach((optioon) => {
          let op = document.createElement('option');
          op.className = `${this.questionType}Option`;
          op.value = optioon;
          op.textContent = optioon;
          s.appendChild(op);
        });
        label.appendChild(s);
        this.removes[`${this.varName}${i+1}`] = "";
      }
      return pDiv;
    } else {
      let n = document.createElement('label');
      n.textContent = 'データの入力方法が間違っているか、要素数が足りません';
      return n;
    }
  }


//各種設定
  //
  //document.write後!!!!!!!
  //
  initialSettings() {
    //radio初期設定
    if (this.questionType === "radio") {
      this.remove = -1;
      this.elements = document.getElementsByName(this.varName);
      // Object.keys(this.option).forEach((key) => {
      //   this.gebi(key).hidden = true;

      // });
      this.radioAction();//(()=>{this.showAndHide()});

    }
    //select初期設定
    if (this.questionType === "select") {
      document.getElementById(this.varName).selectedIndex = -1;
      // document.getElementsByName(this.varName)[0].selectedIndex = -1;
    }
    //ranking初期設定
    if (this.questionType === "ranking") {
      for (var i = 0; i < this.items[0]; i++) {
        if (i>0) {
          this.gebi(`${this.varName}${i+1}`).disabled = true;
        }
        this.gebi(`${this.varName}${i+1}`).selectedIndex = -1;
        this.selected(`${this.varName}${i+1}`);
      }
    }
  }
  //radio
  //空欄であるべきところを空欄にする処理は、postメソッド直前で一括
  setOnchangeAction(obj, action, regulation = true) {
    if (regulation) {obj.onchange = event => {action()}}
  }
  setOnclickAction(obj, action, regulation = true) {
    if (regulation) {obj.onclick = event=>{action()}}
  }


  // {
  //   "id1":[value1, value2],
  //   "id2":[value3, value4]
  // }
  radioAction(){//(action) {//valuesでactionを登録するelementを指定
    this.elements.forEach((element, i) => {
      this.setOnclickAction(element, ()=>{
        this.uncheck(element, i);
        // action()
      });
    });
  }
  uncheck(already, num) {
    if (this.remove === num) {
      already.checked = false;
      this.remove = -1;
    } else {
      this.remove = num;
    }
  }
  showAndHide() {
    let keys = Object.keys(this.option);
    if (keys === undefined){return}
    keys.forEach((key, i) => {
      let hide = true;
      this.elements.forEach((element) => {
        if (this.option[key].includes(element.value) && element.checked) {hide = false}
      });
      this.gebi(key).hidden = hide;
    });
  }

  //ranking
  selected(name) {
    let obj = document.querySelector(`[name="${name}"]`);
    obj.onchange = event => {
      let ids = Object.keys(this.removes);
      let current = ids.indexOf(obj.id);

      //activateSelects
      if (current+1 < ids.length) {
        this.gebi(ids[current+1]).disabled = false;
      }

      this.removes[obj.id] = obj.value;
      //各select毎に実行
      for (var i = current+1; i < ids.length; i++) {
        // let this.gebi(ids[i]) = this.gebi(ids[i]);
        //変更後の選択中を指定(valueで)
        let willDisplayValue = "";
        //選択されたoptionと被った場合にunselectする用
        if (this.gebi(ids[i]).selectedIndex === -1) {
          willDisplayValue = -1;

        } else {//その他の場合は表示中のものを指定
          willDisplayValue = this.gebi(ids[i]).value;
        }
        //表示するoptionを指定（前項のvalue分を取り除く）
        let shownOptions = [];
        this.options.forEach((option) => {
          shownOptions.push(option);
        });
        for (var s = 0; s < i; s++) {
          if (this.removes[ids[s]] !== "") {
            shownOptions.splice(shownOptions.indexOf(this.removes[ids[s]]), 1);
          }
        }

        //一旦全削除
        while (this.gebi(ids[i]).lastChild) {
          this.gebi(ids[i]).removeChild(this.gebi(ids[i]).lastChild);
        }

        //再表示
        shownOptions.forEach((value) => {
          let option = document.createElement("option");
          option.text = value;
          option.value = value;
          this.gebi(ids[i]).appendChild(option);
        });

        //指定のoptionを選択
        if (willDisplayValue === -1) {
          this.gebi(ids[i]).selectedIndex = -1;
          this.removes[ids[i]] = "";
        } else {
          this.gebi(ids[i]).selectedIndex = shownOptions.indexOf(willDisplayValue);
        }
      }

    }
  }

  gebi(id){
    return document.getElementById(id);
  }
}
const question = (qtext, type, varName, items, option, essential, otherItems = []) => {
  let d = document.createElement('div');
  d.classList.add('question', varName)
  let qi = new QType(type, varName, items, option, essential);
  instances.push(qi);

  let ql = document.createElement('p');
  ql.textContent = qtext;
  if (qi.essential) {
    let ess = document.createElement('label');
    ess.textContent = 'この項目は必須です。';
    ess.id = `${varName}Essential`;
    ess.class = 'essential';
    d.appendChild(ess);
  }
  
  // ess.hidden = essential;

  
  d.appendChild(ql);
  d.appendChild(qi.element);

  return d;
}
const memo = (text)=>{
  let label = document.createElement('label');
  label.textContent = text;
  label.className = 'memo';
  return label;
}
const popup = (text) =>{
  let wrapper = document.createElement('div');
  wrapper.className = 'popupWrapper';
  let box = document.createElement('div');
  box.className = 'popupBox';
  let close = document.createElement('div');
  close.textContent = '×';
  close.className = 'popupClose';
  let label = document.createElement('label');
  label.className = 'popupText';
  label.innerText = text;

  box.appendChild(close);
  box.appendChild(label);
  wrapper.appendChild(box);
  return wrapper;
}
const section = (title, items)=>{
  let sec = document.createElement('section');
  let secTitle = document.createElement('h3');
  secTitle.textContent = title;
  sec.appendChild(secTitle);
  items.forEach((item) => {
    let i;
    switch (Object.keys(item)[0]) {
      case 'question':
        let e = false;
        if (item.QType.essential != null) {e = item.QType.essential}
        i = question(item['question'], item.QType.type, item.QType.varName, item.QType.items, item.QType.option, e);
        sec.appendChild(i);
        break;
      case 'memo':
        i = memo(item['memo']);
        sec.appendChild(i);
        break;
      case 'popup':
        i = popup(item['popup'])
        document.getElementsByTagName('body')[0].appendChild(i);
        break;
      default:
        break;
    }
    
  });
  return sec;
} 



// $("<input>", {
//   type: 'hidden',
//   id: 'input_id',
//   value: 12345
// }).appendTo('#targetId');


const createElements = (data)=> {
  let body = document.getElementsByTagName('body')[0];
  let header = document.createElement('header');
  body.appendChild(header);
  let title = document.createElement('h1');
  header.appendChild(title);
  title.textContent = data.title;
  let explain = document.createElement('p');
  header.appendChild(explain);
  explain.innerText = data.explanation;
  explain.className = 'explain';

  let main = document.createElement('main');
  body.appendChild(main);
  let form  = document.createElement('form');
  form.method = 'post';
  form.action = 'writeCSV.cgi';
  main.appendChild(form);
  data.QSections.forEach((sect) => {
    let sec = section(sect.sectionTitle, sect.questions);
    form.appendChild(sec);
  });
  let submit = document.createElement('input');
  form.appendChild(submit);
  submit.className = 'submit';
  submit.type = 'submit';
  submit.value = '送信';
  
  

  let footer = document.createElement('footer');
  body.appendChild(footer);
}


let instances = [];

const init = ()=> {
  instances.forEach((instance, i) => {
    instance.initialSettings()
    if (instance.option != []) {
      let targets = Object.keys(instance.option);
      targets.forEach((target) => {
        $(`.${target}`).addClass('hidden');
        $(`.${target}`).css('display', 'none');
        let $item = $(`[name=${instance.varName}]`);
        if (instance.questionType == 'ranking') {
          $item = $('.rankingDiv').find('select');
        }

        switch (instance.questionType) {
          case 'radio':
            $item.on('click', function () {
              let show = false;
              if (instance.option[target].includes($(`[name=${instance.varName}]:checked`).val())) {
                show = true;
              }
              if (show) {
                $(`.${target}`).slideDown().removeClass('hidden');
              } else {
                $(`.${target}`).slideUp().addClass('hidden');
              }
            });
            break;

          case 'checkbox':
            $item.on('click', function () {
              let show = false;
              $(`[name=${instance.varName}]:checked`).each(function() {
                if (instance.option[target].includes($(this).val())) {
                  show = true;
                }
              });
              if (show) {
                $(`.${target}`).slideDown().removeClass('hidden');
              } else {
                $(`.${target}`).slideUp().addClass('hidden');  
              }
            });
            break;
          case 'select':
            $item.on('change', function () {
              let show = false;
              if (instance.option[target].includes($(this).val())) {
                show = true;
              }
              if (show) {
                $(`.${target}`).slideDown().removeClass('hidden');
              } else {
                $(`.${target}`).slideUp().addClass('hidden');
              }
            });
            break;
          case 'ranking':
            $item.on('change', function () {
              let show = false;
              $item.each(function (index, element) {
                if (instance.option[target].includes($(this).val())) {
                  show = true;
                }
              });
              if (show) {
                $(`.${target}`).slideDown().removeClass('hidden');
              } else {
                $(`.${target}`).slideUp().addClass('hidden');
              }
            });
            break;
          default:
            break;
        }

        
      });
    }
  });
}
let varNames = [];
const data = {
  "title": "アンケートのタイトル",
  "explanation": "こんにちは。私たちは、山口大学国際総合科学部のプロジェクト型課題解決研究（PBL）の一環として、山口県の農業の担い手不足について取り組んでいます。当アンケートは大学生を対象に、農業に対する意識調査を目的として実施しています。このアンケートの結果は、PBLでの研究活動のみで使用し、第三者へ情報を提供することもございませんので、回答にご協力宜しくお願い致します。<br>※当アンケートは回答者様の意思により途中で回答を止めることができます。<br>※また、回答したくない質問については、ご回答頂かなくても構いません。",
  "QSections": [
    {
      "sectionTitle":"基本情報",
      "questions"   :[
        {
          "question": "名前",
          "QType"   : {
            "type"   :"textfield",
            "varName":"name",
            "items"  :"",
            "option" :""
          }
        },
        {
          "question": "メールアドレス",
          "QType"   : {
            "type"   :"textfield",
            "varName":"mail",
            "items"  :"",
            "option" :""
          }
        },
        {
          "question": "年齢",
          "QType"   : {
            "type"   :"textfield",
            "varName":"age",
            "items"  :"",
            "option" :""
          }
        },
        {
          "question": "性別",
          "QType"   : {
            "type"   :"radio",
            "varName":"sex",
            "items"  :["男性", "女性"],
            "option" :""
          }
        },
        {
          "question": "実家が農家",
          "QType"   : {
            "type"   :"radio",
            "varName":"home",
            "items"  :"YN",
            "option" : {
              "fulltime": ["0"]
            }
          }
        },
        {
          "question": "専業農家ですか？",
          "QType"   : {
            "type"   :"radio",
            "varName":"fulltime",
            "items"  :"YN",
            "option" :""
          }
        },
        {
          "question": "学部",
          "QType"   : {
            "type"   :"select",
            "varName":"faculty",
            "items"  :["文学", "語学", "法学", "経済・経営・商学", "社会学", "国際関係学", "看護・保健学", "医・歯学", "薬学", "理学", "工学", "農・水産学", "教員養成・教育学", "生活科学", "芸術学", "総合科学"],
            "option" :""
          }
        }
      ]
    },
    {
      "sectionTitle":"職業選択について",
      "questions":[
        {
          "question": "現在魅力を感じる仕事はなんですか？",
          "QType"   : {
            "type"   :"textfield",
            "varName":"attractiveWork",
            "items"  :"",
            "option" :""
          }
        },
        {
          "question": "何故その仕事に魅力を感じますか？",
          "QType"   : {
            "type"   :"textarea",
            "varName":"whyAttractiveWork",
            "items"  :"",
            "option" :""
          }
        },
        {
          "question": "職業を選択する上で何を重視しますか？",
          "QType"   : {
            "type"   :"ranking",
            "varName":"workChoiceImportant",
            "items"  :[3, "学んだことを活かせる", "給料", "職場環境", "福利厚生", "やりがい", "勤務地", "業務内容", "その他"],
            "option" :""
          }
        }
      ]
    },
    {
      "sectionTitle":"農業に対するイメージ",
      "questions":[
        {
          "question": "<b>農業に対してどのようなイメージを持ちますか？</b><br>日本の平均所得より高い",
          "QType"   : {
            "type"   :"radio",
            "varName":"income",
            "items"  :"think",
            "option" :""
          }
        },
        {
          "question": "3K（きつい・汚い・危険）",
          "QType"   : {
            "type"   :"radio",
            "varName":"3K",
            "items"  :"think",
            "option" :""
          }
        },
        {
          "question": "頭より身体を使う仕事である",
          "QType"   : {
            "type"   :"radio",
            "varName":"moreBrain",
            "items"  :"think",
            "option" :""
          }
        },
        {
          "question": "大学で学んだことを活かせる",
          "QType"   : {
            "type"   :"radio",
            "varName":"university",
            "items"  :"think",
            "option" :""
          }
        },
        {
          "question": "経営戦略が必要である",
          "QType"   : {
            "type"   :"radio",
            "varName":"managementStrategy",
            "items"  :"think",
            "option" :""
          }
        },
        {
          "question": "かっこいい",
          "QType"   : {
            "type"   :"radio",
            "varName":"cool",
            "items"  :"think",
            "option" :""
          }
        },
        {
          "question": "他の職業に比べて新規参入しにくい",
          "QType"   : {
            "type"   :"radio",
            "varName":"difficultToStart",
            "items"  :"think",
            "option" :""
          }
        },
        {
          "question": "その他",
          "QType"   : {
            "type"   :"textarea",
            "varName":"agriImpressionOther",
            "items"  :"",
            "option" :""
          }
        },
        {
          "question": "農業に就きたいと思いますか",
          "QType"   : {
            "type"   :"radio",
            "varName":"wantToWork",
            "items"  :"YYNN",
            "option" :{
              "WTWyesWhy":["0", "1"],
              "WTWnoWhy":["2", "3"],
              "WTWif":["2", "3"]
            }
          }
        },
        {
          "question": "なぜ？",
          "QType"   : {
            "type"   :"textarea",
            "varName":"WTWyesWhy",
            "items"  :"",
            "option" :""
          }
        },
        {
          "question": "なぜ？",
          "QType"   : {
            "type"   :"textarea",
            "varName":"WTWnoWhy",
            "items"  :"",
            "option" :""
          }
        },
        {
          "question": "どのように変化したら農業に就きたいと思いますか？",
          "QType"   : {
            "type"   :"textarea",
            "varName":"WTWif",
            "items"  :"",
            "option" :""
          }
        }
      ]
    },
    {
      "sectionTitle":"スマート農業に対するイメージ",
      "questions":[
        {
          "popup": "＜スマート農業の説明＞\r\n「スマート農業」とは、「ロボット、AI、IoTなど先端技術を活用する農業」の　ことです。代表例として、スマホで使える生産管理アプリ・自動運転トラク　　　ター・農業用ロボットやドローンなどが挙げられます。(参照：農林水産省)"
        },
        {
          "question": "スマート農業という言葉を聞いたことがありますか？",
          "QType"   : {
            "type"   :"radio",
            "varName":"knowSmart",
            "items"  :"YN",
            "option" :{
              "smartCool":["0"]
            }
          }
        },
        {
          "question": "スマート農業をかっこいいと思いますか",
          "QType"   : {
            "type"   :"radio",
            "varName":"smartCool",
            "items"  :"YYNN",
            "option" :""
          }
        }
      ]
    }
  ],
  "thanks":""
};
