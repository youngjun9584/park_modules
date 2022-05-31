


//작성일:2020-06-22
//1.개요:입력값을 체크하는 메소드
//2.input:classAraay-입력값을 체크하는 영역
//3.output:체크 여부 true/false
//4.기능:1)필수값,2)공백,3)숫자체크,4)전화번호 체크

/**
 *** 사용법 ***
    html 부분
<input type="text" class="checkRequired" name="valuedation">
    js 부분
if(isValidate(document.getElementsByName('valuedation')))return;
**/

export function isValidate(classAraay)
{
    for(var i = 0; i<classAraay.length; i++)
    {
        //필수값 체크
        if(classAraay[i].classList.contains('checkRequired') == true)
        {
            if(classAraay[i].value == "")
            {
                validationCallback(classAraay[i], 'checkRequired');
                return true;
            }
        }
        //공백 체크
        if(classAraay[i].classList.contains('checkBlank') == true)
        {
            var blankPattern = /[\s]/g;
             if( blankPattern.test(classAraay[i].value) == true)
             {
                 validationCallback(classAraay[i], 'checkBlank');
                 return true;
             }
        }
        //숫자 체크
        if(classAraay[i].classList.contains('checkNumber') == true && classAraay[i].value != "")
        {
             if(isNaN(classAraay[i].value) == true)
             {
                 validationCallback(classAraay[i], 'checkNumber');
                 return true;
             }
        }
        //전화번호 체크
        if(classAraay[i].classList.contains('checkTelephone') == true && classAraay[i].value != "")
        {
             var telePhonePattern = /^\d{2,3}-\d{3,4}-\d{4}$/;
             if(telePhonePattern.test(classAraay[i].value) == false)
             {
                 validationCallback(classAraay[i], 'checkTelephone');
                 return true;
             }
        }
        //메일 형식 체크
        if(classAraay[i].classList.contains('checkMail') == true && classAraay[i].value != "")
        {
             var telePhonePattern = /^\d{2,3}-\d{3,4}-\d{4}$/;
             var reg_email =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
             if(reg_email.test(classAraay[i].value) == false)
            {
                validationCallback(classAraay[i], 'checkMail');
                 return true;
            }
        }
    }

    return false;
}


function validationCallback(classtag, type)
{
    if(type == 'checkRequired')
    {
        alert(classtag.title+ "필수 기재 항목입니다.")
        classtag.classList.add('is-invalid')
    }
    else if(type == 'checkBlank')
    {
        alert('공백은 사용할 수 없습니다.')
        classtag.classList.add('is-invalid')
    }
    else if(type == 'checkNumber')
    {
        alert(classtag.title+ " 숫자만 입력부탁드립니다.")
        classtag.classList.add('is-invalid')
    }
    else if(type == 'checkTelephone')
    {
        alert("전화번호형식으로 입력부탁드립니다.")
        classtag.classList.add('is-invalid')
    }
    else if(type == 'checkMail')
    {
        alert("이메일 형식이 맞지 않습니다.")
        classtag.classList.add('is-invalid')
    }
}
