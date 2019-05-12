<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <div class="row">
            </div>
        </base-header>
        

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <manage-task-table title="Manage Tasks"></manage-task-table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import ManageTaskTable from './Tables/ManageTaskTable'
  import { store } from '../store.js'
  import router from 'vue-router'
  export default {
    name: 'manage-task',
    components: {
      ManageTaskTable
    },

    mounted(){
        store.dispatch('isAuth')
        .then( () => {
            if(!store.getters.user.valid)
            this.$router.push('/login');
            else if(store.getters.user.type == 'tester')
            this.$router.push('/tester/dashboard');
        })

        if(store.getters.managingTask == -1)
          this.$router.push('dashboard');
    }
  };
</script>
<style></style>
