<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{ tableTitle }}
          </h3>
        </div>
        <div class="col text-right">
        </div>
        <div>
        </div>
        
      </div>
    </div>

    <form>
      <div class="row justify-content-center">
        <div class="row col-10 p-0">
              <base-alert type="warning" class="col-12" v-if="!model.active">
                <strong>Notice!</strong> This test task is deactivated.
              </base-alert>
                <div class="col-12 d-flex justify-content-around">
                  <div class="col-6"><strong>Test Task Name: </strong>{{model.name}}</div>
                  <div class="col-6"><strong>Website URL: </strong><a :href="model.websiteURL" target="_blank">Click me!</a></div>
                </div>
                <div class="col-12 d-flex justify-content-around">
                  <div class="col-6"><strong>Points: </strong>{{model.credit}}</div>
                  <div class="col-6"><strong>Number of testers: </strong>{{model.testers}}</div>
                </div>
                <tabs class="col-12" @activatedTab="setActiveTable">
                  <tab-pane title="Subtasks" ></tab-pane>
                  <tab-pane title="Answers" ></tab-pane>
                </tabs>
        </div>
      </div>
      <hr>
    </form>
<!-- ************************************************************************************************************************************************************* -->
    <div class="table-responsive" v-if="activeTable == 0">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="model.subtasks">
        <hr class="my-4" />
        <template slot="columns">
          <th>Subtask Description</th>
          <th>Subtask Type</th>
        </template>

        <template slot-scope="{row}">
          
          <th scope="row">
            
            <div class="media align-items-center">
              <div class="media-body">
                <textarea class="form-control input-group-alternative mb-3"
                            placeholder="Sub-task Description"
                            v-model="row.question"
                            disabled>
                </textarea>
              </div>
            </div>
          </th>
          <td>
            <strong>{{ getTypeString(row.type) }}</strong>
          </td>
        </template>

      </base-table>
      <div v-if="model.video" class="col-12">
        
        <base-alert type="secondary">
            This test task has video submission required.
        </base-alert>
      </div>
      <hr>
    </div>
<!-- ************************************************************************************************************************************************************* -->
  <test-answer-modal v-if="model.answers.length > 0" :isEnabled="testAnswerModal" 
                    :answerID ="{data: model.answers[selectedIndex].id}" 
                    :subtasks="{data: model.subtasks}" 
                    :answers="{data: model.answers[selectedIndex].subtask_answers}" 
                    @close='testAnswerModal = false' 
                    :comment="model.answers[selectedIndex].comment_text">
                    </test-answer-modal>

    <div class="table-responsive" v-if="activeTable == 1">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="model.answers">
        <hr class="my-4" />
        <template slot="columns">
          <th>Date of submission</th>
          <th>View answer</th>
          <th>Video submission (if any)</th>
        </template>

        <template slot-scope="{row}">
          
          <td>
            <!-- <div class="d-flex justify-content-center"> -->
              {{ row.created_at }}
            <!-- </div> -->
          </td>
          <td>
            <!-- <div class="d-flex justify-content-center"> -->
              <!-- activeRows[row.id] = true -->
              <base-button type="info" size="sm" @click="viewAnswer(row.id)">View answer</base-button>
            <!-- </div> -->
            
          </td>
          <td>
            <!-- <div class="d-flex justify-content-center"> -->
              <a :href="row.video_link" target="_blank" v-if="row.video_link !== undefined" class="btn btn-info btn-sm">View Video</a>
              <div v-if="row.video_link === undefined">-</div>
            <!-- </div> -->
          </td>
        </template>

      </base-table>
      <hr>
    </div>

    <div class="d-flex justify-content-end">
      <div class="">
        <base-button type="danger" v-if="model.active" class="mr-4" @click="deactivateSet(true)">Deactivate Test Task</base-button>
        <base-button type="success" v-if="!model.active" class="mr-4" @click="activate">Activate Test Task</base-button>
        <message-modal  :isEnabled="deactivateModal" 
                        :buttonInfo="
                        {buttons:[
                          {
                            text: 'No',
                            type: 'danger',
                            size: 'lg',
                            event: 'null'
                          },
                          {
                            text: 'Yes',
                            type: 'success',
                            size: 'lg',
                            event: 'yes'
                          }
                        ]}"
                        @null="deactivateSet(false)"
                        @yes="deactivate">
          <template slot="title">Deactivate</template>
          Are you sure that you want to deactivate this task? Testers will not be able to submit any responses!
        </message-modal>
      </div>
    </div>
    <br>

  </div>
</template>
<script>
  import axios from 'axios';
  import TestAnswerModal from '../Modals/TestAnswerModal.vue'
  import MessageModal from '../Modals/MessageModal.vue'
  import { store } from '../../store.js'
  import router from 'vue-router'
  export default {
    name: 'manage-task-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    components:{
      TestAnswerModal,
      MessageModal
    },
    data() {
      return {
        // model: {
        //   name: 'Task1',
        //   websiteURL: 'https://www.google.com',
        //   points: 50,
        //   testers: 5,
        //   video: true,
        //   comment: true,
        //   active: true,
        //   subtasks:[
        //     {
        //       id: 1,
        //       taskDescription: 'You should register in the website. Was it easy?',
        //       taskType: 'yn'
        //     },
        //     {
        //       id: 2,
        //       taskDescription: 'You should login in the website. Was it easy?',
        //       taskType: 'text'
        //     },
        //     {
        //       id: 3,
        //       taskDescription: 'You should change your profile in the website. Was it easy?',
        //       taskType: 'text'
        //     },
        //     {
        //       id: 4,
        //       taskDescription: 'You should delete your account in the website. Was it easy?',
        //       taskType: 'text'
        //     },
        //   ],
        //   answers: [
        //     {
        //       id: 1,
        //       active: false,
        //       time: 'Monday',
        //       hasVideo: true,
        //       hasComment: true,
        //       video_link: 'https://www.google.com',
        //       comment_text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ante augue, luctus at dolor ac, pulvinar congue ex. Donec a consectetur neque. Duis lacinia luctus consectetur. Nullam euismod gravida justo sit amet porttitor. Morbi lobortis maximus sodales. Quisque quis nisi a tellus tempus malesuada. Aenean vitae pellentesque justo, eget rutrum nulla.',
        //       case_answers:[
        //         {
        //           // subtaskDescription: 'You should register in the website. Was it easy?',
        //           subtaskAnswer: 'Indeed',
        //           subtaskRating: 0
        //         },
        //         {
        //           // subtaskDescription: 'You should login in the website. Was it easy?',
        //           subtaskAnswer: 'Yes',
        //           subtaskRating: 0
        //         },
        //         {
        //           // subtaskDescription: 'You should change your profile in the website. Was it easy?',
        //           subtaskAnswer: 'The email modifcation could be improved',
        //           subtaskRating: 0
        //         },
        //         {
        //           // subtaskDescription: 'You should delete your account in the website. Was it easy?',
        //           subtaskAnswer: 'I could not find the button to delete the account',
        //           subtaskRating: 0
        //         },

        //       ]
        //     }
        //   ]
        // },
        tableData: [
          
        ],
        // activeRows: {},
        activeTable: 0,
        selectedIndex: 0,
        testAnswerModal: false,
        deactivateModal: false
      }
    },

    methods:{
      viewAnswer(id){
        // this.activeRows[id] = true
        // window.alert(this.activeRows[id]);
        for(let i = 0 ; i < this.model.answers.length; i++){
          if(this.model.answers[i].id == id){
            this.selectedIndex = i;
            this.testAnswerModal = true;
          }
        }
      },
      // initActiveRow(){
      //   for(let i = 0; i < this.model.answers.length; i++){
      //     this.activeRows[this.model.answers[i].id] = false;
      //   }
      // },
      selectType(index){
        switch(index){
          case 0: return 'text';
          case 1: return 'yn';
        }
      },

      submit(){

      },

      getArrayIndex(index){
        for(var i = 0; i < this.tableData.length; i++){
          if(this.tableData[i].id == index)
            return i;
        }
      },

      getTypeString(type){
        switch(type){
          case 'text': return "Text Input";
          case 'yn': return "Yes/No Input";
        }
      },

      activate(){
        this.setTaskActive(true)
      },

      deactivate(){
        this.deactivateSet(false);
        this.setTaskActive(false)
      },

      setTaskActive(value){
        let id = store.getters.data.tasks[store.getters.managingTask].id;
        let payload = {
          taskID: id,
          active: value
        }
        store.dispatch('setTestActive', payload)
        .then ( () => {
          this.model.active = value;
        })
      },

      setActiveTable(index){
        this.activeTable = index;
        // switch(index){
        //   case 0: this.tableData = this.model.subtasks; break;
        //   case 1: this.tableData = this.model.answers; break;
        // }
      },

      deactivateSet(value){
        this.deactivateModal = value;
      },

      // requestTask(id){
      //   axios.get('',{
      //     username: '',
      //     usertoken: '',
      //     taskID: '',
      //   })
      //   .then( response => {

      //   })
      //   .catch( error => {

      //   })
      // },

      // submitAnswerReview(taskId, answerId, answer){
      //   axios.post('',{
      //     username: '',
      //     usertoken: '',
      //     taskID: '',
      //     answerID: '',
      //     subtaskReviews: [

      //     ]
      //   })
      //   .then( response => {

      //   })
      //   .catch( error => {

      //   })
      // }
    },

    computed: {
      // maxIndex(){
      //   var maxi = -1;
      //   for(var i = 0; i < this.tableData.length; i++){
      //     if(this.tableData[i].id > maxi)
      //       maxi = this.tableData[i].id;
      //   }
      //   return maxi;
      // },

      tableTitle(){
        //if(this.tableData.length <= 1)
        return "Manage Task ";
        //return "Create new tasks";
      },

      model(){
        return store.getters.data.tasks[store.getters.managingTask]
      },
      selectedAnswer(){
        return this.selectedIndex>=0 ? model.answers[selectedIndex] : null;
      }

      /*
      <test-answer-modal  :isEnabled="testAnswerModal" 
                    :answerID ="{data: model.answers[selectedIndex].id}" 
                    :subtasks="{data: model.subtasks}" 
                    :answers="{data: model.answers[selectIndex].subtask_answers}" 
                    @close='testAnswerModal = false' 
                    :comment="model.answers[selectIndex].comment_text">
                    </test-answer-modal>
      */
    },

    mounted(){
      this.tableData = this.model.subtasks;
      // this.initActiveRow();
    }
  }
</script>
<style scoped>
  .break-word{
    word-wrap: break-word;
    width: 50%;
  }
</style>

