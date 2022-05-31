<template>
    <b-pagination
        :disabled="disabled"
        @change="change"
        v-model="currentPage"
        :total-rows="total"
        :per-page="pageSize"
        :limit="limit"
        align="center"
        first-text="<<"
        prev-text="<"
        next-text=">"
        last-text=">>"
    >
    </b-pagination>
</template>

<script>
import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";
import { getJson } from "@IM_node_modules/js/common/dataBinding.js";
import _ from "lodash";

Vue.use(BootstrapVue);

export default {
    name: "Pagination",
    props: {
        limit: {
            type: Number,
            default: 11,
        },
        pageSize: {
            type: Number,
            default: 10,
        },
        freezing: {
            type: Boolean,
            default: true,
        },
        url: {
            type: String,
            required: true,
        },
        params: {
            type: Object,
            default() {
                return {};
            },
        },
        pageCurrentParamName: {
            type: String,
            default: "page",
        },
        pageSizeParamName: {
            type: String,
            default: "size",
        },
        isDummySever: {
            type: Boolean,
            default: false,
        },
        totalAnchor: {
            type: String,
            required: true,
        },
        isInitialFetchEnabled: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            disabled: false,
            currentPage: 1,
            total: 0,
        };
    },
    methods: {
        async change(page) {
            const result = await this.fetch(page);
            this.$emit("data", ...result);
        },
        refresh(resetFirstPage = false) {
            if(resetFirstPage) {
                this.currentPage = 1;
            }
            // 목록 데이터 요청 시 현재 페이지 기준으로 다시 요청 (정렬 변경이나 Radio Type 변경 시)
            this.fetch(this.currentPage).then((result) => {
                this.$emit("data", ...result);
            });
        },
        async fetch(page) {
            const param = Object.assign({}, this.params);
            param[this.pageCurrentParamName] = page;
            param[this.pageSizeParamName] = this.pageSize;
            if(this.isDummySever) {
                param.total = 34; // TODO: dummy 서버에는 강제로 total을 던져줌
            }

            if (this.freezing) {
                this.disabled = true;
            }
            let data = undefined;
            let err = undefined;
            try {
                const axiosResult = await getJson(this.url, param);

                data = axiosResult.data;
                const statusCode = axiosResult.status;

                // console.log("결과코드", statusCode);
                // console.log("결과", data);

                // console.log("키", this.totalAnchor);

                if (data) {
                    this.total = _.get(data, this.totalAnchor);
                    // console.log("토탈", this.total);
                }
            } catch (e) {
                console.error(e);
                err = e;
            }
            if (this.freezing) {
                this.disabled = false;
            }

            return [data, err];
        },
    },
    mounted() {
        if(this.isInitialFetchEnabled) {
            this.refreshWithFirstPage();
        }
    },
};
</script>