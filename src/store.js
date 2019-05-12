import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    usertoken: localStorage.getItem('usertoken') || '',

    user: {
      valid: false,
      id: -1,
      username: 'null',
      email: 'a@a.a',
      type: "client"
    },

    data:{
      points: 10,
      tasks:[]
    },

    managingTask: -1,
    answeringTask: -1

  },
  mutations: {
    setUserToken(state, payload){
      state.usertoken = payload;
      localStorage.setItem('usertoken', payload);
    },
    setUserData(state, payload){
      state.user = payload;
    },
    
    setData(state, payload){
      state.data = payload;
    },

    setManagingTask(state, taskIndex){
      state.managingTask = taskIndex;
    },

    setAnsweringTask(state, taskIndex){
      state.answeringTask = taskIndex;
    }

  },
  actions: {  
    isAuth(){
      // console.log('hmxm')
      axios.defaults.headers={
        'Authorization': 'Bearer ' + store.getters.token
      }
      store.commit('setUserData', {valid: false})
      return (axios.get('/api/user', {})
          .then( (response) => {
            console.log(response.data.user_id)
            if(response.data.revoked){
              // console.log('damn it')
              store.commit('setUserData',{valid: false});
            }
            else{
              // console.log('yay')
              store.commit('setUserData',{valid: true, id: response.data.user.id, username: response.data.user.name, email: response.data.user.email, type:response.data.token.scopes[0]});
              if(store.getters.user.type == 'client')
                store.dispatch('getClientData')
                .then( () => {

                })
              else if(store.getters.user.type == 'tester');
              store.dispatch('getTesterData')
              .then( () => {

              })
            }
          })
          .catch( error => {
            console.log(error)
            store.commit('setUserData',{valid: false});
          }))
    },

    logout(){
      axios.defaults.headers={
        'Authorization': 'Bearer ' + store.getters.token
      }
      return (axios.get('/logout',{} )
      .then( response => {

      })
      .catch( error => {

      })
      )
    },

    getClientData(){
      axios.defaults.headers={
        'Authorization': 'Bearer ' + store.getters.token
      }
      return(axios.get('/client/all',{}))
      .then( response => {
        store.commit('setData', response.data.data );
      })
      .catch (error => {
        console.log(error)
      })
    },

    getTesterData(){
      axios.defaults.headers={
        'Authorization': 'Bearer ' + store.getters.token
      }
      return(axios.get('/tester/all',{}))
      .then( response => {
        store.commit('setData', response.data.data );
      })
      .catch (error => {
        console.log(error)
      })
    },

    sendNewTask(context, payload){
      axios.defaults.headers={
        'Authorization': 'Bearer ' + store.getters.token
      }
      return(axios.post('/client/createtask',payload)
      .then( response => {

      })
      .catch ( error => {
        console.log(error)
      })
      )
    },

    setTestActive(context, payload){
      axios.defaults.headers={
        'Authorization': 'Bearer ' + store.getters.token
      }
      // console.log(payload)
      return(axios.post('/client/settaskactive',payload)
      .then( response => {

      })
      .catch ( error => {
        console.log(error)
      })
      )
    },

    sendAnswerReview(context, payload){
      axios.defaults.headers={
        'Authorization': 'Bearer ' + store.getters.token
      }
      return (axios.post('client/reviewanswer', payload)
      .then( response => {

      })
      .catch( error => {
        console.log(error);
      })
      )

    },

    addTask(context, payload){
      
      axios.defaults.headers={
        'Authorization': 'Bearer ' + store.getters.token
      }
      return (axios.post('tester/addtest', payload)
      .then( response => {
        store.dispatch('getTesterData');
      })
      .catch( error => {
        console.log(error);
        
      })
      )
    },

    sendAnswer(context, payload){
      axios.defaults.headers={
        'Authorization': 'Bearer ' + store.getters.token
      }
      return (axios.post('tester/sendanswer', payload)
      .then( response => {

      })
      .catch( error => {
        console.log(error);
        window.alert('A problem occured');
      })
      )
    },

    sendVideo(context, payload){
      return(axios.post( '/tester/upload',
      payload,
      {
        headers: {
            'Authorization': 'Bearer ' + store.getters.token,
            'Content-Type': 'multipart/form-data'
        }
      })
      .then(response =>{
          
      })
      .catch(error => {
        console.log(error);
      })
      )
    }    
    
  },
  getters: {    
    token(state){
      return state.usertoken
    },

    user(state){
      return state.user
    },

    data(state){
      return state.data
    },

    managingTask(state){
      return state.managingTask;
    },

    answeringTask(state){
      return state.answeringTask;
    }
  },


})