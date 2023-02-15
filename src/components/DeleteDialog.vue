<template>
  <Dialog :style="{ width: '450px' }" header="Confirm" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle me-3" style="font-size: 2rem" />
      <span v-if="product">Are you sure you want to delete?</span>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" class="p-button-text" @click="$emit('cancel')" />
      <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct()" />
    </template>
  </Dialog>
</template>

<script>
import ApiController from '@/controller/ApiController';

export default {
  name: 'DeleteProduct',
  props: {
    product: null,
  },
  methods: {
    deleteProduct() {
      ApiController.delete(this.product)
        .then(response => {
          this.message(response);
          this.$emit('cancel');
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
  }
}
</script>