<script setup>
import { defineProps, defineEmits, toRefs, onMounted } from 'vue';
import LogicQuestion from '@/components/LogicQuestion.vue';

const emits = defineEmits(['closeModal','addQuestionsBranch']);

const props = defineProps({
  openModal: {
    type: Boolean,
    required: true
  },
  idQuestion:{
    type:String,
    required: true
  },
  index:{
    type: Number,
    required:true
  },
  idSurvey:{
    type: Number,
    require: true
  },
  id:{
    type:Number,
    require: false
  },
  typeLogic:{
    type: String,
    require: true
  }
});

const { openModal,idQuestion, index, idSurvey, id, typeLogic } = toRefs(props);

const closeModal = (type) => emits('closeModal',type);
const QuestionBranch = (value) => emits('addQuestionsBranch',value);
</script>

<template>
  <Teleport to="body">
    <div class="modal" v-if="openModal">
      <div class="card">
        <div class="body">
          <div class="modal-body">
            <LogicQuestion 
              :key="index" 
              :idQuestion="idQuestion" 
              :idSurvey="idSurvey"
              :typeLogic="typeLogic" 
              :id=id 
              @addQuestionsBranch=QuestionBranch
            />
          </div>
        </div>
        <div class="button-container">
          <button class="button_ok" @click="closeModal(typeLogic)">Cerrar</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.button_ok {
  display: inline-flex;
  padding: 0.5rem 1rem;
  background-color: #6c757d;
  color: white;
  font-size: 1rem;
  line-height: 1.5rem;
  justify-content: center;
  width: auto;
  border-radius: 0.375rem;
  border-width: 1px;
  border-color: transparent;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
}

.card {
  width: auto;
  top: 50px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.body {
  padding: 5px;
  color: #143E8F;
}

.skill {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.skill-name {
  width: 120px;
  font-size: 14px;
}
</style>
