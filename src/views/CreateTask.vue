<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
            </div>
        </base-header>
        

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <create-task-table title="Create a new task"></create-task-table>
                </div>
            </div>
            <!-- <div class="row mt-5">
                <div class="col">
                    <create-task-table type="dark" title="Dark Table"></create-task-table>
                </div>
            </div> -->
        </div>

    </div>
</template>
<script>
  import CreateTaskTable from './Tables/CreateTaskTable'
  import {store} from '../store.js'
  export default {
    name: 'tables',
    components: {
      CreateTaskTable
    },
    mounted(){
        store.dispatch('isAuth')
        .then( () => {
            if(!store.getters.user.valid)
            this.$router.push('/login');
            else if(store.getters.user.type == 'tester')
            this.$router.push('/tester/dashboard');
        })
    }
  };
</script>
<style></style>
