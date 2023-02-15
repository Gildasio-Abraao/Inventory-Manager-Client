<template>
  <DataTable
    :filters="filter"
    :value="data"
    :paginator="true"
    :rows="8"
    stripedRows
    responsiveLayout="scroll"
    v-model:selection="selectedProducts"
    :style="{ boxShadow: '0px 0px 10px #00000029' }"
    dataKey="id"
  >
    <template #header>
      <div class="table-header flex flex-row justiify-content-between">
        <h5 class="mb-2 md:m-0 p-as-md-center">Manage Products</h5>
          <div class="fields">
            <span class="p-input-icon-left me-2">
              <i class="pi pi-search" />
              <InputText v-model="filter" placeholder="Search..." />
            </span>
            <Button
              label="Delete"
              icon="pi pi-trash"
              :class="{ 'p-button-danger me-2': data, 'disabled': selectedProducts.length < 1 }"
              @click="showDeleteProductDialog(getListId())"
            />
            <Button label="New" icon="pi pi-plus" class="p-button-success" @click="$emit('enable-form')" />
          </div>
      </div>
    </template>
    <Column selectionMode="multiple" style="max-width: 2rem" :exportable="false"></Column>
    <Column field="name" header="Name" :sortable="true"></Column>
    <Column field="quantity" header="Status" :sortable="true">
      <template #body="slotProps">
        <Badge size="large" value="Instock" severity="success" v-if="slotProps.data.quantity > 50" />
        <Badge size="large" value="Lowstock" severity="warning" v-if="slotProps.data.quantity < 50 && slotProps.data.quantity > 0" />
        <Badge size="large" value="Outofstock" severity="danger" v-if="slotProps.data.quantity === 0" />
      </template>
    </Column>
    <Column field="category" header="Category" :sortable="true"></Column>
    <Column field="price" header="Price" :sortable="true">
      <template #body="slotProps">
        $ {{ slotProps.data.price }}
      </template>
    </Column>
    <Column field="quantity" header="Quantity" :sortable="true"></Column>
    <Column :exportable="false" style="max-width: 3rem" class="px-2 py-2">
      <template #body="slotProps">
        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success me-2" style="max-width: 2rem; max-height: 2rem;" @click="$emit('enable-form', slotProps.data)"/>
        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" style="max-width: 2rem; max-height: 2rem;" @click="showDeleteProductDialog(slotProps.data.id)" />
      </template>
    </Column>
  </DataTable>
  <DeleteDialog v-model:visible="deleteProductDialog" :product="product" @cancel="refresh()" />
</template>

<script>
import DeleteDialog from '@/components/DeleteDialog.vue';

export default {
  name: 'ProductsList',
  components: {
    DeleteDialog,
  },
  props: {
    data: [],
  },
  data() {
    return {
      filter: null,
      deleteProductDialog: false,
      selectedProducts: [],
      product: null,
    }
  },
  methods: {
    showDeleteProductDialog(product) {
      this.deleteProductDialog = true;
      this.product = product;
    },
    getListId() {
      const idsArr = [];
      this.selectedProducts.forEach(product => {
        idsArr.push(product.id);
      });
      const ids = idsArr.join();
      return ids;
    },
    refresh() {
      this.$emit('refresh');
      this.selectedProducts = [];
      this.deleteProductDialog = false;
    }
  }
}
</script>

<style>
.disabled {
  pointer-events: none;
  cursor: none;
  opacity: 0.3;
}
</style>