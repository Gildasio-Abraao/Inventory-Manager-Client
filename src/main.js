import App from './App.vue';
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import router from './router';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
const app = createApp(App);

// Primevue components
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import RadioButton from 'primevue/radiobutton';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Badge from 'primevue/badge';
import Toast from 'primevue/toast';

app
  .use(PrimeVue)
  .use(router)
  .use(ToastService)
  .component('Dialog', Dialog)
  .component('DataTable', DataTable)
  .component('Column', Column)
  .component('Button', Button)
  .component('InputText', InputText)
  .component('RadioButton', RadioButton)
  .component('Textarea', Textarea)
  .component('InputNumber', InputNumber)
  .component('Badge', Badge)
  .component('Toast', Toast)
  .mount('#app');