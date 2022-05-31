<template>
    <div class="d-flex flex-fill">
        <div class="flex-fill">
            <date-pick v-model="startDate" :startWeekOnSunday="true" :isDateDisabled="isFutureDate">
                <template v-slot:default="{ toggle, inputValue }">
                    <button style="z-index:20;" @click="toggle" class="btn d-flex justify-content-between form-control" :class="endDate ? ['date-pick-between'] : ['date-pick-end']">
                        <span></span>
                        <span class="align-middle">{{ inputValue || "시작날짜" }}</span>
                        <i class="c-icon cil-calendar align-middle"></i>
                    </button>
                </template>
            </date-pick>
        </div>
        <div v-if="endDate" class="flex-fill">
            <date-pick v-model="endDate" :startWeekOnSunday="true" :isDateDisabled="isFutureDate">
                <template v-slot:default="{ toggle, inputValue }">
                    <button @click="toggle" class="btn d-flex justify-content-between form-control date-pick-end">
                        <span></span>
                        <span class="align-middle">{{ inputValue || "시작날짜" }}</span>
                        <i class="c-icon cil-calendar align-middle"></i>
                    </button>
                </template>
            </date-pick>
        </div>
    </div>
</template>

<script>
import DatePick from "vue-date-pick";
import "@autonomous/web/vueLib/date_pick_custom/src/vueDatePick.css";
import { setdateFormat } from "@IM_node_modules/js/common/dateFormat.js";

export default {
    name: "datePickCustom",
    components: {
        DatePick,
    },
    props: {
        //option 값
        option: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            startDate: "",
            endDate: false,
        };
    },
    computed: {},
    watch: {
        /* 
        - Date:2021-06-17
        - park
        - 끝날짜값 변경 이벤트
        - return: 
        */
        endDate: function(newValue) {
            // 끝날짜가 시작 날짜보다 작을때
            if (new Date(this.startDate) > new Date(newValue)) {
                alert(this.startDate + "이후 날짜로 선택드립니다.");
                this.endDate = setdateFormat(new Date(), "YYYY-MM-DD");
            }
            //날짜값 부모컴포넌트로 보내기
            this.sendEndDate();
        },
        /* 
        - Date:2021-06-17
        - park
        - 시작날짜값 변경 이벤트
        - return: 
        */
        startDate: function(newValue) {
            // 시작날짜가 끝날짜보다 작을때
            if (this.endDate) {
                if (new Date(this.endDate) < new Date(newValue)) {
                    alert(this.endDate + "이전 날짜로 선택드립니다.");
                    this.startDate = this.endDate;
                }
            }
            //날짜값 부모컴포넌트로 보내기
            this.sendStartDate();
        },
    },
    methods: {
        /* 
        - Date:2021-06-17
        - park
        - 현재 날짜 end 처리
        - return: 
        */
        isFutureDate(date) {
            const currentDate = new Date();
            return date > currentDate;
        },
        /* 
        - Date:2021-06-17
        - park
        - 받아온 option 값 세팅하는 메소드 
        - return: 
        */
        setOption() {
            this.startDate = setdateFormat(this.option.startDate, "YYYY-MM-DD");
            if (typeof this.option.endDate != "undefined") {
                this.endDate = setdateFormat(this.option.endDate, "YYYY-MM-DD");
            }
        },
        /* 
        - Date:2021-06-17
        - park
        - 시작 날짜값 부모 컴포넌트에 보내기
        - return: 
        */
        sendStartDate() {
            this.$emit("formStartDate", new Date(this.startDate));
        },
        /* 
        - Date:2021-06-17
        - park
        - 끝 날짜값 부모 컴포넌트에 보내기
        - return: 
        */
        sendEndDate() {
            this.$emit("fromEndDate", new Date(this.endDate));
        },
    },
    created: function() {},
    mounted: function() {
        this.setOption();
    },
};
</script>
<style scoped lang="scss">
$lightGrayColor: #ced4da;
.btn {
    white-space: nowrap;
}
.btn:hover {
    background: rgba(148, 148, 150, 0.3);
}

.date-pick-end {
    border: 1px solid $lightGrayColor;
    border-radius: 0 0.25rem 0.25rem 0;
}
.date-pick-between {
    border: 1px solid $lightGrayColor;
    border-right-style: none;
    border-radius: 0;
}

</style>

