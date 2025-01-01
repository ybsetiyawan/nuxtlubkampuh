<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab v-for="item in tabs" :key="item">{{ item }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <data-table
          ref="dataTable"
          :headers="menuHeaders"
          :items="menuItems"
          title="Data Menu"
          searchTitle="Cari Menu"
          :meta="meta"
          :fetch-data="fetchData"
          :transform-response="transformResponse"
          default-sort-by="link_menu"
          default-sort-type="ASC"
          @add-item="openAddDialog"
          @edit-item="handleEditItem"
          />
        <v-form ref="form">
          <form-dialog
            v-model="dialog"
            :title="dialogTitle"
            :fields="formFields"
            :initial-data="edit"
            :loading="loading"
            :is-edit-mode="isEditMode"
            @save="save"
            @delete="deleteItem"
            @close="closeDialog" >
            <v-text-field 
              v-for="field in formFields"
              :key="field.value"
              v-model="edit[field.value]"
              :label="field.text"
              :type="field.type"
              :rules="field.rules"
              :required="field.required"
              ></v-text-field>
          </form-dialog>
        </v-form>
      </v-tab-item>
      <v-tab-item>
        <data-table
          ref="dataTable"
          :headers="menuHeaders2"
          :items="menuItems2"
          title="Data Menu by Role"
          searchTitle="Cari Menu"
          :meta="meta"
          :fetch-data="fetchData2"
          :transform-response="transformResponse"
          default-sort-by="id_role"
          default-sort-type="ASC"
          @add-item="openAddDialog2"
          @edit-item="handleEditItem2"
          />
        <v-form ref="form2">
          <form-dialog
            v-model="dialogMenu"
            :title="dialogTitleMenu"
            :fields="formFields2"
            :initial-data="edit2"
            :loading="loading"
            :is-edit-mode="isEditMode"
            @save="save2"
            @delete="deleteItem2"
            @close="closeDialogMenu" >
            <v-text-field 
              v-for="field in formFields2"
              :key="field.value"
              v-model="edit[field.value]"
              :label="field.text"
              :type="field.type"
              :rules="field.rules"
              :required="field.required"
              ></v-text-field>
          </form-dialog>
        </v-form>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>


<script>

import menu from './menu'
import menuRole from './menuRole'
import DataTable from '@/components/common/DataTable.vue';
import FormDialog from '~/components/common/FormDialog.vue';

export default {

  mixins: [menu, menuRole],

  components: {
    DataTable,
    FormDialog,
  },

};
</script>
