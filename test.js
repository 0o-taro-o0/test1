class QType {
  constructor(type, varName, items = [], option = []) {
    this.questionType = type;
    this.varName = varName;
    this.items = items;
    this.option = option;
    this.code = this.setType();
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
    this.initialSettings();
  }
//各typeごとの表示メソッド
  //textfield
  textfield() {
    return `<label><input class="" type="text" name="${this.varName}"></label>`;
  }
  //textarea
  textarea() {
    return `<label>
      <textarea class="" name="${this.varName}" rows="4" cols="80"></textarea>
    </label>`;
  }
  //radio
  radio() {
    switch (this.items) {
      case "YN":
        return this.radioText(
          ["はい", "いいえ"]
        );
        break;
      case "YYNN":
        return this.radioText(
          ["はい", "どちらかと言えばはい", "どちらかと言えばいいえ", "いいえ"]
        );
        break;
      case "think":
        return this.radioText(
          ["そう思う", "まあそう思う", "あまりそう思わない", "そう思わない"]
        );
        break;
      default:
        return this.radioText(this.items);
        break;
    }
  }
  radioText(items) {
    let text = ""
    for (var i = 0; i < items.length; i++) {
      text += `<label><input class="" type="radio" name="${this.varName}" value="${i}">${items[i]}</input></label>`;
    }

    return text;
  }
  //checkbox
  checkbox() {
    let text = ""
    this.items.forEach((item) => {
      text += `<label><input class="" type="checkbox" name="${this.varName}" value="${item}">${item}</input>`;
      if (item === "その他") {
        text += `<input class="" type="text" name="${this.varName}Other">`;
      }
      text += "</label>";
    });
    return text;
  }
  //select
  select() {
    let text = `<select class="" name="${this.varName}">`;
    this.items.forEach((item) => {
      text += `<option class="" value="${item}">${item}</option>`;
    });
    text += "</select>";
    return text;
  }
  //ranking
  ranking() {
    if (typeof(this.items[0]) === "number" && this.items[0] <= this.items.length-1) {
      let text = "";
      this.options = this.items.slice(1);
      this.removes = {};
      for (var i = 0; i < this.items[0]; i++) {
        text += `<select class="" id="${this.varName}${i+1}" name="${this.varName}${i+1}">`;
        this.options.forEach((option) => {
          text += `<option class="" value="${option}">${option}</option>`;
        });
        text += "</select>";
        this.removes[`${this.varName}${i+1}`] = "";
      }
      return text;
    } else {
      return "<p>データの入力方法が間違っているか、要素数が足りません</p>";
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
      Object.keys(this.option).forEach((key) => {
        this.gebi(key).hidden = true;

      });
      this.radioAction(()=>{this.showAndHide()});

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
  radioAction(action) {//valuesでactionを登録するelementを指定
    this.elements.forEach((element, i) => {
      this.setOnclickAction(element, ()=>{
        this.uncheck(element, i);
        action()
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
