    <template>
    <modal :show="isEnabled"
            body-classes="p-0"
            modal-classes="modal-dialog-centered modal-xl"
            @close="$emit('close')
            "
            >
        <card type="secondary" shadow
                header-classes="bg-white pb-5"
                body-classes="px-lg-5 py-lg-5"
                class="border-0">
                
                <div v-for="(answer, index) in answers.data" :key="index">
                    <base-alert type="default">
                        <strong>{{ answer.question }}</strong>
                    </base-alert>   
                    <base-alert type="secondary" class="py-0">
                        
                        <div class="d-flex justify-content-between">
                            <div class="col-6 text-wrap">{{ answer.answer }}</div>
                            <div class="col-4">
                                <div class="row">
                                    <div class="col-8">
                                    <base-progress type="default" :height="8" :value="(answer.clientRate-1)*25" :showPercentage="false"></base-progress>
                                    </div>
                                    <div class="mt-2 ml-2">
                                        <div class="d-flex justify-content-center">{{ getStringRating(answer.rating) }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </base-alert>
                </div>
                <div v-if="comment!=''">
                    <base-alert type="default">
                        <strong>Comments and Suggestions</strong>
                    </base-alert>
                    <base-alert type="secondary" class="py-0">
                        
                        <div class="d-flex justify-content-between">
                            <div class="col-6 text-wrap">{{ comment }}</div>
                        </div>
                    </base-alert>
                </div>
                <div v-if="video_link!==undefined">
                    <base-alert type="default">
                        <strong>Video Link</strong>
                    </base-alert>
                    <base-alert type="secondary" class="py-0">
                        
                        <div class="d-flex justify-content-between">
                            <div class="col-6 text-wrap"><a :href="video_link" target="_blank">Click to view video</a></div>
                        </div>
                    </base-alert>
                </div>
                <hr>
                <div class="d-flex justify-content-end">
                    <base-button type="secondary" @click="$emit('close')">Exit
                    </base-button>
                </div>
        </card>
    </modal>
</template>
<script>
export default {
    name: 'completed-answer-modal',
    props:{
        isEnabled: false,
        answers: {
            data:
                [

                ]
        },
        comment: '',
        has_video: true,
        video_link: ''
    },
    data(){
        return{
            commentRating: 0,
            oldCommentRating: 0
        }
    },

    methods: {
        getStringRating(rating){
            let intRating = parseInt(rating);
            switch(intRating){
                case 0: return "Not rated";
                case 1: return "Very poor";
                case 2: return "Poor";
                case 3: return "Acceptable";
                case 4: return "Good";
                case 5: return "Excellet";
            }
        },

    },

    mounted(){
        // for(let i = 0; i < this.answers.data.length; i++){
        //     this.oldRatings.push(this.answers.data[i].subtaskRating);
        // }
    },

    computed: {

    }
}
</script>
<style>

</style>


