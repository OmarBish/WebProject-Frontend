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
                  <div class="col-12"><strong>Points: </strong>{{model.credit}}</div>
                  <!-- <div class="col-6"><strong>Number of testers: </strong>{{model.testers}}</div> -->
                </div>
                <!-- <tabs class="col-12" @activatedTab="setActiveTable">
                  <tab-pane title="Subtasks" ></tab-pane>
                  <tab-pane title="Answers" ></tab-pane>
                </tabs> -->
        </div>
      </div>
      <hr>
    </form>
<!-- ************************************************************************************************************************************************************* -->
    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="model.subtasks">
        <hr class="my-4" />
        <template slot="columns">
          <th>Subtask Description</th>
          <th>Subtask Answer</th>
        </template>

        <template slot-scope="{row}">
          
          <th scope="row" style="width: 50% ">
            
            <div class="media align-items-center">
              <div class="">
                <!-- <textarea class="form-control input-group-alternative mb-3"
                            placeholder="Sub-task Description"
                            v-model="row.answer"
                            disabled>
                </textarea> -->
                <p class="text-wrap" >
                  {{ row.question }}
                </p>
              </div>
            </div>
          </th>
          <td>
            <!-- <strong>{{ getTypeString(row.taskType) }}</strong> -->
              <textarea class="form-control input-group-alternative mb-3"
                          placeholder="Sub-task Answer"
                          v-model="row.answer"
                          v-if="row.type=='text'">
              </textarea>
              <div class="row">
              <tabs class="col-4" @activatedTab="
              (index) => {
                switch(index){
                  case 0: row.answer='Yes'; break;
                  case 1: row.answer='No'; break;
                }
                
              }
                " v-if="row.type=='yn'">

                  <tab-pane title="Yes" ></tab-pane>
                  <tab-pane title="No" ></tab-pane>
              </tabs>

              </div>
          </td>
        </template>
        <template slot="extra">
          <tr v-if="model.video">
            <td>
              <p class="text-wrap">
                Video Submission
              </p>
            </td>
            <td>
              <base-button type="primary" @click="videoSet(true)">
                Share Video
              </base-button>
              <message-modal  :isEnabled="videoModal" 
                              :buttonInfo="
                              {buttons:[
                                {
                                  text: 'Cancel',
                                  type: 'secondary',
                                  size: 'lg',
                                  event: 'null'
                                },
                                {
                                  text: 'Save',
                                  type: 'success',
                                  size: 'lg',
                                  event: 'save'
                                }
                              ]}"
                              @null="videoSet(false)"
                              @save="saveVideo">
                <template slot="title">Save Video</template>
                
                <div class="d-flex justify-content-center">
                  <tabs :fill="false">
                      <tab-pane>
                          <span slot="title" class="nav-link-icon d-block"><i class="ni ni-world-2 mr-1"></i> Video URL</span>
                          <base-input placeholder="Video URL" v-model="video_link"></base-input>
                      </tab-pane>
                      <tab-pane>
                          <span slot="title" class="nav-link-icon d-block"><i class="ni ni-cloud-upload-96 mr-1"></i> Video Upload</span>
                          <input type="file" ref="videoFile" accept="video/*" disabled> <br/>
                          <small>We are sorry but direct video upload is not currently available. You can upload your video to a service like <a href="https://www.youtube.com">YouTube</a>, make it unlisted and use the Video URL tab to share it. Sorry for the inconvenience.</small>

                      </tab-pane>
                  </tabs>
                </div>

              </message-modal>
            </td>
          </tr>
          <tr v-if="model.comment">
            <td>
              <p class="text-wrap" >
                Comments and Suggestions
              </p>
            </td>
            <td>
              <textarea class="form-control input-group-alternative mb-3"
                          placeholder="Sub-task Answer"
                          v-model="comment_text">
              </textarea>
            </td>
          </tr>
        </template>

      </base-table>
      <!-- <div v-if="model.video" class="col-12">
        <hr>
        <base-alert type="secondary">
            This test task has video submission required.
        </base-alert>
      </div> -->
      <!-- <hr> -->
    </div>

    <div class="d-flex justify-content-end">
      <div class="">
        <!-- <base-button type="danger" v-if="model.active" class="mr-4" @click="deactivateSet(true)">Deactivate Test Task</base-button>
        <base-button type="success" v-if="!model.active" class="mr-4" @click="activate">Activate Test Task</base-button> -->
        <base-button type="secondary" class="mr-4" @click="sendAnswer(false)">Save Changes</base-button>
        <base-button type="success" :disabled="!allFilled" class="mr-5" @click="submitSet(true)">Submit</base-button>
        <message-modal  :isEnabled="submitModal" 
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
                        @null="submitSet(false)"
                        @yes="sendAnswer(true)">
          <template slot="title">Submit</template>
          Are you sure that you want to submit your answers?
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
    name: 'answer-task-table',
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
        video_link:'',
        comment_text:'',
        tableData: [
          
        ],
        
        activeTable: 0,

        submitModal: false,
        videoModal: false,
        uploadModal: false
      }
    },

    methods:{
      sendAnswer(is_submit){
        let payload =
        {
          taskID: store.getters.data.tasks[store.getters.answeringTask].id,
          is_submit: is_submit,
          video_link: this.video_link,
          comment_text: this.comment_text,
          subtask_answers:[]

        };
        for(let i = 0 ; i < this.model.subtasks.length; i++){
          payload.subtask_answers.push(
            {
              subtaskID: this.model.subtasks[i].id,
              subtaskAnswer: this.model.subtasks[i].answer || "Yes",
              subtaskRating: 0
            }
          );
        }
        store.dispatch('sendAnswer', payload)
        .then( () => {
          this.$router.push('dashboard');
        })
      },

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
        this.model.active = true;
      },

      submit(){
        this.submitSet(false);
        // this.model.active = false;
      },

      setActiveTable(index){
        this.activeTable = index;
      },

      submitSet(value){
        this.submitModal = value;
      },

      videoSet(value){
        this.videoModal = value;
      },

      saveVideo(){

      },

      requestTask(id){
        axios.get('',{
          username: '',
          usertoken: '',
          usertype: '',
          taskID: ''
        })
      },

      submitAnswers(final_submission){
        axios.post('',{
          username: '',
          usertoken: '',
          taskID: '',
          isUploadedVideo: false,
          video_link: '',
          comment_text: '',
          isFinal: final_submission, // if user will only save changes or will submit their final answers
          answers:[
            {
              subtaskID: '',
              subtaskAnswer: ''
            }
          ],
        })
        .then( response => {

        })
        .catch( error => {

        })
      },

      getAnswers(){
        axios.get('', {
          username: '',
          usertoken: ''
        })
        .then( response =>{

        })
        .catch( error => {
          
        })
      }


    },

    computed: {
      model(){
        return store.getters.data.tasks[store.getters.answeringTask];
      },
      maxIndex(){
        var maxi = -1;
        for(var i = 0; i < this.tableData.length; i++){
          if(this.tableData[i].id > maxi)
            maxi = this.tableData[i].id;
        }
        return maxi;
      },

      tableTitle(){
        //if(this.tableData.length <= 1)
        return "Answer Task";
        //return "Create new tasks";
      },

      allFilled(){
        for(let i = 0; i < this.model.subtasks.length; i++){
          if(this.model.subtasks[i].answer == '')
            return false;
        }
        return true;
      }
    },

    mounted(){
      this.tableData = this.model.subtasks;
    }
  }
</script>
<style scoped>
  .break-word{
    word-wrap: break-word;
    width: 50%;
  }
</style>

