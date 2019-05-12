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
                            <small>Sign in with credentials</small>
                        </div>
                        <form role="form">
                            <tabs @activatedTab="userSelect">
                                <tab-pane title="Client" ></tab-pane>
                                <tab-pane title="Tester"></tab-pane>
                            </tabs>
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.email"
                                        @keyup.enter.native = "login"
                                        >
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password"
                                        @keyup.enter.native = "login"
                                        >
                            </base-input>

                            <base-checkbox class="custom-control-alternative" v-model="model.remember">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <div class="text-center">
                                <span class="text-danger" v-if="loginFailed">Invalid credentials!</span>
                            </div>
                            <div class="text-center">
                                <base-button type="primary" class="my-4" @click="login()">Sign in</base-button>
                            </div>
                        </form>
                        <div class="d-flex justify-content-between">
                            <div>
                                <router-link to = "/reset" class="text-primary"><small>Forgot password?</small></router-link>
                            </div>
                            <div>
                                <router-link to="/register" class="text-primary"><small>Create a new account</small></router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
  import axios from 'axios';
  import router from 'vue-router';
  import '../main.js'
  import {store} from '../store.js'
  export default {
    name: 'login',
    data() {
      return {
        model: {
          email: '',
          password: '',
          remember: false
        },
        loginFailed : false,
        userType: 'client'
      }
    },
    
    methods:{
        login(){
            axios.defaults.headers={
                
            }
            axios.post("/"+this.userType+"/login",
            {
                email: this.model.email,
                password: this.model.password,
                remember_me: this.model.remember
            })
            .then( response => {
                // console.log('wtf');
                this.loginSuccess(response);
            })
            .catch( error => {
                // console.log('hmmm')
                this.loginFailure(error)
            })
        },

        userSelect(index){
            switch(index){
                case 0: this.userType = 'client'; break;
                case 1: this.userType = 'tester'; break;
            }
        },


        loginSuccess(response){
            // console.log(response.data);
            if(!response.data.success){
                this.loginFailure();
                return;
            }
            let token = response.data.data.access_token;
            store.commit('setUserToken',token);

            
            store.dispatch('isAuth');
            this.loginFailed = false;
            let destPath = this.userType+"/dashboard";
            this.$router.push(destPath);
        },

        loginFailure(error){
            console.log(error)
           this.loginFailed = true
        },

    },

    mounted() {
        // this.$store.isAuth()
        // .then( () => {
        //     console.log(JSON.stringify(this.$store.user));
        //     if(!this.$store.user.valid)
        //         return;
            
        //     this.userType = this.$store.user.userType;
        //     let destPath = this.userType+"/dashboard";
        //     // console.log('hi')
        //     this.$router.push(destPath);
        // })
        
        store.dispatch('isAuth')
        .then( () => {
            console.log('hmm')
            let user = store.getters.user;
            if(!user.valid)
                return;
            this.userType = user.type;
            let destPath = this.userType+"/dashboard";
            this.$router.push(destPath);
        })
    }
  }
</script>
<style>

</style>
