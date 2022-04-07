//작성자:park
//개요: 관리페이지에 대한 함수를 정의하는 js
//***import 선언부분************************************************************************************* */
import $ from 'jquery'
import 'overlayscrollbars/css/OverlayScrollbars.css';
import 'overlayscrollbars/js/OverlayScrollbars.js';
import 'overlayscrollbars/js/jquery.overlayScrollbars.js';

//***export 선언부분************************************************************************************* */
export {
            detailDisplay,  //리스트 row display 하는 메소드
            removeClass,    //태그에 특정 class를 제거하는 메소드
            makeChartDiv, //차트를 그리는 영역을 생성하는 메소드
            setOverlayScrollbar, // 스크롤 overlayScrollbar 세팅하는 함수
        };

//***함수 선언부분************************************************************************************* */
//작성일:2021-04-22
//작성자:park
//1.개요: 리스트 row display 하는 메소드 -> css추가와 v-for 일때 테이블 주의
//2.input: tabId(태그 아이디), addClass(변경할 선택자 이름)
//3.return: X
function detailDisplay(tabId, addClass) 
{
    let tab = document.getElementById(tabId)
    if(tab.style.display == 'none')
    {
        tab.style.display = '';
    }
    else
    {
        tab.style.display = 'none';
    }
    tab.previousElementSibling.lastChild.classList.toggle(addClass)
}

//작성일:2021-04-23
//작성자:park
//1.개요: 태그에 특정 class를 제거하는 메소드
//2.input: name-해당 태그에 ref값, className-제거할 class
//3.return: X
function removeClass(name, className, vue)
{
    let classNameArray = className
    for(let i=0; i<classNameArray.length; i++)
    {
        vue.$refs[name].classList.remove(classNameArray[i])
    }
}

//작성일:2021-04-27
//작성자:park
//1.개요: 차트를 그리는 영역을 생성하는 메소드
//2.input: name-해당 태그에 ref값, className-제거할 class
//3.return: childrenTab(차트 그릴 영역)
function makeChartDiv(parentTabId, childrenTabId)
{
    let parentTab = document.getElementById(parentTabId);
    // 하위 태그가 있을때
    if(parentTab.childElementCount > 0)
    {
        //하위태그 삭제
        document.getElementById(childrenTabId).remove()
    }
    
    var childrenTab = document.createElement('canvas');
    childrenTab.setAttribute('id',childrenTabId);
    parentTab.appendChild(childrenTab);
    
    return document.getElementById(childrenTabId);
}

function setOverlayScrollbar()
{
    $(".overlay-scrollbars").overlayScrollbars({
        className: "os-theme-light",
        resize: "none",
        sizeAutoCapable : true,
        clipAlways : true,
        normalizeRTL : true,
        paddingAbsolute : false,
        autoUpdate : null,
        autoUpdateInterval : 33,
        nativeScrollbarsOverlaid :
        {
            showNativeScrollbars : false,
            initialize : true
        },
        overflowBehavior :
        {
            y : "scroll"
        },
        scrollbars :
        {
            visibility : "auto",
            autoHide : "leave",
            autoHideDelay : 200,
            dragScrolling : true,
            clickScrolling : true,
        },
    });
}