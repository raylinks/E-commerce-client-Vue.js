<template>
    <div>
         <main class="main">
           <nav aria-label="breadcrumb" class="breadcrumb-nav pb-3">
             <div class="container">
               <ol class="breadcrumb">
                 <li class="breadcrumb-item ml-0"><a href="/checkout-shipping" style="font-size: 16px"><i class="icon-chevron-left" style="font-size: medium"></i> <span style="padding-top: 20px">Go back</span></a></li>
               </ol>
             </div><!-- End .container -->
           </nav>

            <div class="container">
                <ul class="checkout-progress-bar">
                    <li>
                        <span>Shipping</span>
                    </li>
                    <li class="active">
                        <span>Review &amp; Payments</span>
                    </li>
                </ul>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="order-summary">
                            <h3>Summary</h3>

                            <h4>
                                <a data-toggle="collapse" href="#order-cart-section" class="collapsed" role="button" aria-expanded="false" aria-controls="order-cart-section">{{ cartCount.length }} products in Cart</a>
                            </h4>

                            <div class="collapse" id="order-cart-section">
                                <table class="table table-mini-cart">
                                    <tbody>
                                        <tr v-for="item in cartCount" :key="item._id" >
                                            <td class="product-col">
                                                <figure class="product-image-container">
                                                    <a href="#" class="product-image">
                                                        <img :src="item.image" alt="product">
                                                    </a>
                                                </figure>
                                                <div>
                                                    <h2 class="product-title">
                                                        <a href="#">{{ item.name }}</a>
                                                    </h2>

                                                    <span class="product-qty">Qty: {{ item.qty }}</span>
                                                </div>
                                            </td>
                                            <td class="price-col">N{{ item.price }}</td>
                                        </tr>
                                        <td class="price-col">TOTAL: N{{ total }}</td>

                                    </tbody>
                                </table>
                            </div><!-- End #order-cart-section -->
                        </div><!-- End .order-summary -->

                        <div class="checkout-info-box">
                            <h3 class="step-title">Ship To:
                                <a href="#" title="Edit" class="step-title-edit"><span class="sr-only">Edit</span><i class="icon-pencil"></i></a>
                            </h3>

                            <address>
                                {{ isLoggedIn.address }} <br>
                                    {{ isLoggedIn.city }} <br>
                                    {{ isLoggedIn.state }} <br>
                                    {{ isLoggedIn.country }} <br>
                                    {{ isLoggedIn.phone }}
                            </address>
                        </div><!-- End .checkout-info-box -->

                        <div class="checkout-info-box">
                            <h3 class="step-title">Shipping Method: {{ diff }}
                                <a href="#" title="Edit" class="step-title-edit"><span class="sr-only">Edit</span><i class="icon-pencil"></i></a>
                            </h3>

                            <p>Flat Rate - Fixed</p>
                        </div><!-- End .checkout-info-box -->
                    </div><!-- End .col-lg-4 -->

                    <div class="col-lg-8 order-lg-first">
                        <div class="checkout-payment">
                            <h2 class="step-title">Payment Method:</h2>

                        </div><!-- End .checkout-payment -->

                        <div class="checkout-discount">

                             <div>

                                    <div class="form-group required-field">
                                      <input type="radio" name="paymentMethod" id="onDelivery"  v-model="paymentMethod" v-bind:value="'Pay On Delivery'" checked>
                                      <label for="onDelivery"> Pay On Delivery</label>
                                    </div><!-- End .form-group -->
                                    <div class="form-group required-field">
                                      <input type="radio" name="paymentMethod" id="payOnline" v-model="paymentMethod" v-bind:value="'Pay Online'">
                                      <label for="payOnline"> Pay Online</label>
                                    </div><!-- End .form-group -->
                            </div><!-- End #new-checkout-address -->


<div class="clearfix">
    <input type="hidden" name="cart" v-model="orderDetailsWithout.cart">
    <input type="hidden" name="user"  v-model="orderDetailsWithout.user">
    <input type="hidden" name="status" v-model="orderDetailsWithout.cart">
    <input type="hidden" name="email"  v-model="orderDetailsWithout.email">
    <button v-if="paymentMethod === 'Pay On Delivery'" class="btn btn-primary float-right" @click="orderWithout">Place Order</button>
</div>

<div class="clearfix">
        <paystack v-if="paymentMethod === 'Pay Online'"
         :amount="getAmt"
        :email="email"
        :paystackkey="paystackkey"
        :reference="reference"
        :callback="callback"
        :close="close"
        :embed="false"
        class="btn btn-primary float-right"
    >
       <i class="fas fa-money-bill-alt"></i>
       <span>Place Order</span>
    </paystack>
     <input type="hidden" name="cart" v-model="orderDetails.cart">
    <input type="hidden" name="reference" v-model="orderDetails.reference">
    <input type="hidden" name="user"  v-model="orderDetails.user">
    <input type="hidden" name="status" v-model="orderDetails.status">
    <input type="hidden" name="email1"  v-model="orderDetails.email1">
</div>


                        </div><!-- End .checkout-discount -->
                    </div><!-- End .col-lg-8 -->
                </div><!-- End .row -->
            </div><!-- End .container -->

            <div class="mb-6"></div><!-- margin -->
        </main><!-- End .main -->
    </div>
</template>
<script>
import paystack from 'vue-paystack';
import {login} from '../../../helpers/auth';
 import {userRegUrl} from '../../../config';
 import {update} from '../../../config'
 import { payWithPaystack } from '../../../config'
 import { payWithoutPaystack } from '../../../config'
export default {
     components: {
        paystack
    },
    data() {
        return {
            form:{
				email:'',
				password:''
            },
              userData: {
                full_name : this.$store.state.currentUser.full_name,
                email: this.$store.state.currentUser.email,
                country: this.$store.state.currentUser.country,
                state: this.$store.state.currentUser.state,
                city: this.$store.state.currentUser.city,
                address: this.$store.state.currentUser.address,
                phone: this.$store.state.currentUser.phone
                },
                orderDetails: {
                     user: this.$store.state.currentUser,
                     cart: this.$store.state.cart,
                     reference: this.reference,
                     status: 'ORDERED',
                     email1: this.$store.state.currentUser.email
                },
                 orderDetailsWithout: {
                     user: this.$store.state.currentUser,
                     cart: this.$store.state.cart,
                     status: 'ORDERED',
                     email: this.$store.state.currentUser.email
                },
			error:null,
            products: {},
            groups: {},
            categories: {},
            success: false,
            seen:false,
            seen1: false,
            errors: {},
            paymentMethod: 'Pay Online',
            paystackkey: "pk_live_f9bc52cf1eb6906ecd9d6efbdc31cae11b6baa1d", //paystack public key
            email: this.$store.state.currentUser.email , // Customer email
            amount: '' // in kobo

        }
    },
     computed : {
       isLoggedIn : function(){ return this.$store.getters.currentUser},
      cartCount : function(){ return this.$store.getters.getCart},
      total () {
               let cart = JSON.parse(localStorage.getItem('cart')) || [];
            //for new addition to cart
            if(cart.length > 0){
          return this.$store.getters.getCart.map(item => item.subtotal).reduce((total, amount)=> total + amount)
          }
      },
      sum() {
          var a = parseInt(this.total);
          var b = parseInt(1500);
          var add = a + b;
          return add;
      },
      getAmt () {
          var a = parseInt(this.sum);
          var b = parseInt(100);
          var mult = a * b;
          return mult;
      },
      diff() {
          var a = parseInt(this.total);
          var b = parseInt(this.sum);
          var c = b - a;
          return c;
      },
      reference(){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( let i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
    },
    created () {

    },
    methods: {
       clearCart: function () {
        this.$store.dispatch('clearCart')
        .then(() => {
        	window.location.href = "/"
        })
      },

      updateUser(){
          this.$http.patch(update + this.isLoggedIn._id, this.userData)
          .then(data => {
                        this.success = true;
                        this.userData = {};
          })
          .catch(err => {
                this.errors = err.response || {}
          });
      },

               callback() {
                   this.$http.put(payWithPaystack, this.orderDetails)
                   .then(response => {
                       alert('Order Has been placed. Your reference number is ' + this.reference);
                       this.clearCart();
                   })
                   .catch(err => {
                        console.log(err.response.data)
                        this.errors = err.response.data || {};
                   });
               },

                close: function(){
                    alert('Transaction Cancelled');
                    //  console.log("Payment closed")
                },

                 orderWithout() {
                   this.$http.post(payWithoutPaystack, this.orderDetailsWithout)
                   .then(response => {
                       alert('Order Has been placed.');
                        this.clearCart();

                   })
                   .catch(err => {
                        console.log(err.response)
                        this.errors = err.response || {};
                   });
               },



    }
}

</script>
