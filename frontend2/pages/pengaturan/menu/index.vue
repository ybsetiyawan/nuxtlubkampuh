<template>
  <v-container fluid class="menu-container">
    <v-row>
      <v-col cols="12" md="12">
        <v-tabs v-model="tab">
          <v-tab v-for="item in tabs" :key="item">{{ item }}</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
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
      <v-tab-item key="akses">
        <v-container fluid>
          <v-row>
            <v-col cols="10" md="5">
              <div style="margin-right: 12px; margin-top: 8px">
                <v-autocomplete
                  color="#01579B"
                  v-model="role_selected"
                  :items="listRole"
                  item-text="nama"
                  item-value="id"
                  label="Pilih Role . . ."
                  @change="handleRoleChange"
                  outlined
                ></v-autocomplete>
                <v-btn
                  color="green"
                  style="float: right ; margin-bottom: 5px;"
                >
                  <v-icon>mdi-plus</v-icon>
                  Menu Ke User
                </v-btn>
              </div>
            </v-col>
            <v-col
              cols="12"
              md="7"
              style="
                border-left: 1px solid #d8dbe0;
                margin-top: -10px;
                padding-left: 5px;
              "
            >
              <h3 class="pt-2 pl-5 mb-2">Data Menu User</h3>
              <p class="pl-5" v-show="role_selected == ''">
                Silakan pilih role untuk melihat data menu !
              </p>
              <div v-show="loading == true">
                <v-progress-circular
                  :width="2"
                  :size="20"
                  color="blue"
                  indeterminate
                  style="margin-top: -5px"
                ></v-progress-circular>
                &nbsp;
                <span style="font-weight: bold"
                  >Sedang Mengambil Data . . .</span
                >
              </div>
              <div v-show="loading == true">
                <v-progress-circular
                  :width="2"
                  :size="20"
                  color="blue"
                  indeterminate
                  style="margin-top: -5px"
                ></v-progress-circular>
                &nbsp;
                <span style="font-weight: bold">Loading . . .</span>
              </div>
              <transition name="fade">
                <v-treeview
                  v-show="role_selected != ''"
                  :items="listMenu"
                >
                  <template v-slot:prepend="{ item }">
                    <v-icon
                      v-if="item.classIcon"
                      v-text="`${item.classIcon}`"
                    ></v-icon>
                  </template>
                  <template v-slot:label="{ item }">
                    {{ item.nama }}
                    <div style="float: right">
                      <v-tooltip bottom v-if="item.show_button_up == true">
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            v-bind="attrs"
                            v-on="on"
                            aria-hidden="false"
                            color="teal darken-3"
                            @click="fn_menu_user_up(item)"
                          >
                            mdi-arrow-up-bold-box
                          </v-icon>
                        </template>
                        <span>Pindahkan Menu {{ item.nama }} Ke Atas</span>
                      </v-tooltip>
                      <v-tooltip bottom v-if="item.show_button_down == true">
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            v-bind="attrs"
                            v-on="on"
                            aria-hidden="false"
                            color="blue-grey darken-4"
                            @click="fn_menu_user_down(item)"
                          >
                            mdi-arrow-down-bold-box
                          </v-icon>
                        </template>
                        <span>Pindahkan Menu {{ item.nama }} Ke Bawah</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            v-bind="attrs"
                            v-on="on"
                            aria-hidden="false"
                            color="error"
                            @click="$emit('delete-menu-user', item)"
                          >
                            mdi-delete
                          </v-icon>
                        </template>
                        <span>Delete {{ item.nama }}</span>
                      </v-tooltip>
                    </div>
                  </template>
                </v-treeview>
              </transition>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
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

<style>
.menu-container {
  margin-top: -10px;
  max-height: 10px;
}

</style>