<template>
  <div class="col-10 py-4 m-auto">
    <ProductsList :data="products" @enable-form="showForm" @refresh="refresh" />
    <ProductForm v-model:visible="productDialog" v-if="productDialog" :product="editableProduct" @refresh="refresh" />
    <Toast />
  </div>
</template>

<script>
import ApiController from '@/controller/ApiController';
import ProductForm from '@/components/ProductForm.vue';
import ProductsList from '@/components/ProductsList.vue';

export default {
  name: 'HomePage',
  components: {
    ProductsList,
    ProductForm,
  },
  data() {
    return {
      editableProduct: null,
      error: null,
      productDialog: false,
      products: [],
    }
  },
  methods: {
    getAllProducts() {
      ApiController.listAllProducts()
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          this.$toast.add({
            severity: 'error',
            summary: error.code,
            detail: error.message,
            life: 3000
          });
        });
    },
    showForm(product) {
      product ? this.editableProduct = { ...product } : this.editableProduct;
      this.productDialog = true;
    },
    refresh() {
      this.getAllProducts();
      this.editableProduct = null;
      this.productDialog = false;
    }
  },
  created() {
    this.getAllProducts();
  }
}
</script>
