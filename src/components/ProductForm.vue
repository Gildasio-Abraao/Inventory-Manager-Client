<template>
  <Dialog :style="{ width: '450px' }" header="Product Details" :modal="true" class="p-fluid">
    <!--Name field-->
    <div class="field">
      <label for="name">Name</label>
      <InputText id="name" name="name" v-model.trim="productForm.name" required="true" autofocus :class="{ 'p-invalid': submitted && !productForm.name }" :maxlength="30" />
      <small class="p-error" v-if="submitted && !productForm.name">Name is required.</small>
    </div>

    <!--Description field-->
    <div class="field my-3">
      <label for="description">Description</label>
      <Textarea id="description" name="description" v-model="productForm.description" rows="3" cols="20" :maxlength="150" />
    </div>

    <!--Category field-->
    <div class="field my-3">
      <label>Category</label>
      <div class="d-flex flex-wrap">
        <div class="field-radiobutton m-2 ms-0 col-4">
          <RadioButton id="category1" name="category" class="me-2" value="Accessories" v-model="productForm.category" />
          <label for="category1">Accessories</label>
        </div>
        <div class="field-radiobutton m-2 ms-0 col-4">
          <RadioButton id="category2" name="category" class="me-2" value="Clothing" v-model="productForm.category" />
          <label for="category2">Clothing</label>
        </div>
        <div class="field-radiobutton m-2 ms-0 col-4">
          <RadioButton id="category3" name="category" class="me-2" value="Electronics" v-model="productForm.category" />
          <label for="category3">Electronics</label>
        </div>
        <div class="field-radiobutton m-2 ms-0 col-4">
          <RadioButton id="category4" name="category" class="me-2" value="Food" v-model="productForm.category" />
          <label for="category4">Food</label>
        </div>
      </div>
    </div>

    <!--Price and Quantity field-->
    <div class="d-flex flex-wrap">
      <div class="field me-3 col">
        <label for="price">Price</label>
        <InputNumber id="price" v-model="productForm.price" :inputProps="{ name: 'price' }" mode="currency" :min="0" currency="USD" locale="en-US" :allowEmpty="false" />
      </div>
      <div class="field col">
        <label for="quantity">Quantity</label>
        <InputNumber id="quantity" v-model="productForm.quantity" :inputProps="{ name: 'quantity' }" :allowEmpty="false" :min="0" :max="99999" integeronly />
      </div>
    </div>

    <!--Footer-->
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="$emit('refresh')" />
      <Button label="Edit" icon="pi pi-check" class="p-button-text me-0" @click="update" v-if="product" />
      <Button label="Create" icon="pi pi-check" class="p-button-text me-0" @click="store" v-if="!product" />
    </template>
  </Dialog>
</template>

<script>
import ApiController from '@/controller/ApiController';

export default {
  name: 'ProductForm',
  props: {
    product: null,
  },
  data() {
    return {
      submitted: false,
      productForm: {},
    }
  },
  methods: {
    store() {
      ApiController.store(this.productForm)
        .then(response => {
          this.message(response);
          this.$emit('refresh');
        })
        .catch(error => {
          this.message(error);
        });
    },
    update() {
      ApiController.update(this.productForm)
        .then(response => {
          this.message(response);
          this.$emit('refresh');
        })
        .catch(error => {
          this.message(error);
        });
    },
    message(data) {
      const status = data.status === 200 ? 'success' : 'error';
      this.$toast.add({
        severity: status,
        summary: data.code || data.status,
        detail: data.message || data.statusText,
        life: 3000
      });
    }
  },
  mounted() {
    this.productForm = {};
    if (this.product)
      this.productForm = this.product;
  },
  beforeUnmount() {
    this.$emit('refresh');
  }
}
</script>