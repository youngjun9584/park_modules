<!-- 
    작업자:park
    날짜:2021-04-14
    내용:년/월/일 에대한 selectBox
 -->
<template>
    <div class="input-group">
        <select class="form-control" v-model="value.year" style="max-width: 30%;" size=1>
            <option v-for="(year, index) in selectData.year" :key="index" :value="year" :selected="value.year == year">{{year}}</option>
        </select>
        <span class="selectBoxDateText">년</span>


        <select v-show = "radioType == 'day'||radioType == 'time'" class="form-control"  v-model="value.month" style="max-width: 30%;">
            <option v-for="(month, index) in selectData.month" :key="index" :value="month" :selected="value.month == month">{{month}}</option>
        </select>
        <span v-show = "radioType == 'day'||radioType == 'time'" class="selectBoxDateText">월</span>

        
        <select  v-show = "radioType == 'time'" class="form-control"  v-model="value.day" style="max-width: 30%;">
            <option v-for="(day, index) in selectData.day" :key="index" :value="day" :selected="value.day == day">{{day}}</option>
        </select>
        <span v-show = "radioType == 'time'" class="selectBoxDateText">일</span>
    </div>
</template>

<script>
export default {
    name: '',
    components: 
    {
    },
    props:
    {
        //초기값은 time개, 라디오 타입에 따라 selectbox 보이는 방식이 따름
		radioType:
		{
			type: String,
			default: () => ('time')
        },
    },
    data(){
        return {
            selectData:
            {
                year:[],
                month:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                day:[],
            },
            value:
            {
                year:0,
                month:0,
                day:0,
            },
            returnDate:''

        }
    },
    computed:
    {

    },
    watch: 
    {
        //year 값이 바뀔때마다 날짜가 바꾸는 메소드
        'value.year': function()
        {
            this.setReturnDate()
        },
        //month 값이 바뀔때마다 해당 월의 마지막날짜가 달라서 구하는 메소드
        'value.month': function(newValue, oldValue)
        {
            //최초값은 현재 날짜로 맞추어야된다.
            if(oldValue != 0)
            {
                this.value.day = 1;
            }
            let lastDate = new Date(this.value.year, newValue, 0);
            let dayArray = [];
            for(let i = 1; i<=lastDate.getDate(); i++)
            {
                dayArray.push(i);
            }
            this.selectData.day = [...dayArray];

            this.setReturnDate()
        },
        //day 값이 바뀔때마다 날짜가 바꾸는 메소드
        'value.day': function()
        {
            this.setReturnDate()
        },
        //radioType 값이 바뀔때마다 날짜가 바꾸는 메소드
        radioType: function()
        {
            this.setReturnDate()
        },

    },
    methods:
    {
        /* 
        - Date:2021-02-18
        - park
        - 현재시각 구하기
        - return:x
        */
        getSelectData()
        {
            let now = new Date()
            let nowYear = now.getFullYear();
            let yearArray = []
            //년도 +- 10 년 정보 배열 얻기
            for(let i = nowYear-10; i<nowYear+10; i++)
            {
                yearArray.push(i)
            }
            this.selectData.year = [...yearArray]

            this.value.year = now.getFullYear();
            this.value.month = now.getMonth()+1;
            this.value.day = now.getDate();
        },
        /* 
        - Date:2021-04-15
        - park
        - selectbox에 값을 radioType에 따라 날짜 포맷에 바뀌는 메소드
        - return:date
        */
        setReturnDate()
        {
            switch(this.radioType)
            {
                //시간일때 년,월,일 다 보여줌
                case 'time':
                    this.returnDate = new Date(this.value.year, this.value.month-1, this.value.day);
                break;
                //날짜일때 년,월, 일=1 로 보여줌
                case 'day':
                    this.returnDate = new Date(this.value.year, this.value.month-1);
                break;
                //날짜일때 년,월=1, 일=1 로 보여줌
                case 'month':
                    this.returnDate = new Date(this.value.year, 0);
                break;
                default:
                    this.returnDate = new Date();
            }
            this.sendStandardDate();
        },
        /* 
        - Date:2021-04-15
        - park
        - selectbox에 값을 radioType에 따라 날짜 포맷에 
        - return:date
        */
        sendStandardDate()
        {
            this.$emit('getStandardDate', this.returnDate);
        },

    },
    created: function()
    {
        this.getSelectData()
    },
    mounted: function()
    {
    },
}
</script>

<style>
.selectBoxDateText
{
    margin-top: 5px;
    margin-right: 5px;
}
</style>
