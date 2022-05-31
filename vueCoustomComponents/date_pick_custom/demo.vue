<template>
    <div class="row row-col-2">
        <div class="form-group  col">
            <div class="input-group">
                <span class="input-group-text">조회 기간</span>
                <datePickCustom 
                        :option = datePickOption
                        @formStartDate = "getStartDate"
                        @fromEndDate = "getEndDate"
                ></datePickCustom>
            </div>
        </div>
    </div>
</template>


<script>
import datePickCustom from '@autonomous/web/vueLib/date_pick_custom/date_pick_custom.vue';

export default {
    name: 'management',
    components: 
    {
    },
    data () {
        return {
            startDate: '',                      //시작날짜
            endDate:'',                         //끝 날짜
            datePickOption:{                    //옵션
                startDate:new Date(),           //datePickCustom 날짜값 세팅
                endDate:new Date(),             //datePickCustom 날짜값 세팅 // false로 주면 사라짐
            },
        }
    },
    computed:
    {
    },
    watch: 
    {

    },
    methods:
    {
        //시작날짜값 받아오는 메소드
        getStartDate(value)
        {
            this.startDate = value;
        },
        //끝날짜값 받아오는 메소드
        getEndDate(value)
        {
            this.endDate = value;
        },
    },
    created: function()
    {
    },
}
</script>
