<script setup>
import { defineComponent, reactive, computed, onMounted, defineProps, createApp, h, ref } from "vue";
import TableLite from "vue3-table-lite";
import axios from 'axios';
import Entorno from '@/function/entorno'
import Database from "@/function/database";
import ModalUpdateField from '@/components/modal/updateField.vue'
import buttonsGrouping from "../buttons_grouping/buttonsGrouping.vue";
const { RUTA } = Entorno();

let data = reactive([]);
const searchQuestions = ref(""); // Search text
const searchAnswer = ref(""); // Search text
let rowClick = reactive([])
const openModal = ref(false)
const textGrouping = ref("")

const isgrouping = computed(()=>{
  return textGrouping.value
})
const props = defineProps({
  idSurvey: {
    type: Number,
    required: true
  },
})

const table = reactive({
  isLoading: false,
  groupingKey: isgrouping,
  columns: [
    {
      label: "Id",
      field: "Id",
      width: "3%",
      sortable: true,
      isKey: true,
    },
    {
      label: "Pregunta",
      field: "TextoPregunta",
      width: "10%",
      sortable: true,
    },
    {
      label: "Respuesta",
      field: "TextoRespuesta",
      width: "15%",
      sortable: true,
    },

    {
      label: "Fecha",
      field: "FechaRespuesta",
      width: "5%",
      sortable: true,
    },

    {
      label: "Puntaje obtenido",
      field: "Score",
      width: "1%",
      sortable: false,
      columnStyles: { background: "gray" },
    },
  ],
  totalRecordCount: 0,
  sortable: {
    order: "id",
    sort: "desc",
  },
});


const initTable = ({ el: tableComponent }) => {
  let headerTr = tableComponent.getElementsByClassName("vtl-thead-tr");
  if (!headerTr[0]) {
    return;
  }
  let cloneTr = headerTr[0].cloneNode(true); // Clone first <tr>
  let childTh = cloneTr.getElementsByClassName("vtl-thead-th");
  for (let i = 0; i < childTh.length; i++) {
    // Clear <th>'s HTML
    childTh[i].innerHTML = "";
  }

  // Create a input element and append to first <th>
  createApp(
    defineComponent({
      setup() {
        return () =>
          h("input", {
            value: searchQuestions.value,
            onInput: (e) => {
              searchQuestions.value = e.target.value;
              table.rows = data["data"]["body"].filter(
                (x) =>
                  x.TextoPregunta.toLowerCase().includes(searchQuestions.value.toLowerCase())
              );
            },
          });
      },
    })
  ).mount(childTh[1]);

  createApp(
    defineComponent({
      setup() {
        return () =>
          h("input", {
            value: searchAnswer.value,
            onInput: (e) => {
              searchAnswer.value = e.target.value;
              table.rows = data["data"]["body"].filter(
                (x) =>
                  x.TextoRespuesta.toLowerCase().includes(searchAnswer.value.toLowerCase())
              );
            },
          });
      },
    })
  ).mount(childTh[2]);

  // append cloned element to the header after first <tr>
  headerTr[0].after(cloneTr)
};

const doSearch = async (offset, limit, order, sort) => {

  table.isLoading = true;

  table.isReSearch = offset == undefined ? true : false;

  const params = {
    offset: offset,
    limit: limit,
    order: order,
    sort: sort,
    paramWhere: { IdEncuesta: props?.idSurvey }
  }

  const total_rows = await getTotalRows({ params: params });
  data = await getRestApi({ params: params });

  // if (offset >= 10 || limit >= 20) {
  //   limit = 20;
  // }
  //     if (sort == "asc") {
  //       table.rows = sampleData1(offset, limit);
  //     } else {
  //   //    table.rows = sampleData2(offset, limit);
  //     }
  table.rows = data["data"]["body"];
  table.totalRecordCount = total_rows["data"]["body"][0].Count;
  table.sortable.order = order;
  table.sortable.sort = sort;


};

const getRestApi = (async ({ params }) => {

  // Start use axios to get data from Server
  let url = `${RUTA}/Response/paginator`;
  let resp
  let data = await axios.get(url, { params })
    .then((response) => {

      resp = response
    });

  return resp
})


const getTotalRows = (async ({ params }) => {

  // Start use axios to get data from Server
  let url = `${RUTA}/Response/paginator/totalRows`;
  let resp
  let data = await axios.get(url, { params })
    .then((response) => {

      resp = response
    });

  return resp
})


// First get data
doSearch(0, 10, "id", "desc");


const rowClicked = (row) => {

  rowClick = row
  openModal.value = true

}

const closeModal = () => openModal.value = false

const groupTable = (value) => textGrouping.value = value

</script>

<template>
  <div>
    <ModalUpdateField :row="rowClick" :openModal=openModal @closeModal="closeModal" />

    <slot name="header"></slot>

    <!-- <div class="card coupons">
      <label class="title">Apply coupons</label>
      <form class="form">
        <input type="text" placeholder="Apply your coupons here" class="input_field">
        <button>Apply</button>
      </form>
    </div> -->
    <buttonsGrouping 
    @grouping = groupTable
    />

    <table-lite :is-loading="table.isLoading" :grouping-key="table.groupingKey" :columns="table.columns"
      :rows="table.rows" :total="table.totalRecordCount" :sortable="table.sortable" :messages="table.messages"
      @do-search="doSearch" @is-finished="table.isLoading = false" @row-clicked="rowClicked"
      @VnodeMounted="initTable"></table-lite>
  </div>
</template>

<style scoped>
::v-deep(.vtl-group-td) {
  color: #fff;
  background-color: #12408E;
  border-color: #0D6EFD;
}

.card {
  width: 400px;
  background: #FFFFFF;
  box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
}

.title {
  width: 100%;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid #efeff3;
  font-weight: 700;
  font-size: 11px;
  color: #63656b;
}

/* cart */
.cart {
  border-radius: 19px 19px 7px 7px;
}

.coupons {
  border-radius: 7px;
}

.coupons form {
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: 10px;
  padding: 10px;
}

.input_field {
  width: auto;
  height: 36px;
  padding: 0 0 0 12px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #e5e5e5;
  filter: drop-shadow(0px 1px 0px #efefef) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.input_field:focus {
  border: 1px solid transparent;
  box-shadow: 0px 0px 0px 2px #242424;
  background-color: transparent;
}

.coupons form button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 18px;
  gap: 10px;
  width: 100%;
  height: 36px;
  background: linear-gradient(180deg, #4480FF 0%, #115DFC 50%, #0550ED 100%);
  box-shadow: 0px 0.5px 0.5px #EFEFEF, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
  border-radius: 5px;
  border: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
}
</style>