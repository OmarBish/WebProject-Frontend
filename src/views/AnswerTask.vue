<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <div class="row">
            </div>
        </base-header>
        

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <answer-task-table title="Manage Tasks"></answer-task-table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import AnswerTaskTable from './Tables/AnswerTaskTable'
  import { store } from '../store.js'
	import router from 'vue-router'
  export default {
    name: 'answer-task',
    components: {
      AnswerTaskTable
    },
    mounted(){
        store.dispatch('isAuth')
        .then( () => {
            if(!store.getters.user.valid)
            this.$router.push('/login');
            else if(store.getters.user.type == 'client')
            this.$router.push('/client/dashboard');
        })

        if(store.getters.answeringTask == -1)
          this.$router.push('/tester/dashboard');
    }
  };
</script>
<style></style>
