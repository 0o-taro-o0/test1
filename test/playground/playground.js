// function showSum() {
//   var num1 = 1;
//   var num2 = 2;
//   var sum = num1 + num2;
//   alert(sum);
// }
const i = 0;
const excute = () => {
  console.log("here");
  func();
  test();
}

const func = () => {
  gebi("body")
  for (var i = 0; i < 3; i++) {
    var div = createElement("div", "body", "divs", `div${i}`);
    console.log(div.id);
    for (let s = 0; s < 4; s++) {
      var text = createElement("p", `div${i}`, "texts", `text${i}-${s}`);

      text.textContent = `text${i}-${s}`;

      
    }
    // gebi("testElement" + i).textContent = "putain";
  }
  let post = createElement('form', 'body', '', ''); 

}
  
  const gebi = (id) => {
  return document.getElementById(id);
}
const createElement = (tag, parentId, className, id) => {
  let ele = document.createElement(tag);
  console.log(gebi(parentId));

  gebi(parentId).appendChild(ele);
  ele.id = id;
  ele.className = className;
  console.log(parent.children);
 
  return ele;

}
let explained = false;
$(function() {
  excute();
  var $div = $('.divs');

  console.log($div);
  let colors = ['rgb(245, 138, 138)', 'rgb(229, 245, 138)', 'rgb(138, 245, 138)'];
  for (let i = 0; i < colors.length; i++) {
    $(`#div${i}`).css({
      'heigh': '300px',
      'width': '200px',
      'background-color': colors[i]
    });
    $('#div1').hover(function () {
        // over
        if (explained == false) {
          $('#div2').fadeIn();
          explained = true;
        }
      }, function () {
        // out
      }
    );
    $('#div2').click(function () { 
      $(this).fadeOut();
      
    });
    
  }
});

// class Obridge {
//   constructor(parent) {
//     this.parent = parent;
//   }
//   create() {
//     let div = document.createElement('div');
//     this.parent.appendChild(div);
//     let text = 
//   }
// }
const test = ()=>{
  let a = document.createElement('p');
  a.textContent = 'hereitis';
  a.classList.add('theclass');
  $('.theclass').css('color', 'red');
  document.getElementsByTagName('body')[0].appendChild(a);
  $('.theclass').css('color', 'red');
}