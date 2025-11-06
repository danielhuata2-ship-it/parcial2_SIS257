<script setup lang="ts">
import type { NivelAcademico } from '@/models/nivel_academico'
import type { Programa } from '@/models/programa'
import http from '@/plugins/axios'
import { Button, Dialog, InputText, Textarea, Dropdown, InputNumber, Calendar } from 'primevue'
import { computed, ref, watch, onMounted } from 'vue'

const ENDPOINT = 'programas'
const props = defineProps({
  mostrar: Boolean,
  programa: {
    type: Object as () => Programa,
    default: () => ({}) as Programa,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const niveles = ref<NivelAcademico[]>([])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const programa = ref<Programa>({ ...props.programa })

const opcionesEstado = ref([
  { label: 'En Planificación', value: 'En Planificación' },
  { label: 'En curso', value: 'En curso' },
  { label: 'Finalizado', value: 'Finalizado' },
])

async function obtenerNiveles() {
  niveles.value = await http.get('niveles-academicos').then((response) => response.data)
}

async function handleSave() {
  try {
    const body = {
      idNivelAcademico: programa.value.idNivelAcademico,
      nombre: programa.value.nombre,
      descripcion: programa.value.descripcion,
      version: programa.value.version,
      duracionMeses: programa.value.duracionMeses,
      costo: programa.value.costo,
      fechaInicio: programa.value.fechaInicio,
      estado: programa.value.estado,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${programa.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    programa.value = {} as Programa
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

onMounted(() => {
  obtenerNiveles()
})

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      if (props.programa?.id) {
        programa.value = { ...props.programa }
      } else {
        programa.value = { idNivelAcademico: 0 } as Programa
      }
    }
  },
)

watch(
  () => props.programa,
  (newVal) => {
    programa.value = { ...newVal }
  },
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Programa' : 'Crear Programa'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nivel" class="font-semibold w-3">Nivel Académico</label>
        <Dropdown
          id="nivel"
          v-model="programa.idNivelAcademico"
          :options="niveles"
          option-label="nombre"
          option-value="id"
          class="flex-auto"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="programa.nombre"
          class="flex-auto"
          autocomplete="off"
          maxlength="100"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-3">Descripción</label>
        <Textarea
          id="descripcion"
          v-model="programa.descripcion"
          class="flex-auto"
          autocomplete="off"
          rows="3"
          maxlength="2000"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="version" class="font-semibold w-3">Versión</label>
        <InputNumber id="version" v-model="programa.version" class="flex-auto" :min="1" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="duracionMeses" class="font-semibold w-3">Duración (Meses)</label>
        <InputNumber
          id="duracionMeses"
          v-model="programa.duracionMeses"
          class="flex-auto"
          :min="1"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="costo" class="font-semibold w-3">Costo</label>
        <InputNumber
          id="costo"
          v-model="programa.costo"
          class="flex-auto"
          :min="0"
          mode="decimal"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="fechaInicio" class="font-semibold w-3">Fecha Inicio</label>
        <Calendar
          id="fechaInicio"
          v-model="programa.fechaInicio"
          class="flex-auto"
          date-format="yy-mm-dd"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="estado" class="font-semibold w-3">Estado</label>
        <Dropdown
          id="estado"
          v-model="programa.estado"
          :options="opcionesEstado"
          option-label="label"
          option-value="value"
          class="flex-auto"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
