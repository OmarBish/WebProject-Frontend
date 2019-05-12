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
                            <small>Hi</small>
                        </div>
                        <p>XD</p>
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
            axios.defaults.headers={
                'Authorization': 'Bearer ' + store.getters.token
            }

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
