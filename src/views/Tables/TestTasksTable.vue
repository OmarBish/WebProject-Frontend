<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Available Tasks</h3>
        </div>
        <div class="col text-right">
          <!-- <base-button type="success" size="sm" @click="createTask">Work on a new task</base-button> -->
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light"
                  :data="tableData">
        <template slot="columns">
          <th>Task Title</th>
          <th>Task Points</th>
          <th>Requires Video</th>
          <th>Website URL</th>
          <th>Subtask Count</th>
          <th></th>
        </template>

        <template slot-scope="{row}" v-if="row.active">
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
            {{ row.subtask_count }}
          </td>
          <td>
            <!-- <i class="fas fa-arrow-up text-success mr-3"
               :class="row.bounceRateDirection === 'up' ? 'text-success': 'text-danger'">
            </i>
            {{row.id}} -->
            
            <base-button :type="row.active?'success':'danger'" size="sm" :disabled="!row.active"
            v-b-tooltip.hover.bottom="!row.active" :title="!row.active? 'This task is deactived' : ''">
              Add
            </base-button>
          </td>
          
        </template>

      </base-table>
    </div>

  </div>
</template>
<script>
  import router from 'vue-router';
  export default {
    name: 'test-tasks-table',
    props:{
      table: []

    },
    data() {
      return {
        tableData: [
          /*
          {
            page: '/argon/',
            visitors: '4,569',
            unique: '340',
            bounceRate: '46,53%',
            bounceRateDirection: 'up'
          },
          {
            page: '/argon/index.html',
            visitors: '3,985',
            unique: '319',
            bounceRate: '46,53%',
            bounceRateDirection: 'down'
          },
          {
            page: '/argon/charts.html',
            visitors: '3,513',
            unique: '294',
            bounceRate: '36,49%',
            bounceRateDirection: 'down'
          },
          {
            page: '/argon/tables.html',
            visitors: '2,050',
            unique: '147',
            bounceRate: '50,87%',
            bounceRateDirection: 'up'
          },
          {
            page: '/argon/profile.html',
            visitors: '1,795',
            unique: '190',
            bounceRate: '46,53%',
            bounceRateDirection: 'down'
          }
          */
        ]
      }
    },

    mounted(){
      this.tableData = this.table;
    },

    methods:{
      createTask(){
        this.$router.push('createtask');
      }
    }
  }
</script>
<style>
</style>
