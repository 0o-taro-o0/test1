$(function() {
    var clickEventType=((window.ontouchstart!==null)?'mouseenter':'touchstart');
    $('section').eq(3).on(clickEventType, function () {
        if (willPopup) {
            $('.popupWrapper').fadeIn();
            willPopup = false;
        }
        console.log(999);
        }
        
    );
    $('.popupClose').on('click', function () {
        $('.popupWrapper').fadeOut();
        console.log(888);
    });

    //submitのpost前処理
    $('.submit').on('click', function () {
        $('.hidden').find('input').each(function (index, element) {
            switch ($(element).attr('type')) {
                case 'radio':
                    $(element).prop('checked', false);
                    break;
                case 'text':
                    $(element).val('');
                    break;
                case 'checkbox':
                    $(element).prop('checked', false);
                    break;
                default:
                    break;
            }
        });
        $('.hidden').find('textarea').each(function (index, element) {
            $(element).val('');
        });
        $('.hidden').find('select').each(function (index, element) {
            $(element).prop('selectedIndex', -1);
        });
        return true;
    });
    
    // $('.button').on('click', function() {
    //     console.log($('.hidden').find('input'));
    //     $('.hidden').find('input').each(function (index, element) {
    //         switch ($(this).attr('type')) {
    //             case 'radio':
    //                 $(this).prop('checked', false);
    //                 break;
    //             case 'text':
    //                 $(this).val('');
    //                 break;
    //             case 'checkbox':
    //                 $(this).prop('checked', false);
    //                 break;
    //             default:
    //                 break;
    //         }
    //     });
    //     $('.hidden').find('textarea').each(function (index, element) {
    //         $(this).val('');
    //     });
    //     $('.hidden').find('select').each(function (index, element) {
    //         $(this).prop('selectedIndex', -1);
    //     });
    // })
});
let willPopup = true;

// const setPopup = ($parent, $item) => {
//     var clickEventType=((window.ontouchstart!==null)?'mouseenter':'touchstart');
//     $parent.on(clickEventType, function () {
//         if (willPopup) {
//             $item.fadeIn();
//         }
//     });
//     $('popupClose').on(events, function () {
//         $item.fadeOut();
//     });
// }
// const $submit = (data)=> {
//     $('.submit').on('click', function () {
//         let Ss = data.QSections.questions;
//         Ss.forEach(s => {

//         });
//         qs.QType.option.forEach(element => {
            
//         });
//         $(this).submit();
//     });
// }
