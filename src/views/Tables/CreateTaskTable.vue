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
          <!-- <base-button type="primary" size="sm">See all</base-button> -->
        </div>
        <div>
        </div>
        
      </div>
    </div>

    <form>

      <div class="row justify-content-center">
        <div class="row col-10 p-0">
                <base-input class="input-group-alternative"
                            placeholder="Test Task Name"
                            type="text"
                            addon-left-icon="ni ni-single-copy-04"
                            v-model="model.name"
                            >
                </base-input>

                <base-input class="input-group-alternative"
                            placeholder="Website URL"
                            type="text"
                            addon-left-icon="ni ni-world-2"
                            v-model="model.websiteURL"
                            >
                </base-input>

                <base-input class="input-group-alternative col-5"
                            placeholder="Points"
                            type="number"
                            addon-left-icon="ni ni-tag"
                            v-model="model.points"
                            >
                </base-input>
                <div class="col-2"></div>
                <base-input class="input-group-alternative col-5"
                            placeholder="Number of testers"
                            type="number"
                            addon-left-icon="ni ni-circle-08"
                            v-model="model.testers"
                            >
                </base-input>
                <base-checkbox class="mt-2 col-5" v-model="model.video">
                    Require Video Recording with answer
                </base-checkbox>
                <div class="col-2"></div>
                <base-checkbox class="mt-2 col-5" v-model="model.comment">
                    Accept comments and suggestions
                </base-checkbox>
        </div>
      </div>
      <hr>

    </form>
    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
        <hr class="my-4" />
        <template slot-scope="{row}">
          
          <th scope="row">
            
            <div class="media align-items-center">
              <div class="media-body">
                <textarea class="form-control input-group-alternative mb-3"
                            placeholder="Sub-task Description"
                            v-model="row.taskDescription">
                </textarea>

              </div>
            </div>
          </th>
          <td>
            <tabs @activatedTab="(index) => {
              let type = selectType(index);
              for(var i = 0 ; i < tableData.length; i++){
                if(tableData[i].id == row.id)
                  tableData[i].taskType = type;
              }
              }">
                <tab-pane title="Text answer"></tab-pane>
                <tab-pane title="Yes/No answer"></tab-pane>
            </tabs>
          </td>
          <td>
            <div class="justify-content-end d-flex">
              <base-button type="danger" @click="removeTask(row.id)">Remove</base-button>
            </div>
          </td>

        </template>

      </base-table>
      <hr>
    </div>
    <div class="d-flex justify-content-end">
      <div class="">
        <base-button type="success" class="mr-4" @click="addTask">Add Sub-task</base-button>
      </div>
      <div class="">
        <base-button type="info" class="mr-4" @click="submitNewTask">Create Test Task</base-button>
      </div>
      <div class="">
      </div>
    </div>
    <br>

  </div>
</template>
<script>
  import axios from 'axios';
import { mkdir } from 'fs';
import router from 'vue-router'
import {store} from '../../store.js'
  export default {
    name: 'create-task-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        model: {
          name: '',
          websiteURL: '',
          points: '',
          testers: '',
          video: false,
          comment: false
        },
        tableData: [
          {
            id: 1,
            taskDescription: '',
            taskType: 'text'
          }
        ]
      }
    },

    methods:{
      addTask(){
        this.tableData.push({
          id: this.maxIndex+1,
          taskDescription:'',
          taskType:'text'
        })
      },
      removeTask(index){
        if(this.tableData.length == 1)
          return;
        for(var i = 0; i < this.tableData.length; i++){
          if(this.tableData[i].id === index){
            this.tableData.splice(i, 1);
            return;
          }
        }
      },
      selectType(index){
        switch(index){
          case 0: return 'text';
          case 1: return 'yn';
        }
      },

      submitNewTask(){
        let payload = {
          name: this.model.name,
          websiteURL: this.model.websiteURL,
          credit: this.model.points,
          testers: this.model.testers,
          video: this.model.video,
          comment: this.model.comment,
          subtasks: [

          ]
        };
        for(let i = 0; i < this.tableData.length; i++){
          payload.subtasks.push({
            question: this.tableData[i].taskDescription,
            type: this.tableData[i].taskType
          });
        }
        console.log(payload);
        store.dispatch('sendNewTask', payload)
        .then ( () => {
          this.$router.push('dashboard');
        })
        .catch( () => {
          window.alert('Something went wrong!')
        })
      },

      getArrayIndex(index){
        for(var i = 0; i < this.tableData.length; i++){
          if(this.tableData[i].id == index)
            return i;
        }
      }

    },

    computed: {
      maxIndex(){
        var maxi = -1;
        for(var i = 0; i < this.tableData.length; i++){
          if(this.tableData[i].id > maxi)
            maxi = this.tableData[i].id;
        }
        return maxi;
      },

      tableTitle(){
        return "Create a new test task";
      }
    }
  }
</script>
<style>
</style>
