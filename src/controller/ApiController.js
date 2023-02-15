import axios from "axios";

class ApiController {
  constructor() {
    this.url = 'http://localhost:3000';
  }

  listAllProducts() {
    return axios.get(`${this.url}/all-products`);
  }

  store(data) {
    return axios.post(`${this.url}/add-product`, data);
  }

  update(data) {
    return axios.put(`${this.url}/update-product`, data);
  }

  delete(id) {
    return axios.delete(`${this.url}/delete-product?id=${id}`);
  }
}

export default new ApiController();