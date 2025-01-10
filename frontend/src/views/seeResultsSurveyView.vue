<script setup>
import { ref } from 'vue'; 
import { useRoute, useRouter } from 'vue-router';
import Paginator from '@/components/dataTable/Paginator.vue';
import ButtonBack from '@/components/button_back/ButtonBack.vue'

const route = useRoute()
const router = useRouter()
const idSurvey = ref(+route.params.id);


const goback = () => {  router.go(-1) }

</script>

<template>
    <div class="mt-5">
    <Paginator
    :idSurvey="idSurvey"
    >
        <template #header>

            <ButtonBack 
            @click="goback"
            />
                
        </template>
    </Paginator>
</div>
</template>


<style scoped></style>