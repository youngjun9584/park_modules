<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header">
                        <h3 slot="header">이메일 인증</h3>
                    </slot>
                    <button 
                            type="button" 
                            class="btn btn-secondary" 
                            v-on:click="closeModal()"
                    >
                        닫기
                    </button>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        <div v-if="userEmailDuplicate">
                            <input 
                                    class="form-control checkRequired checkBlank checkMail" 
                                    type="text" 
                                    v-model="mailConfirm.mail" 
                                    ref="confirmUserMail"
                                    placeholder="이메일 입력 기재바랍니다."
                                    style="margin-bottom: 13px;"
                                    v-on:mousedown="removeClass('confirmUserMail',['is-invalid','is-valid'])"
                            >
                            <button 
                                    type="button" 
                                    class="btn btn-success" 
                                    style="float: right;"
                                    v-on:click="checkUserEmailDuplicate()"
                            >
                                중복체크
                            </button>
                        </div>
                        <div v-else>
                            <span>{{mailConfirm.mail}}에 인증번호가 발송되었습니다.</span>
                            <input 
                                    class="form-control" 
                                    type="text" 
                                    v-model="mailConfirm.number" 
                                    placeholder="인증번호 입력 기재 바랍니다."
                                    style="margin-bottom: 13px;"
                            >
                        </div>
                    </slot>
                </div>
                <div v-if="!userEmailDuplicate" class="modal-footer">
                    <slot name="footer">
                        <button type="button" class="btn btn-secondary" v-on:click="sendMailConfirm()">인증번호 재발행</button>
                        <button type="button" class="btn btn-primary" v-on:click="checkMailCode()">인증하기</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import pathDefine from '@autonomous/web/js/pathDefine/aicmControlServer/pathDefine.js'
import {isValidate} from '@IM_node_modules/js/common/validateCheck.js'

export default {
    name: '',
    components: 
    {
    },
    data(){
        return {
            userEmailDuplicate:true,
            mailConfirm:
            {
                number:'',
                mail:'',
            }
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
        closeModal()
        {
            this.$emit('changeModalConfirm', 'mailModal',false)
        },
        //작성일:2020-06-11
        //1.개요:태그에 특정 class를 제거하는 메소드
        //2.input: name-해당 태그에 ref값, className-제거할 class
        removeClass(name,className)
        {
            var classNameArray = className
            for(var i=0; i<classNameArray.length; i++)
            {
                this.$refs[name].classList.remove(classNameArray[i])
            }
        },
        //작성일:2020-04-27
        //1.개요:사용자메일을 중복체크 하여 userEmailDuplicate에 값을 입력한다.
        //2.true:중복값이 있다. false:중복값이 없다.
        checkUserEmailDuplicate()
        {
            let vue = this;
            vue.userEmailDuplicate = true;
            
            //필수값 확인
            if(isValidate([this.$refs['confirmUserMail']]))return;

            axios.get(pathDefine.apiUrl.join.existEmailApi,
            {
                params:
                {
                    userEmail:vue.mailConfirm.mail
                }
            })
              .then((response)=>
              {
                  console.log(response);
                  if(response.data.data == true)
                  {
                      alert("이메일이 중복되었습니다")
                      this.$refs['confirmUserMail'].classList.add('is-invalid')
                      vue.userEmailDuplicate = response.data.data
                      return false
                  }
                  else if(response.data.data == false)
                  {
                      //메일 발송 메소드 실행
                      vue.sendMailConfirm();
                      //인증번호란 표출 구분값 바꾸기
                      vue.userEmailDuplicate = response.data.data
                      return true
                  }
                  else
                  {
                      alert(response.data.data);
                  }
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })
              .then(function () {
                // always executed
              });
        },
        /* 
        - Date:2021-02-02
        - park
        - 인증코드를 메일로 보내는 메소드
        - return:X
        */
        sendMailConfirm()
        {
            axios.get(pathDefine.apiUrl.join.varificationApi+'/'+this.mailConfirm.mail)
            .then(function (response)
            {
                console.log(response);
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
            .then(function () {
            // always executed
            });
        },
        checkMailCode()
        {
            let vue = this;
            axios.post(pathDefine.apiUrl.join.checkVarificationApi, {
                userEmail: vue.mailConfirm.mail,
                verificationCode: vue.mailConfirm.number,
            }, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .then(function(response) {
                console.log(response)
                if(response.data.data)
                {
                    alert('메일 인증이 확인되었습니다.')
                    vue.$emit('changeUserEmail', vue.mailConfirm.mail);
                    vue.$emit('changeMailConfirmCheck', true);
                    vue.closeModal();
                }
                else
                {
                    alert('인증번호가 틀렸습니다. 확인부탁드립니다.')
                }
            })
            .catch(function(error) {
                // handle error
                console.log(error);
            })
            .then(function() {
                // always executed
            });

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
<style lang="scss">
 @import './src/modal.css';
 </style>
