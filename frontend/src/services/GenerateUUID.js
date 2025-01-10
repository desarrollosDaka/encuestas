import { ref } from 'vue'
import axios from 'axios';
import Entorno from '../composables/entorno'
import  ErrorConnectios from '../composables/errorsConnection'
import Database from "../composables/database";

const DB = Database()
const { RUTA } = Entorno();

class Service{

    constructor(){

        this.data = ref([])
      
    }


    getFuentesData(){

        return this.data
    }


    async Uuid(uuid) { 
        try {
            const response = await axios.get(`${RUTA}/GenerateUUID/${uuid}`);  

            if (response.data.error) {  

                ErrorConnectios(response.status,response.statusText)
   
            }
            this.data.value =  response.data.body;

        } catch (error) {
            console.error(error);
        }
    }


    async UuidPost(data, token){
        
        const url = `${RUTA}/GenerateUUID`
        
      await  axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`, // token
        },
      })
          .then(function (response) {
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    
    async uuIdDelete(params, token){

        const url = `${RUTA}/GenerateUUID/`
  
     await   axios.put(url,params, {
      headers: {
        Authorization: `Bearer ${token}`, // token
      },
       })
          .then(function (response) {
        //   console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    } 
}

export default Service