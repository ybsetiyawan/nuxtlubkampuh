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
                  @click="dialogMenuUser = true"
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
                      <!-- <v-tooltip bottom>
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
                      <v-tooltip bottom>
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
                      </v-tooltip> -->
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            v-bind="attrs"
                            v-on="on"
                            aria-hidden="false"
                            color="error"
                            @click="deleteMenuUser(item)"
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

        <v-dialog v-model="dialogMenuUser" scrollable max-width="700px">
        <v-card>
          <v-card-title
            style="color: #5cb270; padding-top: 12px; padding-bottom: 12px"
          >
            <span style="font-size: 20px; padding-right: 10px">{{
              formTitle
            }}</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="closeFormMenuUser()" style="color: white">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form
              onSubmit="return false"
              ref="formAkses"
              v-model="valid"
              lazy-validation
            >
              <div style="padding: 30px 15px 15px 15px">
                <v-alert
                  text
                  outlined
                  color="#5cb270"
                  icon="mdi-information-outline"
                >
                  Anda akan menambahkan menu untuk
                  <strong>Role : {{ getRoleName(role_selected) }}</strong>
                </v-alert>
                <br />
                <v-layout row>
                  <v-flex xs12 sm12 md3>
                    <v-subheader>Level Menu :</v-subheader>
                  </v-flex>
                  <v-flex xs12 sm8 md8>
                    <v-select
                      color="#5cb270"
                      v-model="level"
                      :items="list_level"
                      label="Pilih Level . . ."
                      @change="parent_selected = ''"
                      outlined
                    />
                  </v-flex>
                </v-layout>
                <v-layout row v-show="level != '' && level != null">
                  <v-flex xs12 sm12 md3>
                    <v-subheader>Posisi :</v-subheader>
                  </v-flex>
                  <v-flex xs12 sm8 md8>
                    <v-select
                      color="#5cb270"
                      v-model="posisi"
                      :items="list_posisi"
                      label="Pilih Posisi . . ."
                      outlined
                    />
                  </v-flex>
                </v-layout>
                <v-layout row v-show="level != '' && level != null && level != 1">
                  <v-flex xs12 sm12 md3>
                    <v-subheader>Parent :</v-subheader>
                  </v-flex>
                  <v-flex xs12 sm8 md8>
                    <v-autocomplete
                      color="#5cb270"
                      v-model="parent_selected"
                      :items="list_menu"
                      outlined
                      chips
                      label="Pilih Parent Menu"
                      item-text="namaMenu"
                      item-value="id"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          color="#5cb270"
                          v-bind="data.attrs"
                          :input-value="data.selected"
                          close
                        >
                        
                          <v-avatar left>
                            <v-icon>{{ data.item.classIcon }}</v-icon>
                          </v-avatar>
                          {{ data.item.namaMenu }}
                        </v-chip>
                      </template>
  
                      <template slot="item" slot-scope="data">
                        <template v-if="data.item !== 'object'">
                          <v-list-item-avatar>
                            <v-icon>
                              {{ data.item.classIcon }}
                            </v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="data.item.namaMenu"
                            ></v-list-item-title>
                            <v-list-item-subtitle>
                              Link:
                              {{ data.item.linkMenu ? data.item.linkMenu : "" }} -
                              Ket:
                              {{
                                data.item.keterangan ? data.item.keterangan : ""
                              }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </template>
                        <template v-else>
                          <v-list-item-content
                            v-text="data.item"
                          ></v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>
  
                
                <v-layout row v-show="level != '' && level != null">
                  <v-flex xs12 sm12 md3>
                    <v-subheader>Menu :</v-subheader>
                  </v-flex>
                  <v-flex xs12 sm8 md8>
                    <v-autocomplete
                      color="#5cb270"
                      v-model="menu_selected"
                      :items="list_menu"
                      outlined
                      chips
                      label="Pilih Menu"
                      item-text="namaMenu"
                      item-value="id"
                      multiple
                    >
                   
                      <template v-slot:selection="data">
                        <v-chip
                          v-bind="data.attrs"
                          :input-value="data.selected"
                          close
                          @click="data.select"
                          @click:close="remove(data.item)"
                        >
                          <v-avatar left>
                            <v-icon>{{ data.item.classIcon }}</v-icon>
                          </v-avatar>
                          {{ data.item.namaMenu }}
                        </v-chip>
                      </template>
  
                      <template slot="item" slot-scope="data">
                        <template v-if="data.item !== 'object'">
                          <v-list-item-avatar>
                            <v-icon>
                              {{ data.item.classIcon }}
                            </v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="data.item.namaMenu"
                            ></v-list-item-title>
                            <v-list-item-subtitle>
                              Link:
                              {{ data.item.linkMenu ? data.item.linkMenu : "" }} -
                              Ket:
                              {{
                                data.item.keterangan ? data.item.keterangan : ""
                              }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </template>
                        <template v-else>
                          <v-list-item-content
                            v-text="data.item"
                          ></v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>

              </div>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <div class="ml-auto">
              <v-btn
                color="orange"
                @click="saveMenuUserValidate()"
                 :disabled="!role_selected"
              >
                Simpan
              </v-btn>
              <v-btn color="error" @click="closeFormMenuUser()"> Batal </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>


<script>
import menuService from './menuServices'
import DataTable from '@/components/common/DataTable.vue';
import FormDialog from '~/components/common/FormDialog.vue';
import menuComponent from './menuComponent';

export default {

  mixins: [menuService, menuComponent],

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