<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">{{ titleText }}</h3>
        </div>
        <div class="col text-right">
          <base-button type="success" size="sm" @click="$emit('new')">Work on a new task</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light"
                  :data="table.data">
        <template slot="columns">
          <th>Task Title</th>
          <th>Task Points</th>
          <th>Requires Video</th>
          <th>Website URL</th>
          <th></th>
          <!-- <th></th> -->
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            {{row.name}}
          </th>
          <td>
            {{row.points}}
          </td>
          <td>
            <!-- {{row.finished}} -->
            <div class="d-flex justify-content-around">
              <span class="has-success" v-if="row.video" title="This task requires posting a video!"></span>
              <!-- <span class="has-danger" v-if="!row.active" title="The task is deactivated"></span> -->
              <span></span>
              <span></span>
            </div>
          </td>
          <td>
            <a :href="row.websiteURL" target="_blank">{{row.name}}</a>
          </td>
          <td>
            <!-- <i class="fas fa-arrow-up text-success mr-3"
               :class="row.bounceRateDirection === 'up' ? 'text-success': 'text-danger'">
            </i>
            {{row.id}} -->
            
            <base-button :type="row.active?'info':'danger'" size="sm" :disabled="!row.active" @click="handleButton(row.id)"
             >
             <!-- v-b-tooltip.hover.bottom="!row.active" :title="!row.active? 'This task is deactived' : ''"-->
              {{ buttonText }}
            </base-button>
          </td>
          
        </template>

      </base-table>
    </div>

  </div>
</template>
<script>
  import axios from 'axios';
  import router from 'vue-router';
  import {store} from '../../store.js'
  export default {
    name: 'tester-tasks-table',
    props:{
      table: {
        data: []
      },
      state: ''
    },
    data() {
      return {
        tableData: [
        ]
      }
    },

    methods:{
      handleButton(id){
        switch(this.state){
          case 'work': this.handleCompleteTask(id); break;
          case 'available': this.handleAddTask(id); break;
          case 'done': this.handleReviewTask(id); break;
        }
      },

      handleCompleteTask(id){
        for(let i = 0; i < this.table.data.length; i++){
          if(this.table.data[i].id == id){
            store.commit('setAnsweringTask', i);
            this.$router.push('answer');
            return;
          }
        }
      },

      handleAddTask(id){
        let payload =
        {
          taskID: id
        }
        store.dispatch('addTask', payload)
        .then( () => {
          
        })
      },

      handleReviewTask(id){
        this.$emit('reviewTask', id);
      },


    },

    computed:{
      buttonText(){
        switch(this.state){
          case 'work': return 'Complete Task';
          case 'available': return 'Add Task';
          case 'done': return 'Review Answers';
        }
      },

      titleText(){
        switch(this.state){
          case 'work': return 'Current Tasks';
          case 'available': return 'Available Tasks';
          case 'done': return 'Completed Tasks';
        }
      }
    }
  }
</script>
<style>
</style>
