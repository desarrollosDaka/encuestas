<script setup>
import { ref, onMounted, watch, computed, defineAsyncComponent } from 'vue';
import obtenerCookiesUsuario from '../composables/cookies'
//import DataTable from '../components/dataTable/DataTableListSurvey.vue'
import ServiceEncuestas from '../services/Survey'
import ServiceQuestion from '../services/Questions'
import ServiceAnswerOptions from '../services/AnswerOptions'
import Swal from "sweetalert2"
import ObtenerFecha from '../composables/ObtenerFecha';
import Spinner from '../components/Spinner.vue'
import AuthService from "../services/AuthServices"
import validatePropertyAndValue from '../composables/validateAndValue'
import ServiceResponse from '../services/Response'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import verifySurveyData from '@/composables/verifySurveyData';
import notify from '@/composables/notify';
import ServiceQuestionBranches from '@/services/QuestionBranches'

const DataTable = defineAsyncComponent(() =>
    import('../components/dataTable/DataTableListSurvey.vue')
)

const service_question_branches = new ServiceQuestionBranches()

const service_response = new ServiceResponse()
const bd_service_response = service_response.getFuentesData()

const service_question = new ServiceQuestion()
const service_answer = new ServiceAnswerOptions()

const service = new ServiceEncuestas()
const Bd = service.getFuentesData()

const change = ref(false)
const changeData = computed(() => change.value)

const _columns = service.getFuentesColumn()

const service_user = new AuthService()
const bd_user = service_user.getFuentesData()


const objUser = obtenerCookiesUsuario().objUser
const userName = obtenerCookiesUsuario().userName
const token = obtenerCookiesUsuario().token

let loading = ref(true)

let nameSurvey = ref('')
let inheadedSurvey = ref('')
let operation = ref('Nueva encuesta o formulario')
const operationReset = ref('Cancelar')
const isNewSurvey = ref(true);
const company = ref('')
const department = ref('')
const BdEdit = ref(null)  //identifica el reg a actualizar
const numberOfCharacters = ref(50)
const numberOfCharactersHeaded = ref(250)
const ismovil = ref(false)
const myInput = ref(null);

onMounted(async () => {

    try {

        await service_user.GetDataUser(userName,token)

        company.value = bd_user.value[0]?.IdCompany
        department.value = bd_user.value[0]?.IdDepartments

        surveyListInit()

        loading.value = false

    } catch (error) {

        console.error(error)

    }



})

const activeChange = () => change.value = !change.value;
const focusInput = () => myInput.value.focus();

async function surveyListInit() {

    try {
        const where = {
            IdCompany: company.value,
            IdDepartments: department.value
        }

        company.value === 'all' ? delete where.IdCompany : null
        department.value === 'all' ? delete where.IdDepartments : null

        await service.unique({ params: where, token: token }) // obtengo las encuestas por filtro de empresa y departamento asociado al usuario

    } catch (error) {
        console.error(error)
    }

}
async function addSurvey() {

    try {

        isNewSurvey.value = !isNewSurvey.value;
        operation.value = 'Crear encuesta o formulario';


        if (isNewSurvey.value && nameSurvey) {


            if (BdEdit.value == null) {
                //    AQUI CODIGO DE GUARDAR EL NOMBRE DE LA ENCUESTA


                const data = {

                    Nombre: nameSurvey.value.toUpperCase(),
                    IdCompany: company.value,
                    IdDepartments: department.value,
                    Encabezado: inheadedSurvey.value,
                    Estado: 0,
                    UsrCrea: userName.toUpperCase(),
                }

                await service.add({ data: data, token: token })  // Actualiza tabla nom_encuestas
                nameSurvey.value = ''
                inheadedSurvey.value = ''
                activeChange()
            } else {


                Swal.fire({
                    title: '¿Quieres actualizar los cambios?',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Actualizar',
                    denyButtonText: `No Actualizar`,
                }).then(async (result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {



                        const data = {
                            Id: BdEdit.value,
                            Nombre: nameSurvey.value.toUpperCase(),
                            Encabezado: inheadedSurvey.value,
                            UsrAct: userName.toUpperCase(),
                            FecAct: ObtenerFecha()
                        }

                        await service.update({ data: data, token: token }) // Actualiza tabla nom_encuestas
                        activeChange()
                        clearFields()

                    }
                })



            }

            operation.value = 'Nueva encuesta o formulario'

        }

    } catch (error) {
        console.error(error)
    }


}

function editData(id) {
    operation.value = 'Actualizar Datos'
    const foundData = Bd.value.filter(data => data.Id == id)

    nameSurvey.value = foundData[0].Nombre
    inheadedSurvey.value = foundData[0].Encabezado
    BdEdit.value = id
    isNewSurvey.value = false

    focusInput()
}

async function deleteData(id) {

    try {

        const isResponse = await verifySurveyData(id)
        const message = 'No se puede eliminar la encuesta/formulario, ya esta siendo respondida'
        if (isResponse) {

            notify(message)

            return
        }


        Swal.fire({
            icon: "warning",
            title: "Estas Seguro?",
            text: "Esta accion es irreversible!",
            showCancelButton: true,
            confirmButtonText: "Si, Eliminar!",
            cancelButtonText: "No, Cancelar!",
        }).then(async (result) => {
            if (result.value) {

                //Aqui Eliminamos en el Backend

                const where = {
                    IdEncuesta: id
                }

                if (validatePropertyAndValue(where, 'IdEncuesta')) {
                    await service_question_branches.del({ params: where, token: token }) // ramas de la encuesta
                    await service_answer.del({ params: where, token: token }) // opciones de respuesta
                    await service_question.del({ params: where, token: token }) // preguntas de la encuesta
                    await service.del(id, token) //eliminamos la encuesta
                    activeChange()
                } else {

                    toast.error("Ocurrio un error. Actualize e intente nuevamente", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        transition: toast.TRANSITIONS.SLIDE,
                        autoClose: 2000,
                        theme: 'dark',
                    });
                }
            }
        });

    } catch (error) {
        console.error(error)
    }


}


watch(changeData, async () => {

    try {

        await surveyListInit();

    } catch (error) {
        console.error("Error initializing survey list:", error);
    }
}, { deep: true });


function clearFields() {

    isNewSurvey.value = true
    nameSurvey.value = ''
    inheadedSurvey.value = ''
    BdEdit.value = null
    operation.value = 'Nueva encuesta o formulario'
    operationReset.value = 'Cancelar'
    BdEdit.value = null
    focusInput()
}

// let navegador = navigator.userAgent;
//         if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
//            ismovil.value = true
//         } else {
//             ismovil.value = false
//         }
</script>

<template>
    <div>
        <form id="msform" v-on:submit.prevent="addSurvey" class="row g-3 mt-5">

            <div class="col-sm-6" :hidden="isNewSurvey">
                <input class="input-box" type="text" :maxlength="numberOfCharacters" v-model="nameSurvey"
                    id="nameSurvey" placeholder="Nombra tu encuesta o formulario" ref="myInput">
                <span class="underline"></span>
                <span>{{ nameSurvey.length }} / {{ numberOfCharacters }}</span>
            </div>

            <div class="col-sm-6" :hidden="isNewSurvey">
                <input class="input-box" type="text" :maxlength="numberOfCharactersHeaded" v-model="inheadedSurvey"
                    id="inheadedSurvey" placeholder="Detalla el encabezado de la encuesta">
                <span class="underline"></span>
                <span>{{ inheadedSurvey.length }} / {{ numberOfCharactersHeaded }}</span>
            </div>


            <div class="col-auto">
                <button type="submit"
                    :class="['btn ', operation == 'Nueva encuesta o formulario' ? 'btn-primary' : 'btn-warning']"><i
                        class="fa-solid fa-plus"></i> {{ operation }}</button>
            </div>

            <div class="col-auto">
                <input type="button" @click="clearFields" class="btn btn-danger" v-bind:value="operationReset" />
            </div>
        </form>


    </div>


    <div>
        <!-- AQUI LA LISTA DE ENCUESTAS CREADAS -->
        <div v-if="loading">
            <Spinner />
        </div>
        <Suspense>
            <DataTable :items="Bd" :columns="_columns" :ismovil=ismovil @sayUpdate="editData" @sayDelete="deleteData"
                @sayChange="activeChange" />
            <!-- loading state via #fallback slot -->
            <template #fallback>
                Loading...
            </template>
        </Suspense>
    </div>
</template>

<style scoped>
.input-wrapper {
    position: relative;
    width: 200px;
    margin: 50px auto;
}

.input-box {
    font-size: 16px;
    padding: 10px 0;
    border: none;
    border-bottom: 2px solid #198754;
    color: #212529;
    width: 100%;
    background-color: transparent;
    transition: border-color 0.3s ease-in-out;
}

.underline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #08AEEA;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
}

.input-box:focus {
    border-color: #08AEEA;
    outline: none;
}

.input-box:focus+.underline {
    transform: scaleX(1);
}
</style>
