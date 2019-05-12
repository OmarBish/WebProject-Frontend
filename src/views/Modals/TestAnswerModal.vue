<template>
    <modal :show="isEnabled"
            body-classes="p-0"
            modal-classes="modal-dialog-centered modal-xl"
            @close="
            () => {
            if(someRated)
                discardSet(true);
            else 
                discard();
            }
            "
            >
        <card type="secondary" shadow
                header-classes="bg-white pb-5"
                body-classes="px-lg-5 py-lg-5"
                class="border-0">
                
                <div v-for="(answer, index) in answers.data" :key="index">
                    <base-alert type="default">
                        <strong>{{ subtasks.data[index].question }}</strong>
                    </base-alert>
                    <base-alert type="secondary" class="py-0">
                        
                        <div class="d-flex justify-content-between">
                            <div class="col-6 text-wrap">{{ answer.answer }}</div>
                            <div class="col-4">
                                <div class="row">
                                    <div class="col-8">
                                    <base-slider v-if="answer.clientRate == null || answer.clientRate <= 0" v-model="answer.userRate" :options="options" :disabled="saved"></base-slider>
                                    <base-progress type="default" v-if="!(answer.clientRate == null || answer.clientRate <= 0)" :height="8" :value="(answer.clientRate-1)*25" :showPercentage="false"></base-progress>
                                    </div>
                                    <div class="mt-2 ml-2">
                                        <div class="d-flex justify-content-center">{{ (answer.clientRate == null || answer.clientRate <= 0) ? getStringRating(answer.userRate) : getStringRating(answer.clientRate) }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!--  -->
                    </base-alert>
                        
                    
                    <!-- <hr class="m-0 p-0 mb-2"> -->
                </div>
                <div v-if="comment!=''">
                    <base-alert type="default">
                        <strong>Comments and Suggestions</strong>
                    </base-alert>
                    <base-alert type="secondary" class="py-0">
                        
                        <div class="d-flex justify-content-between">
                            <div class="col-6 text-wrap">{{ comment }}</div>
                            <!-- <div class="col-4">
                                <div class="row">
                                    <div class="col-8">
                                    <base-slider v-model="commentRating" :options="options" :disabled="saved"></base-slider>
                                    </div>
                                    <div class="mt-2 ml-2">
                                        <div class="d-flex justify-content-center">{{ getStringRating(commentRating) }}</div>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </base-alert>
                </div>
                <hr>
                <div class="d-flex justify-content-end">
                    <base-button type="secondary" @click="
                                                        () => {
                                                            if(someRated)
                                                                discardSet(true);
                                                            else 
                                                                discard();
                                                            }
                                                        ">Exit {{ unsavedText }}
                    </base-button>
                    <base-button type="success" @click="() => {
                                                            if(allRated)
                                                                saveSet(true);
                                                            submitted=true;

                                                            }"
                                                            :disabled="!allRated"
                                                            v-if="!saved">Submit review
                    </base-button>
                    <message-modal  :isEnabled="saveModal" 
                                    :buttonInfo="
                                    {buttons:[
                                    {
                                        text: 'No',
                                        type: 'danger',
                                        size: 'lg',
                                        event: 'null'
                                    },
                                    {
                                        text: 'Yes',
                                        type: 'success',
                                        size: 'lg',
                                        event: 'yes'
                                    }
                                    ]}"
                                    @null="saveSet(false)"
                                    @yes="save">
                    <template slot="title">Save</template>
                    Are you sure that you want to save the review? This action is irreverasble!
                    </message-modal>
                    <message-modal  :isEnabled="discardModal" 
                                    :buttonInfo="
                                    {buttons:[
                                    {
                                        text: 'No',
                                        type: 'danger',
                                        size: 'lg',
                                        event: 'null'
                                    },
                                    {
                                        text: 'Yes',
                                        type: 'success',
                                        size: 'lg',
                                        event: 'yes'
                                    }
                                    ]}"
                                    @null="discardSet(false)"
                                    @yes="discard">
                    <template slot="title">Discard</template>
                    Are you sure that you want to discard all reviews?
                    </message-modal>
                </div>
        </card>
    </modal>
</template>
<script>
import MessageModal from './MessageModal.vue';
import {store} from '../../store.js'
export default {
    name: 'test-answer-modal',
    components: {
        MessageModal
    },
    props:{
        isEnabled: false,
        answerID: { },
        answers: {
            data:
                [

                ]
        },
        subtasks: {
            data:
                [

                ]
        },
        comment: ''
    },
    data(){
        return{
            // test: 3,
            options: {
                step: 1,
                range:{
                    min: 1,
                    max: 5
                },
                start: 1
            },
            oldRatings: [

            ],
            submitted: false,
            saveModal: false,
            discardModal: false,
            commentRating: 0,
            oldCommentRating: 0
        }
    },

    methods: {
        getStringRating(rating){
            if(rating == null)
                rating = 0;
            let intRating = parseInt(rating);
            switch(intRating){
                case 1: return "Very poor";
                case 2: return "Poor";
                case 3: return "Acceptable";
                case 4: return "Good";
                case 5: return "Excellet";
                default: return "Not rated"; 
            }
        },

        close(){
            for(let i = 0; i < this.answers.data.length; i++){
                this.answers.data[i].subtaskRating = this.oldRatings[i];
            }
            this.$emit('close');
        },

        save(){
            this.saveSet(false);
            for(let i = 0; i < this.answers.data.length; i++){
                this.oldRatings[i] = this.answers.data[i].subtaskRating;
            }
            // this.saved=true;
            let payload =
            {
                taskID: store.getters.data.tasks[store.getters.managingTask].id,
                answerID: this.answerID.data,
                subtask_answers:[]
            };
            let subtask_answers = [];
            for(let i = 0; i < this.answers.data.length; i++){
                subtask_answers.push(
                    {
                        subtaskID: this.answers.data[i].id,
                        subtaskRating: this.answers.data[i].userRate
                    }
                );
            }
            payload.subtask_answers = subtask_answers;
            store.dispatch('sendAnswerReview', payload)
            .then ( () => {
                this.close();
            })
        },

        discard(){
            this.discardSet(false);
            this.close();
        },

        saveSet(value){
            this.saveModal = value;
        },
        
        discardSet(value){
            this.discardModal = value;
        }
    },

    mounted(){
        for(let i = 0; i < this.answers.data.length; i++){
            this.oldRatings.push(this.answers.data[i].userRate);
        }
    },

    computed: {
        allRated(){
            for(let i = 0; i < this.answers.data.length; i++){
                if(this.answers.data[i].userRate == null || this.answers.data[i].userRate == 0){
                    return false;
                }
            }
            // if(this.commentRating==0)
            //     return false;
            return true;
        },

        someRated(){
            for(let i = 0; i < this.answers.data.length; i++){
                if(this.answers.data[i].userRate != this.oldRatings[i]){
                    return true;
                }
            }
            if(this.commentRating)
                return true;
            return false;
        },

        unsavedText(){
            if(!this.saved) return "without submitting a review";
            else return "";
        },

        saved(){
            for(let i = 0; i < this.answers.data.length; i++){
                if(this.oldRatings[i] != this.answers.data[i].userRate || this.answers.data[i].userRate== 0)
                    return false;
            }
            return true;
        }
    }
}
</script>
<style>

</style>


