//***export 선언부분************************************************************************************* */
export {
    changeArrayOrder, //배열에 대한 자료 순서를 바꾸는 함수
    cumulativeTotalArray, //배열에 대한 누적합계를 계산하는 함수
    arrayTotalvalue, //배열에 담긴 합계값 구하는 함수
    addNumberAndOrderArray, //배열 오름차순 및 num 추가
    orderArray, //object 배열 오름차순
    descendingArray,  //object 배열 내림차순
};



//***함수 선언부분************************************************************************************* */

//작성일:2021-04-06
//작성자:park
//1.개요: 배열에 대한 자료 순서를 바꾸는 함수
//2.input: list(배열값), targetIdx(바꿀 인덱스), moveValue(이동할 값 ex) -1, 1, 3 ...)
//3.return: object-> {메세지, 변경된 배열}
function changeArrayOrder (list, targetIdx, moveValue) 
{
let changeArrayObject = {result:true,tempList:[]};
// 배열값이 없는 경우 나가기
if (list.length < 0)
{
    changeArrayObject.result = false;
    return changeArrayObject;
}

// 이동할 index 값을 변수에 선언
const newPosition = targetIdx - moveValue;

// 이동할 값이 0보다 작거나 최대값을 벗어나는 경우 종료
if (newPosition < 0 || newPosition >= list.length)
{
    changeArrayObject.result = false;
    return changeArrayObject;
}

// 임의의 변수를 하나 만들고 배열 값 저장
const tempList = JSON.parse(JSON.stringify(list));

// 옮길 대상을 target 변수에 저장하기
//[0] 붙히는 이유는 splice가 배열로 리턴된다. 난 배열의 요소값만 필요
const target = tempList.splice(targetIdx, 1)[0];

// 새로운 위치에 옮길 대상을 추가하기
// 0이 있으면 추가 0이 없으면 지정 값에 삭제하고 추가
tempList.splice(newPosition, 0, target);
// 결과에 배열 담기
changeArrayObject.tempList = [...tempList];

return changeArrayObject;
}

//작성일:2021-04-16
//작성자:park
//1.개요: 배열에 대한 누적합계를 계산하는 함수
//2.input: array
//3.return: Array-> {누적합계 배열}
function cumulativeTotalArray(array) 
{
let arrayData = []
for(let i=0; i<array.length; i++)
{
    if(i == 0)
    {
        arrayData.push(array[i])
    }
    else
    {
        arrayData.push(array[i]+arrayData[i-1])
    }
}

return arrayData
}

//작성일:2021-04-16
//작성자:park
//1.개요: 배열에 담긴 합계값 구하는 함수
//2.input: array
//3.return: Number-> 합계
function arrayTotalvalue(array) 
{
let total = 0;
for(let i=0; i<array.length; i++)
{
    total += array[i]
}

return total
}

//작성일:2021-04-06
//작성자:park
//1.개요: 배열에 대한 자료 순서를 바꾸는 함수
//2.input: array(배열), sortOrder(내림차순 항목), isAddNumber(true/false)
//3.return: Array
function addNumberAndOrderArray(array, sortOrder = false,  isAddNumber = false) 
{
let arrayData = []
if(sortOrder)
{
    //등록일 내림차순으로 정렬
    array.sort(function(a, b){
        return new Date(b[sortOrder]).getTime() - new Date(a[sortOrder]).getTime()
    });
}
if(isAddNumber)
{
    //번호 
    for(var i=0; i<array.length; i++)
    {
        array[i].num = array.length - i;
    }
}
return arrayData = [...array]
}

//작성일:2021-04-06
//작성자:park
//1.개요: Object 배열에 오름차순
//2.input: array(배열), sortOrder(내림차순 항목), isAddNumber(true/false)
//3.return: Array
function orderArray(array, sortOrder) 
{
//오름차순으로 정렬
array.sort(function(a, b){
    return a[sortOrder] - b[sortOrder]
});
return array
}

function descendingArray(array, sortOrder) 
{
    //내림차순으로 정렬
    array.sort(function(a, b){
        return a[sortOrder] - b[sortOrder]
    });
    return array
}
