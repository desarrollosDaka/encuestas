<script setup>
import { defineProps, defineEmits } from 'vue';
import obtenerCookiesUsuario from '@/function/cookies'
import ServiceResponse from '@/services/Response'
import { toast } from 'vue3-toastify';

const service_response = new ServiceResponse()

const objUser = obtenerCookiesUsuario().objUser
const userName = obtenerCookiesUsuario().userName
const token = obtenerCookiesUsuario().token


const emits = defineEmits(['closeModal'])

const props = defineProps({

    openModal: {
        type: Boolean,
        require: true
    },

    row: {
        type: Object,
        require: true,
    }
})


async function onSubmit(e) {

    const where = {
        Id: props.row.Id,
        IdEncuesta: props.row.IdEncuesta,
        IdQuestion: props.row.IdQuestion
    }

    const data = {
        Score: props.row.Score,
        UserAudits: userName
    }

    if(props.row.Score){

        await service_response.update({ data: data, params: where, token: token })

        toast.success("Valor actualizado!", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000,
            theme: 'dark'

        });
    }

    emits('closeModal')

}

const close = () => {

    emits('closeModal')
}

</script>

<template>
    <Teleport to="body">
        <div v-if="openModal" class="modal mt-3">
           
                    
            <div class="form-container">
               
                <div class="position-relative"><button type="button" @click="close" style="background-color: white;" class="btn-close position-absolute top-0 end-0" aria-label="Close"></button></div>

                <form class="form" @submit.prevent="onSubmit">
            
                    <div class="steps">
                        <div class="step">
                            <div>
                                <span>PREGUNTA:</span>
                                <p>{{ row.TextoPregunta }}</p>
                            </div>
                            <hr>
                            <div>
                                <span>RESPUESTA:</span>
                                <p>{{ row.TextoRespuesta }}</p>
                            </div>
                            <hr>
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="score">Puntaje Obtenido</label>
                        <input type="text" id="score" name="score" v-model="row.Score">
                    </div>
                    <!-- <div class="form-group">
                <label for="textarea">How Can We Help You?</label>
                <textarea name="textarea" id="textarea" rows="10" cols="50">          </textarea>
            </div> -->
                    <button class="form-submit-btn" type="submit">Actualizar Puntaje</button>
                </form>
            </div>
        </div>
    </Teleport>



</template>

<style scoped>
.modal {

    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;

    background-color: rgba(0, 0, 0, 0.5);
}

.steps {
    display: flex;
    flex-direction: column;
    padding: 20px;
}

.steps .step {
    display: grid;
    gap: 10px;
}

.steps .step span {
    font-size: 13px;
    font-weight: 600;
    color: #9B9D9E;
    /* White text */
    margin-bottom: 8px;
    display: block;
}


.form-container {
    width: 400px;
    background: linear-gradient(#212121, #212121) padding-box,
        linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff) border-box;
    border: 2px solid transparent;
    padding: 32px 24px;
    font-size: 14px;
    font-family: inherit;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    border-radius: 16px;
}

.form-container button:active {
    scale: 0.95;
}

.form-container .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-container .form-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.form-container .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #717171;
    font-weight: 600;
    font-size: 12px;
}

.form-container .form-group input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    color: #fff;
    font-family: inherit;
    background-color: transparent;
    border: 1px solid #414141;
}

.form-container .form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    resize: none;
    color: #fff;
    height: 96px;
    border: 1px solid #414141;
    background-color: transparent;
    font-family: inherit;
}

.form-container .form-group input::placeholder {
    opacity: 0.5;
}

.form-container .form-group input:focus {
    outline: none;
    border-color: #e81cff;
}

.form-container .form-group textarea:focus {
    outline: none;
    border-color: #e81cff;
}

.form-container .form-submit-btn {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    align-self: flex-start;
    font-family: inherit;
    color: #717171;
    font-weight: 600;
    width: 50%;
    background: #313131;
    border: 1px solid #414141;
    padding: 12px 16px;
    font-size: inherit;
    gap: 8px;
    margin-top: 8px;
    cursor: pointer;
    border-radius: 6px;
}

.form-container .form-submit-btn:hover {
    background-color: #fff;
    border-color: #fff;
}
</style>