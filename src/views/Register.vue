<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <!-- <div class="card-header bg-transparent pb-5">
                    <div class="text-muted text-center mt-2 mb-3">
                        <small>Sign up with</small>
                    </div>
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
                </div> -->
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <small>Sign up with credentials</small>
                    </div>
                    <form role="form">
                        <tabs @activatedTab="userSelect">
                            <tab-pane title="Client"></tab-pane>
                            <tab-pane title="Tester"></tab-pane>
                        </tabs>
                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Name"
                                    addon-left-icon="ni ni-hat-3"
                                    v-model="model.name"
                                    :valid="!isInvalid.name"
                                    @focus="setValid('name',true)"
                                    >
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Email"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="model.email"
                                    :valid="!isInvalid.email"
                                    @focus="setValid('email',true)"
                                    >
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Password"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.password"
                                    :valid="!isInvalid.password"
                                    @focus="setValid('password',true)"
                                    >
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="Confirm Password"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.c_password"
                                    :valid="!isInvalid.c_password"
                                    @focus="setValid('c_password',true)"
                                    >
                        </base-input>

                        <!-- TODO  -->
                        <!-- <div class="text-muted font-italic">
                            <small>password strength: <span class="text-success font-weight-700">strong</span></small>
                        </div> -->

                        <div class="row my-4">
                            <div class="col-12" @click="setValid('policy', true)">
                                <base-checkbox class="custom-control-alternative" v-model="checked" :class="{'has-danger': isInvalid.policy}">
                                    <span class="text-muted">I agree with the <a href="#!"> Privacy Policy</a></span>
                                </base-checkbox>
                            </div>
                        </div>
                        <div class="text-center">
                            <base-button type="primary" class="my-4" @click="register">Create account</base-button>
                        </div>
                    </form>
                    <div class="text-center">
                        <router-link to="/login" class="text-primary">
                            <small>Login into your account</small>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import axios from 'axios';
  import router from 'vue-router'
  export default {
    name: 'register',
    data() {
      return {
        model: {
          name: '',
          email: '',
          password: '',
          c_password: ''
        },
        isInvalid: {
            name: false,
            email: false,
            password: false,
            c_password: false,
            policy: false
        },
        checked: false,
        userType: 'client'
      }
    },

    methods:{

        register(){
            if(!this.validateInput())
                return;
            axios.post("/"+this.userType+"/register",
            {
                name: this.model.name,
                email: this.model.email,
                password: this.model.password,
                c_password: this.model.c_password
            })
            .then( response => {
                this.registerSuccess();
            })
            .catch(error => {
                this.registerFailure()
            })
        },

        registerSuccess(){
            this.$router.push('login');
        },

        registerFailure(){

        },

        userSelect(index){
            switch(index){
                case 0: this.userType = 'client'; break;
                case 1: this.userType = 'tester'; break;
            }
        },

        validateInput(){
            
            let valid = true;
            if(this.model.name == ""){
                this.isInvalid.name = true;
                valid = false;
            }
            if(!this.validateEmail(this.model.email)){
                this.isInvalid.email = true;
                valid = false;
            }
                
            // TODO password strength check
            if(this.model.password == ""){
                this.isInvalid.password = true;
                valid = false;
            }
            if(this.model.c_password == "" || this.model.password !== this.model.c_password){
                this.isInvalid.c_password = true;
                valid = false;
            }
            if(!this.checked){
                this.isInvalid.policy = true;
                valid = false;
            }
            return valid;
        },

        validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },

        setValid(property, value){
            this.isInvalid[property] = !value;
        }

    }

  }
</script>
<style>
</style>
