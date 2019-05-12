<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Points"
                                type="gradient-red"
                                :sub-title="''+model.points"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <!-- <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                            <span class="text-nowrap">Since last month</span> -->
                            <div class="d-flex justify-content-center">
                              <base-button size="sm" type="primary" @click="state='work'">Earn Points</base-button>
                            </div>
                            
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Rating"
                                type="gradient-orange"
                                :sub-title="rating"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <!-- <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
                            <span class="text-nowrap">Since last month</span> -->
                            <div class="d-flex justify-content-center">
                              <base-button size="sm" type="primary" @click="state='done'">View client feedback</base-button>
                            </div>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Current tasks"
                                type="gradient-green"
                                :sub-title="''+task_count"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <!-- <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
                            <span class="text-nowrap">Since last month</span> -->
                            <div class="d-flex justify-content-center">
                              <base-button size="sm" type="primary" @click="state='work'">Complete a task</base-button>
                            </div>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Available tasks"
                                type="gradient-info"
                                :sub-title="''+active_task_count"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <div class="d-flex justify-content-center">
                              <base-button size="sm" type="primary" @click="state='available'">Work on a new task</base-button>
                            </div>
                        </template>
                    </stats-card>
                </div>
            </div>
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">

            <!--Tables-->
            <div class="row mt-5">
                <div class="col-xl-12 mb-5 mb-xl-0">
                    <tester-tasks-table :table="{data:table}" :state="state" @new="state='available'"
                    @reviewTask="showReviewModal"
                    ></tester-tasks-table>
                </div>
                <completed-answer-modal :isEnabled="reviewModal" v-if="reviewModal"
                                        :answers="{data: model.completedTasks[selectedIndex].answers[0].subtask_answers}"
                                        :comment="model.completedTasks[selectedIndex].answers[0].comment_text"
                                        :has_video="model.completedTasks[selectedIndex].answers[0].video_link !== undefined"
                                        :video_link="model.completedTasks[selectedIndex].answers[0].video_link"
                                        @close="closeReviewModal">
                </completed-answer-modal>
                <!-- <div class="col-xl-3">
                    <social-traffic-table></social-traffic-table>
                </div> -->
            </div>
            <!--End tables-->
        </div>

    </div>
</template>
<script>
  import TesterTasksTable from './Tables/TesterTasksTable';
  import CompletedAnswerModal from './Modals/CompletedAnswerModal.vue';
	import { store } from '../store.js'
	import router from 'vue-router'
  export default {
    components: {
      TesterTasksTable,
      CompletedAnswerModal
    },
    data() {
      return {
        reviewModal: false,
        selectedIndex: -1,
        state: 'work', // work, available, done
        // model:{
        //   email:'',
        //   points: 1000,
          
        //   tasks: [
        //     {
        //       id: 1,
        //       name: 'Google',
        //       points: 50,
        //       video: false,
        //       active: true,
        //       websiteURL:'https://www.google.com'
        //     },
        //     {
        //       id: 2,
        //       name: 'YouTube',
        //       points: 50,
        //       video: true,
        //       active: true,
        //       websiteURL:'https://www.youtube.com'
        //     },
        //     {
        //       id: 3,
        //       name: 'Facebook',
        //       points: 50,
        //       video: false,
        //       active: false,
        //       websiteURL:'https://www.facebook.com'
        //     },
        //     {
        //       id: 4,
        //       name: 'Twitch',
        //       points: 50,
        //       video: true,
        //       active: true,
        //       websiteURL:'https://www.twitch.tv'
        //     },

        //   ],
        //   activeTasks: [
        //     {
        //       id: 1,
        //       name: 'Google',
        //       points: 50,
        //       video: false,
        //       active: true,
        //       websiteURL:'https://www.google.com'
        //     },
        //     {
        //       id: 2,
        //       name: 'YouTube',
        //       points: 50,
        //       video: true,
        //       active: true,
        //       websiteURL:'https://www.youtube.com'
        //     },
        //     {
        //       id: 3,
        //       name: 'Facebook',
        //       points: 50,
        //       video: false,
        //       active: false,
        //       websiteURL:'https://www.facebook.com'
        //     },
        //     {
        //       id: 4,
        //       name: 'Twitch',
        //       points: 50,
        //       video: true,
        //       active: true,
        //       websiteURL:'https://www.twitch.tv'
        //     },
        //   ],
        //   completedTasks: [
        //     {
        //       id: 1,
        //       name: 'Google',
        //       points: 50,
        //       video: false,
        //       active: true,
        //       websiteURL:'https://www.google.com',
        //       answer: {
        //         id: 1,
        //         time: 'Monday',
        //         hasVideo: true,
        //         hasComment: true,
        //         video_link: 'https://www.google.com',
        //         comment_text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ante augue, luctus at dolor ac, pulvinar congue ex. Donec a consectetur neque. Duis lacinia luctus consectetur. Nullam euismod gravida justo sit amet porttitor. Morbi lobortis maximus sodales. Quisque quis nisi a tellus tempus malesuada. Aenean vitae pellentesque justo, eget rutrum nulla.',
        //         case_answers:[
        //           {
        //             subtaskDescription: 'You should register in the website. Was it easy?',
        //             subtaskAnswer: 'Indeed',
        //             subtaskRating: 3
        //           },
        //           {
        //             subtaskDescription: 'You should login in the website. Was it easy?',
        //             subtaskAnswer: 'Yes',
        //             subtaskRating: 5
        //           },
        //           {
        //             subtaskDescription: 'You should change your profile in the website. Was it easy?',
        //             subtaskAnswer: 'The email modifcation could be improved',
        //             subtaskRating: 5
        //           },
        //           {
        //             subtaskDescription: 'You should delete your account in the website. Was it easy?',
        //             subtaskAnswer: 'I could not find the button to delete the account',
        //             subtaskRating: 4
        //           },

        //         ]
        //       }
        //     },
        //   ],
        // },
      };
    },
    methods: {
      // requestTasks(){
      //   axios.get('',{
      //     username: '',
      //     usertype: '',
      //     usertoken: ''
      //   })
      //   .then( response => {

      //   })
      //   .catch( error => {

      //   })
      // },

      // requestAnswers(){
      //   axios.get('',{
      //     username: '',
      //     usertoken: ''
      //   })
      //   .then( response => {

      //   })
      //   .catch( error => {
          
      //   })
      // },

      // requestAvailableTasks(){
      //   axios.get('',{
      //     username: '',
      //     usertoken: ''
      //   })
      //   .then( response => {

      //   })
      //   .catch( error => {
          
      //   })
      // },

      showReviewModal(id){
        for(let i = 0 ; i < this.model.completedTasks.length; i++){
          if(this.model.completedTasks[i].id == id){
            this.selectedIndex = i;
            this.reviewModal = true;
            return;
          }
        }
      },

      closeReviewModal(){
            this.reviewModal = false;
            this.selectedIndex = -1;
      }
    },

    mounted(){
        store.dispatch('isAuth')
        .then( () => {
            console.log(store.getters.user);
            if(!store.getters.user.valid)
            this.$router.push('/login');
            else if(store.getters.user.type == 'client')
            this.$router.push('/client/dashboard');
        })
    },

    computed:{
      model(){
        return store.getters.data; 
      },
      reserved_points(){
        let points = 0;
        for(let i = 0; i < this.task_count; i++){
          if(!this.model.tasks[i].finished)points += this.model.tasks[i].points;
        }
        return points;
      },

      unreserved_points(){
        return this.model.points - this.reserved_points;
      },

      task_count(){
        return this.model.tasks.length
      },

      active_task_count(){
        return this.model.activeTasks.length;
      },
      rating(){
        let sum = 0;
        let rated = false;
        if(this.model.completedTasks===undefined)
          return '-';  
        for(let i = 0; i < this.model.completedTasks.length; i++){
          let taskSum = 0;
          let ratedTask = true;
          for(let j = 0; j < this.model.completedTasks[i].answers[0].subtask_answers.length; j++){
            if(this.model.completedTasks[i].answers[0].subtask_answers[j].clientRating == 0){
              ratedTask = false;
              break;
            }
            taskSum += (this.model.completedTasks[i].answers[0].subtask_answers[j].clientRating-1)*25;
          }
          if(!ratedTask)
            continue;
          else{
            rated = true;
            if(this.model.completedTasks[i].answers[0].subtask_answers.length==0)
              continue;
            let taskAv = taskSum/this.model.completedTasks[i].answers[0].subtask_answers.length==0;
            sum+= taskAv;
          }
        }
        if(!rated || this.model.completedTasks.length == 0)
          return '-';
        else{
          let av = sum / this.model.completedTasks.length;
          return sum+"%";
        }
      },
      table(){
        switch(this.state){
          case 'work': return this.model.tasks;
          case 'available': return this.model.activeTasks;
          case 'done': return this.model.completedTasks;
        }
      }
    
    },

    
  };
</script>
<style></style>
