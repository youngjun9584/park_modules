<template>
    <div>
        <div class="row">
            <div class="form-group  col-lg-5">
                <div class="input-group">
                    <span class="input-group-text" style="width:18%">이메일*</span>
                    <input 
                            type="email" 
                            ref='userEmail' 
                            v-model="form.userEmail" 
                            class="form-control checkRequired" 
                            placeholder="이메일 인증을 부탁드립니다." 
                            title="이메일"  
                            readonly
                    >
                </div>
            </div>
            <!-- 이메일 인증 모달창 버튼 -->
            <div v-if="mailConfirm.check">
                <button 
                        type="button" 
                        class="btn btn-info" 
                        disabled
                >
                    인증완료
                </button>
            </div>
            <div v-else>
                <button 
                        type="button" 
                        class="btn btn-warning" 
                        v-on:click="openModal"
                >
                    메일인증
                </button>
            </div>
        </div>
        <EmailConfirmModal 
                v-if="modalConfirm" 
                @changeModalConfirm = "fromModalConfirm"
                @changeUserEmail = "fromUserEmail"
                @changeMailConfirmCheck = "fromMailConfirmCheck"
        ></EmailConfirmModal>
    </div>
</template>
<script>
import EmailConfirmModal from '@autonomous/web/vueLib/email_confirm_modal/EmailConfirmModal.vue'

export default {
    name: '',
    components: 
    {
        EmailConfirmModal
    },
    data(){
        return {
            mailConfirm:
            {
                check:false,
            },
            modalConfirm:false,
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
        fromModalConfirm(newModalConfirm)
        {
            this.modalConfirm = newModalConfirm;
        },
        fromUserEmail(newUserEmail)
        {
            this.form.userEmail = newUserEmail;
        },
        fromMailConfirmCheck(newMailConfirmCheck)
        {
            this.mailConfirm.check = newMailConfirmCheck;
        },
        checkValidation()
        {
            let dataForm = this.form;
            var mPassword = dataForm.password;

            //이메일 인증체크
            if(!this.mailConfirm.check)
            {
                alert("이메일 인증을 부탁드립니다.")
                this.$refs['userEmail'].classList.add('is-invalid')
                return false
            }
        }

    },
    created: function()
    {
    },
    mounted: function()
    {
    },
}
</script>
<style>
</style>