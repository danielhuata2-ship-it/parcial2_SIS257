<script setup lang="ts">
import NivelAcademicoList from '@/components/nivel_academico/Nivel_AcademicoList.vue'
import NivelAcademicoSave from '@/components/nivel_academico/Nivel_AcademicoSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const nivelListRef = ref<typeof NivelAcademicoList | null>(null)
const nivelEdit = ref<any>(null)

function handleCreate() {
  nivelEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(nivel: any) {
  nivelEdit.value = nivel
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  nivelListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="mx-2 mt-6 md:m-7">
    <h2>Niveles Académicos</h2>
    <Button label="Crear Nuevo Nivel Academico" icon="pi pi-plus" @click="handleCreate" />
    <NivelAcademicoList ref="nivelListRef" @edit="handleEdit" />
    <NivelAcademicoSave
      :mostrar="mostrarDialog"
      :nivel="nivelEdit"
      :modoEdicion="!!nivelEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
