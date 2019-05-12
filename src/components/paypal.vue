<template>
  <div class="content">
    <div>
        <div class="d-flex justify-content-center">
            <p class="row">How many points do you wish to buy?</p>
        </div>
        
        <div class="d-flex justify-content-center">
            {{ amount*10 }} Points
        </div>
        <div class="d-flex justify-content-center">
            <base-input type="number" class="paypalInput" v-model="amount"></base-input> &nbsp;&nbsp;&nbsp;
        </div>
        <div class="d-flex justify-content-center">
            
        <paypal-checkout class="row"
        :amount="''+amount"
        currency="USD"
        env="sandbox"
        :client="paypal"
        @payment-authorized="paymentAuthorized"
        @payment-completed="paymentCompleted"
        @payment-cancelled="paymentCancelled"
        >
        </paypal-checkout>
        </div>
        
        
    </div>
  </div>
</template>

<script>
import PaypalCheckout from 'vue-paypal-checkout'
import { store } from '../store.js'
export default {
    name: 'paypal',
    data() {
      return {
        amount: 10,
        paypal: {
          sandbox: 'AUyDev7cz_px2_6PD5X94J1xj7-psIWIN6TYSJMmUNGI7FsuPyrjGRtfSv6jsDp926SODr65Li768z4b',
          production: '',
        },
      };
    },
    components:{
        PaypalCheckout
    },
    methods: {
      paymentAuthorized: function (data) {
        console.log("paymentAuthorized");
        console.log(data);
      },
      paymentCompleted: function (data) {
        console.log("paymentCompleted");
        console.log(data.orderID);

        axios.defaults.headers={
            'Authorization': 'Bearer ' + store.getters.token
        }
        axios.get('/paypal-confirm',{
            order_id: data.id,
            
        })
          .then(function (response) {
            // handle success
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
        console.log(data);
      },
      paymentCancelled: function (data) {
        console.log("paymentCancelled");
        console.log(data);
      },
    }
}
</script>
<style>

</style>
