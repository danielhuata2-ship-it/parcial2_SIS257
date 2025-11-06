<script setup lang="ts">
import type { NivelAcademico } from '@/models/nivel_academico'
import http from '@/plugins/axios'
import { Button, Dialog, InputText, Textarea } from 'primevue'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'niveles-academicos'
const props = defineProps({
  mostrar: Boolean,
  nivel: {
    type: Object as () => NivelAcademico,
    default: () => ({}) as NivelAcademico,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const nivel = ref<NivelAcademico>({ ...props.nivel })
watch(
  () => props.nivel,
  (newVal) => {
    nivel.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: nivel.value.nombre,
      descripcion: nivel.value.descripcion,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${nivel.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    nivel.value = {} as NivelAcademico
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Nivel Académico' : 'Crear Nivel Académico'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="nivel.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-3">Descripción</label>
        <Textarea
          id="descripcion"
          v-model="nivel.descripcion"
          class="flex-auto"
          autocomplete="off"
          rows="4"
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
        <Button
          type="button"
          label="Guardar Cambios"
          icon="pi pi-save"
          @click="handleSave"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
