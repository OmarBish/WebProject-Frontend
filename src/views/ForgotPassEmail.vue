<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <!-- TODO -->
                    <!--
                    <div class="card-header bg-transparent pb-5">
                        <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
                        <div class="btn-wrapper text-center">
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                                <span class="btn-inner--text">Github</span>
                            </a>
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                <span class="btn-inner--text">Google</span>
                            </a>
                        </div>
                        
                    </div>
                    -->
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <small>Reset your password</small>
                        </div>
                        <form role="form">

                            <tabs @activatedTab="userSelect" v-if="state==='email'">
                                <tab-pane title="Client" ></tab-pane>
                                <tab-pane title="Tester"></tab-pane>
                            </tabs>

                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.email"
                                        @keyup.enter.native = "reset"
                                        v-if="state==='email'"
                                        >
                            </base-input>

                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Confirmation Code"
                                        addon-left-icon="ni ni-key-25"
                                        v-model="model.code"
                                        @keyup.enter.native = "reset"
                                        v-if="state==='code'"
                                        >
                            </base-input>

                            <base-input class="input-group-alternative mb-3"
                                        placeholder="New password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password"
                                        @keyup.enter.native = "sendPassword"
                                        v-if="state==='resetting'"
                                        >
                            </base-input>

                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Confirm new password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.c_password"
                                        @keyup.enter.native = "reset"
                                        v-if="state==='resetting'"
                                        >
                            </base-input>

                            <div class="text-center">
                                <span class="text-danger" v-if="invalid">{{ invalidMessage }}</span>
                            </div>
                            <div class="text-center">
                                <base-button type="primary" class="my-4" @click="reset()">{{ buttonText }}</base-button>
                            </div>
                        </form>
                        <div class="d-flex justify-content-between">
                            <div>
                                <router-link to="/register" class="text-primary text-center"><small>Create a new account</small></router-link>
                            </div>
                            <div>
                                <router-link to="/login" class="text-primary text-center"><small>Login into your account</small></router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    
                </div>
            </div>
        </div>
</template>
<script>
  import axios from 'axios';
  import router from 'vue-router';
  export default {
    name: 'forgot-pass',
    data() {
      return {
        model: {
          email: '',
          code: '',
          password: '',
          c_password: ''
        },
        invalidEmail : false,
        invalidToken : false,
        state: 'email',
        userType: 'client'
      }
    },
    
    computed:{
        
        // success(response){

        // },
        // fail(error){

        // },
        buttonText(){
            switch(this.state){
                case 'email': return 'Request password reset';
                case 'code': return 'Validate code';
                case 'resetting': return 'Set new password';
            }
        },

        invalid(){
            return false;
        },

        invalidMessage(){
            return "Invalid email!";
        },
        
        userSelect(index){
            switch(index){
                case 0: this.userType = 'client'; break;
                case 1: this.userType = 'tester'; break;
            }
        },

    },

    methods:{
        sendRequest(route){
            axios.post("/reset/email",
            {
                email: this.model.email,
                type: this.userType,
            })
            .then( response => {
                // this.success(response);
                this.state = 'code';
            })
            .catch(error => {
                // this.fail(error)
            })
        },
        sendCode(route){
            this.state='resetting';
            // axios.post(route+"code",
            // {
            //     email: this.model.email,
            //     type: this.userType,
            //     code: this.model.code

            // })
            // .then( response => {
            //     // this.success(response);
                
            // })
            // .catch(error => {
            //     // this.fail(error)
            // })
        },
        sendPassword(route){
            axios.post("/reset/password",
            {
                email: this.model.email,
                type: this.userType,
                code: this.model.code,
                password: this.model.password,
                c_password: this.model.c_password
            })
            .then( response => {
                // this.success(response);
                this.$router.push('/login');
            })
            .catch(error => {
                // this.fail(error)
            })
        },
        reset(){
            // let route = "/"+this.userType+"/reset";
            switch(this.state){
                case 'email': this.sendRequest('/reset/email'); break;
                case 'code': this.sendCode('/reset/code'); break;
                case 'resetting': this.sendPassword('/reset/pass'); break;
            }
        },
    }
  }
</script>
<style>
</style>
