<template>
    <div>
       <h2 class="poppins-font">PRODUCTS BY CATEGORIES</h2>
       <div class="side-menu-body">
           <ul class="nav" v-for="category in categories.categoryArray" :key="category._id">
              <li class="dropdown menu-item"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon fa fa-shopping-bag" aria-hidden="true"></i>{{ category.name }}</a>
                <ul class="dropdown-menu mega-menu" >
                  <li v-for="product in productsbycategory" :key="product._id" v-if="product.categoryId === category._id"><a :href="`/product/${product._id}`">{{ product.name }}</a></li>
                </ul>
              </li>
              </ul>

           <!-- <ul v-for="category in categories.categoryArray" :key="category._id">
            <li><a :href="`/product/category/${category._id}`"><i class="icon-cat-shirt"></i>{{ category.name }}</a></li>
            </ul>
            <a href="#" class="btn btn-block btn-primary">HUGE SALE - <strong>70%</strong> Off</a> -->
            </div><!-- End .side-menu-body -->


    </div>
</template>
<script>
import {getCategories} from '../../../config'
import {allProductsByCategory} from '../../../config'
export default {
    data() {
        return {
           categories: {},
           productsbycategory: {},
           errors: {}
        }
    },
     computed : {
      isLoggedIn : function(){ return this.$store.getters.currentUser}
    },
     created () {
        this.getCategories();
        this.getAllProductsByCategory();
    },
    methods: {
            getCategories() {
            this.$http.get(getCategories)
            .then(response => {
                this.categories = response.data
            })
            .catch(err => {
                this.errors = err.data
            });
        },
          getAllProductsByCategory() {
            this.$http.get(allProductsByCategory)
            .then(response => {
                this.productsbycategory = response.data
            })
            .catch(err => {
                this.errors = err.data
            });
        },
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({name: 'Login'})
        })
      }
    }
}
</script>

<style scoped>
  .nav .dropdown.menu-item{
    width: 100%;
  }

  .nav .dropdown.menu-item a{
    width: 100%;
  }

  .nav .dropdown-menu.mega-menu{
    width: 100% !important;
    min-height: 100px;
  }

  .nav .dropdown-menu.mega-menu li{
    text-transform: capitalize;
    width: 90% !important;
    padding-bottom: 10px;
  }

  .nav .dropdown-menu.mega-menu li a{
    border-bottom: none !important;
  }

  .yamm-content .links.list-unstyled li{
    /*width: 80%;*/
  }
/*
  .yamm-content .links.list-unstyled li a{
    width: 100%;
  }*/
</style>
