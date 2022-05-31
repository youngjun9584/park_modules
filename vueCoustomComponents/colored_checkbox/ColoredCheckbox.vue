<template>
    <div>
        <input type="checkbox" :id="checkboxId" :value="checkboxId" v-model="checked" hidden />
        <label
            class="check-shaped-label"
            :for="checkboxId"
            v-text="isChecked ? symbolChecked : symbolUnchecked"
            :style="isChecked ? { background: color } : { background: colorUnChecked }"
        ></label>
        <label class="h6 text-nowrap" :for="checkboxId">
            <slot name="label"></slot>
        </label>
    </div>
</template>

<script>
export default {
    name: "ColoredCheckbox",
    props: {
        color: {
            type: String,
            default: "#000",
        },
        colorUnChecked: {
            type: String,
            default: "#fafafa",
        },
        symbolChecked: {
            type: String,
            default: "✓",
        },
        symbolUnchecked: {
            type: String,
            default: "",
        },
        checkboxId: {
            type: String,
            required: true,
        },
        isChecked: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            checked: false,
        }
    },
    watch: {
        checked(val) {
            this.$emit("onChange", this.checkboxId, val)
        }
    },
    mounted() {
        this.checked = this.isChecked;
    }
};
</script>

<style scoped>
@import "./colred_checkbox.scss";
</style>
