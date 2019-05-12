<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <!-- <message-modal :isEnabled="paypalModal" @null="paypalModal=false"></message-modal> -->
                    <message-modal  :isEnabled="paypalModal" 
                                    :buttonInfo="
                                    {buttons:[
                                      {
                                        text: 'Exit',
                                        type: 'seconday',
                                        size: 'sm',
                                        event: 'null'
                                      }
                                    ]}"
                                    @null="paypalModal=false">
                      <!-- <template slot="title">Deactivate</template> -->
                      <paypal></paypal>
                    </message-modal>
                    <stats-card title="Total Points"
                                type="gradient-red"
                                :sub-title="''+points"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <!-- <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                            <span class="text-nowrap">Since last month</span> -->
                            <div class="d-flex justify-content-center">
                              <base-button size="sm" type="primary" @click="paypalModal=true">Purchace Points</base-button>
                            </div>
                            
                        </template>
                    </stats-card>
                </div>
                <div></div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Un-reserved Points"
                                type="gradient-orange"
                                :sub-title="''+unreserved_points"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <!-- <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
                            <span class="text-nowrap">Since last month</span> -->
                            <div class="d-flex justify-content-center">
                              <base-button size="sm" type="primary">Manage Points</base-button>
                            </div>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total tasks"
                                type="gradient-green"
                                :sub-title="''+task_count"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <!-- <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
                            <span class="text-nowrap">Since last month</span> -->
                            <div class="d-flex justify-content-center">
                              <base-button size="sm" type="primary" @click="$router.push('createtask')">Add a new task</base-button>
                            </div>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Unfinished tasks"
                                type="gradient-info"
                                :sub-title="''+active_task_count"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <!-- <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span> -->
                            <div class="d-flex justify-content-center">
                              <base-button size="sm" type="primary">Deactivate a task</base-button>
                            </div>
                        </template>
                    </stats-card>
                </div>
                <!-- {{ $store.state.user }} -->
            </div>
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">
            <!-- End charts-->

            <!--Tables-->
            <div class="row mt-5">
                <div class="col-xl-12 mb-5 mb-xl-0">
                    <client-tasks-table :table="{data: this.tasks}"></client-tasks-table>
                </div>
            </div>
            <!--End tables-->
        </div>

    </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import ClientTasksTable from './Tables/ClientTasksTable';
  import MessageModal from './Modals/MessageModal.vue'
  import paypal from '../components/paypal.vue'
  import axios from 'axios';
  import router from 'vue-router';
  import {store} from '../store.js'
  import '../main.js';
  export default {
    components: {
      // LineChart,
      // BarChart,
      ClientTasksTable,
      MessageModal, paypal
      // SocialTrafficTable,
    },
    data() {
      return {
        paypalModal: false,
        data: {},
        model:{
          email:'',
          // [
          //   {
          //     id: 1,
          //     name: 'Google',
          //     points: 50,
          //     finished: false,
          //     active: true,
          //     websiteURL:'https://www.google.com'
          //   },
          //   {
          //     id: 2,
          //     name: 'YouTube',
          //     points: 50,
          //     finished: true,
          //     active: true,
          //     websiteURL:'https://www.youtube.com'
          //   },
          //   {
          //     id: 3,
          //     name: 'Facebook',
          //     points: 50,
          //     finished: false,
          //     active: false,
          //     websiteURL:'https://www.facebook.com'
          //   },
          //   {
          //     id: 4,
          //     name: 'Twitch',
          //     points: 50,
          //     finished: true,
          //     active: true,
          //     websiteURL:'https://www.twitch.tv'
          //   },

          // ],
        },
      };
    },
    methods: {

      getPoints(){
        // return this.$store.state.data.points;
      }
    },
    mounted() {
      store.dispatch('isAuth')
      .then( () => {
        if(!store.getters.user.valid)
          this.$router.push('/login');
        else if(store.getters.user.type == 'tester')
          this.$router.push('/tester/dashboard');
      })

      // store.dispatch('getClientData')
      // .then( () => {

      // });
    },


    computed:{
      reserved_points(){
        let points = 0;
        for(let i = 0; i < this.task_count; i++){
          if(!this.tasks[i].finished)points += this.tasks[i].credit;
        }
        return points;
      },

      unreserved_points(){
        return this.points - this.reserved_points;
      },

      task_count(){
        return this.tasks.length
      },


      active_task_count(){
        let count = 0;
        for(let i = 0; i < this.task_count; i++){
          if(!this.tasks[i].finished)
            count++;
        }
        return count;
      },
      points() {
        return store.getters.data.points;
      },
      tasks(){
        return store.getters.data.tasks;
      },
    }
  };
</script>
<style></style>
