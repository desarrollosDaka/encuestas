<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import ServiceQuestion from '../services/takeSurvey/Questions'
import ServiceSurvey from '../services/takeSurvey/Survey'
import obtenerCookiesUsuario from '../composables/cookies'
import Loader from '../components/Loader.vue'
import Entorno from '../composables/entorno'

const { RUTA_LINK } = Entorno();

const route = useRoute()
const router = useRouter()

const idUserResponse = ref()
const idEncuesta = ref()

idUserResponse.value = route.params?.id
idEncuesta.value = route.params?.idEncuesta

let hasScore = ref(false)
let loader = ref()


const linkSurvey = ref(RUTA_LINK)

const objUser = obtenerCookiesUsuario().objUser
const userName = obtenerCookiesUsuario().userName

const service_question = new ServiceQuestion()
const bd_service_question = service_question.getFuentesData()

const service_survey = new ServiceSurvey()
const bdsurvey = service_survey.getFuentesData()

onMounted(async () => {

  try {

    const where = {
      IdEncuesta: idEncuesta.value
    }

    const whereSurvey= {
        Id: idEncuesta.value
    }

    loader.value = true
    await service_question.unique({ params: where })
    await service_survey.unique({ params: whereSurvey }) // obtengo los datos de la encuesta

    loader.value = false
    iterateDataSurvey()

  } catch (error) {
    console.error(error)
  }


})


function iterateDataSurvey() {

  for (const element of bd_service_question.value) {

    if (element.ShowResults) {
      hasScore.value = true;
      break;
    }
  }

}


function viewSurveyResuls() {

  router.push({ name: 'SurveyResult', params: { id: idEncuesta.value, idUser: idUserResponse.value } });
}

const start = () =>  router.push({ name:'takeSurvey', params: { id: bdsurvey.value[0]?.UrlSurvey }});




</script>

<template>
  <div v-if="loader">
    <Loader />
  </div>
  <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11 justify-content-center align-items-center">
          <div class="card text-center">
            <div class="card-header h3 text-white bg-primary">Encuesta Finalizada</div>
            <div class="card-body px-5">
              <p style="text-align: center;font-size: 28px;font-weight: 500;line-height: 42px; color:#0a86ea">
                Gracias por completar esta encuesta <i class="fa-solid fa-thumbs-up"></i>
              </p>
              <button v-if="bdsurvey[0]?.StartButton" class="button-start" @click="start">Volver al inicio</button>
            </div>
          </div>
          <div>

            <div v-if="hasScore">
              <button class="btn-result mt-3" @click="viewSurveyResuls"><i class="animation"></i>VER
                PUNTUACIÓN<i class="animation"></i>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>

.button-start {
 background-color: transparent;
 border: 1px solid rgb(20, 87, 244);
 padding: 6px 12px;
 border-radius: 7px;
 transition: .3s;
 color: rgb(20, 87, 244);
}

.button-start:hover {
 border: 1px solid rgb(20, 87, 244);
 background-color: #0A86EA;
 color: #fff
}

.button-start:focus {
 box-shadow: 0px 0px 0px 5px rgba(20, 87, 244, 0.37), 0px 0px 0px 10px rgba(20, 87, 244, 0.38);
 outline: none;
}

.btn-result {
  outline: 0;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background: #0D6EFD;
  min-width: 200px;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, .1);
  box-sizing: border-box;
  padding: 16px 20px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  overflow: hidden;
  cursor: pointer;
}

.btn-result:hover {
  opacity: .95;
}

.btn-result .animation {
  border-radius: 100%;
  animation: ripple 0.6s linear infinite;
}

@keyframes ripple {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1), 0 0 0 20px rgba(255, 255, 255, 0.1), 0 0 0 40px rgba(255, 255, 255, 0.1), 0 0 0 60px rgba(255, 255, 255, 0.1);
  }

  100% {
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0.1), 0 0 0 40px rgba(255, 255, 255, 0.1), 0 0 0 60px rgba(255, 255, 255, 0.1), 0 0 0 80px rgba(255, 255, 255, 0);
  }
}
</style>