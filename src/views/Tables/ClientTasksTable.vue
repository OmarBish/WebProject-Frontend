<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Created Tasks</h3>
        </div>
        <div class="col text-right">
          <base-button type="success" size="sm" @click="createTask">Create a new task</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light"
                  :data="table.data">
        <template slot="columns">
          <th>Task Title</th>
          <th>Task Points</th>
          <th>Completed</th>
          <th>Website URL</th>
          <th></th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            {{row.name}}
          </th>
          <td>
            {{row.credit}}
          </td>
          <td>
            <!-- {{row.finished}} -->
            <div class="d-flex justify-content-around">
              <span class="has-success" v-if="row.finished" title="The task is completed"></span>
              <span class="has-danger" v-if="!row.active" title="The task is deactivated"></span>
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
            
            <base-button type="info" size="sm" @click="manageTask(row.id)">
              Manage
            </base-button>
          </td>
          
        </template>

      </base-table>
    </div>

  </div>
</template>
<script>
  import router from 'vue-router';
  import {store} from '../../store.js'
  export default {
    name: 'client-tasks-table',
    props:{
      table: {}

    },
    data() {
      return {
        tableData: [
        ]
      }
    },

    methods:{
      createTask(){
        this.$router.push('createtask');
      },
      manageTask(id){
        // let found = false;
        for(let i = 0; i < this.table.data.length; i++){
          if(id == this.table.data[i].id){
            store.commit('setManagingTask', i);
            this.$router.push('manageTask');
            return;
          }
        }
      }
    }
  }
</script>
<style>
</style>
