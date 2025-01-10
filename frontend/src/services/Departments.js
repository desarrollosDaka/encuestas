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
        const url = `${RUTA}/Departments`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`, // token
          },
        });
        if (response.data.error) {  

          ErrorConnectios(response.status,response.statusText)

      }

       this.data.value =  await response.data.body;
    } catch (error) {
        console.error(error);
    }
}


  async unique({ params, token }) {
    const url = new URL(`${RUTA}/Departments/unique`);

    // Agregar parámetros a la URL si es necesario
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    try {
      const response = await axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`, // token
        },
      });

      if (response.data.error) {
        ErrorConnectios(response.status, response.statusText);
      } else {
        this.data.value = response.data.body;
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  }

}

export default Service;
