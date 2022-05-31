<!-- 
javascript:
let badgeInfo = new BadgeInformation("AEB", 0, "warning", "cil-garage");

html:
<badge :badgeInformation="badgeInfo"></badge> 
-->
<template>
    <div class="card badge-bg text-white border-0" :class="`bg-${badgeInformation.theme}`">
        <div class="card-body py-2">
            <div class="d-flex justify-content-between">
                <div>
                    <div class="h1 font-weight-normal" v-text="badgeInformation.count"></div>
                    <div class="text-nowrap" v-text="badgeInformation.name"></div>
                </div>
                <div class="text-right mb-2">
                    <i class="c-icon c-icon-3xl" :class="badgeInformation.icon"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BadgeInformation from './BadgeInformation';


export default {
    name: "Badge",
    props: {
        badgeInformation: {
            type: BadgeInformation
        },
    },
    data() {
        return {
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created: function() {},
    mounted: function() {},
};
</script>

<style scoped>
.badge-bg {
    border-radius: 13px;
}
</style>