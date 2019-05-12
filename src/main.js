import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import axios from "axios";
import { watchFile } from 'fs';

var BASE_URL = "http://138.68.95.166/";
axios.defaults.baseURL=BASE_URL;
Vue.config.productionTip = false

// export default Vue.prototype.$store = {
//   debug: true,
//   state: {
//     // username: localStorage.getItem('username') || '',
//     usertoken: localStorage.getItem('usertoken') || '',
//     user: {valid:false},
//     data:{
//       points: 10,
//       tasks:[]
//     }
//   },

  


//   setToken(usertoken){
//     // this.username = username;
//     this.state.usertoken = usertoken;
//     this.storeToken();
//   },

//   clearToken(){
//     // this.username = '';
//     this.setToken('');
//   },

//   storeToken(){
//     // localStorage.setItem('username', this.state.username);
//     localStorage.setItem('usertoken', this.state.usertoken);
//   },

//   getToken(){
//     return localStorage.getItem('usertoken') || '';
//   },


//   isAuth(){
//     axios.defaults.headers={
//       'Authorization': 'Bearer ' + this.getToken()
//     }
//     this.user = {valid:false}
//     return (axios.get('/api/user', {})
//         .then( (response) => {
//           if(response.data.revoked){
//             this.setUser(false);
//           }
//           else{
//             this.setUser(true, response.data.user_id, respone.data.username,response.data.scopes[0]);
//           }
//         })
//         .catch( error => {
//             this.setUser(false); 
//         }))
//   },

//   setUser(valid, id, username, type){
//     this.user.valid = valid;
//     if(!valid)
//       return;
//     this.user.id = id;
//     this.user.username = username;
//     this.user.userType = type;
//   },

//   setData(data){
//     // console.log(this.state.data);
//     this.state.data = data;
    
//   },

//   getAllClientData(){
//     console.log('thefuck');
//     axios.defaults.headers={
//       'Authorization': 'Bearer ' + this.getToken()
//     }
//     return axios.get('/client/all', {
//       // headers:{'Authorization': 'Bearer ' + this.getToken()}
//     })
//     .then( response => {
//       // console.log(this.state.data);
//       this.setData(response.data.data);
//       console.log('xd');
//       console.log(this.state.data);
      
//     })
//     .catch( error => {
//       console.log('ffs');
//     });
//     // console.log(this.state.data);
//   },

//   logout(){
//     axios.get('/'+this.user.userType+'/logout',{})
//     .then( response => {
//       this.clearToken();
//     })
//     .catch( error => {
//       this.clearToken();
//     })
//   }
// }


Vue.use(ArgonDashboard)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')