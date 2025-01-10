import { ref } from "vue";
import axios from "axios";
import Entorno from "../composables/entorno";
import ErrorConnectios from "../composables/errorsConnection";
import Database from "../composables/database";

const DB = Database()
const { RUTA } = Entorno();

class Service {
  constructor() {
    this.data = ref([]);
    this.columns = ref([]);
  }

  getFuentesData() {
    return this.data;
  }

  getFuentesColumn() {
    return this.columns;
  }

 
  async all(token) {
    try {
        const url = `${RUTA}/Company`;
        const response = await axios.get(url, {
          headers: { 'Authorization': `Bearer ${token}` }
      })

        if (response.data.error) {  

          ErrorConnectios(response.status,response.statusText)

      }
       /// this.data.value = await response.data.body["recordset"];
       this.data.value =  await response.data.body;
    } catch (error) {
        console.error(error);
    }
}

}

export default Service;
