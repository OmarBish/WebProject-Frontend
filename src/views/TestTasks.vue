<template>
    <div>

        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div class="container-fluid mt--7">

            <div class="row mt-5">
                <div class="col-xl-12 mb-5 mb-xl-0">
                    <test-tasks-table :table="this.model.tasks"></test-tasks-table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  // import LineChart from '@/components/Charts/LineChart';
  // import BarChart from '@/components/Charts/BarChart';

  // Tables
  // import SocialTrafficTable from './Dashboard/SocialTrafficTable';
  import TestTasksTable from './Tables/TestTasksTable';

  export default {
    components: {
      // LineChart,
      // BarChart,
      TestTasksTable,
      // SocialTrafficTable,
    },
    data() {
      return {
        model:{
          email:'',
          points: 1000,
          // reserved_points: 200,
          tasks: [
            {
              id: 1,
              name: 'Google',
              points: 50,
              video: false,
              active: true,
              subtask_count: 16, 
              websiteURL:'https://www.google.com'
            },
            {
              id: 2,
              name: 'YouTube',
              points: 50,
              video: true,
              active: true,
              subtask_count: 16, 
              websiteURL:'https://www.youtube.com'
            },
            {
              id: 3,
              name: 'Facebook',
              points: 50,
              video: false,
              active: false,
              subtask_count:  16,
              websiteURL:'https://www.facebook.com'
            },
            {
              id: 4,
              name: 'Twitch',
              points: 50,
              video: true,
              active: true,
              subtask_count: 16, 
              websiteURL:'https://www.twitch.tv'
            },

          ],

          active_task_count: 60,
          rating: 84.5
        },
      };
    },
    methods: {
      // initBigChart(index) {
      //   let chartData = {
      //     datasets: [
      //       {
      //         label: 'Performance',
      //         data: this.bigLineChart.allData[index]
      //       }
      //     ],
      //     labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      //   };
      //   this.bigLineChart.chartData = chartData;
      //   this.bigLineChart.activeIndex = index;
      // }
    },
    mounted() {
      this.initBigChart(0);
    },
    computed:{
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

      // active_task_count(){
      //   let count = 0;
      //   for(let i = 0; i < this.task_count; i++){
      //     if(!this.model.tasks[i].finished)
      //       count++;
      //   }
      //   return count;
      // },

      

    }
  };
</script>
<style></style>
