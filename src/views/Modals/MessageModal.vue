<template>
    <modal :show="isEnabled" @close="close">
        <h3 slot="header" class="modal-title" id="modal-title-default">
            <slot name="title"></slot>
        </h3>
        <p class="text-wrap">
            <slot></slot>
        </p>

        <template slot="footer">
            <base-button v-for="button in buttonInfo.buttons"
                         :type="button.type"
                         :size="button.size" 
                         @click="fireEvent(button.event)"
                         :key ="button.text"
                         >
                         {{ button.text }}
                         </base-button>
        </template>
    </modal>
</template>
<script>
export default {
    name: 'message-modal',
    props: {
        buttonInfo: {
            buttons: [
            {
               text: 'Close',
               type: 'default',
               size: 'lg',
               event: 'null'
            }
        ]
        },
        isEnabled: false
    },
    data(){
        return{

        }
    },
    methods: {
        close(){
            this.$emit('null');
        },

        fireEvent(eventName){
            this.$emit(eventName);
        }
    }

}
</script>
<style>

</style>


