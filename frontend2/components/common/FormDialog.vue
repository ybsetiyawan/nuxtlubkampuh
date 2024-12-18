<template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
          <v-card-text>
          <v-container>
            <v-row>
              <v-col 
                v-for="field in fields" 
                :key="field.value"
                :cols="field.cols || 12"
              >
                <!-- Text Field -->
                <v-text-field
                  v-if="field.type === 'text'"
                  v-model="formData[field.value]"
                  :label="field.text"
                  :rules="field.rules"
                  :required="field.required"
                ></v-text-field>
  
                <!-- Text Area -->
                <v-textarea
                  v-else-if="field.type === 'textarea'"
                  v-model="formData[field.value]"
                  :label="field.text"
                  :rules="field.rules"
                  :required="field.required"
                ></v-textarea>
  
                <!-- Select -->
                <v-select
                  v-else-if="field.type === 'select'"
                  v-model="formData[field.value]"
                  :items="field.items"
                  :label="field.text"
                  :rules="field.rules"
                  :required="field.required"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn 
            v-if="isEditMode" 
            color="red darken-1" 
            text 
            @click="deleteItem"
            :loading="loading"
            :disabled="loading"
            >
            Hapus
          </v-btn> -->
          <v-btn color="blue darken-1" text @click="close" outlined>Batal</v-btn>
          <v-btn 
          color="blue darken-1" 
          text 
          @click="save"
          :loading="loading"
          :disabled="loading"
          outlined
          >
          Simpan
        </v-btn>
        <v-btn
          v-if="isEditMode"
          color="red darken-1"
          text
          outlined
          @click="deleteItem"
          :loading="loading"
          :disabled="loading">Hapus</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: 'FormDialog',
    props: {
      value: Boolean,
      title: {
        type: String,
        required: true
      },
      fields: {
        type: Array,
        required: true
      },
      initialData: {
        type: Object,
        default: () => ({})
      },
      loading: {
        type: Boolean,
        default: false
      },
      isEditMode: { // Mode Edit
      type: Boolean,
      default: false
      }
    },
    data() {
      return {
        formData: {}
      }
    },
    computed: {
      dialog: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      }
    },
    watch: {
      initialData: {
        immediate: true,
        handler(newData) {
          this.formData = { ...newData  }
        }
      },
      fields: {
        immediate: true,
        handler(fields) {
          // Initialize formData based on fields
          this.initializeFormData(fields)
        }
      }
    },
    methods: {

      initializeFormData(fields) {
        const data = { ...this.formData, ...this.initialData } // Salin data yang ada
        fields.forEach(field => {
          if (data[field.value] === undefined) {
            data[field.value] = '' // Tambahkan field baru jika belum ada
          }
        })
        this.formData = data
      },

      // initializeFormData(fields) {
      //   const data = {}
      //   fields.forEach(field => {
      //     data[field.value] = ''
      //   })
      //   this.formData = data
      // },
      close() {
        this.dialog = false
        this.$emit('close')
        this.resetForm()
      },
      save() {
        this.$emit('save', {...this.formData})
      },
      resetForm() {
        this.initializeFormData(this.fields)
      },
      deleteItem() {
        this.$emit('delete', { ...this.formData });
        this.dialog = false; // Tutup dialog setelah delete
      }


    }
  }
  </script>