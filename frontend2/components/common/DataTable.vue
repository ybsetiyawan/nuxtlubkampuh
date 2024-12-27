<template>
  <v-container fluid>
    <v-card>
    <v-card-text class="py-5">
    <!-- <v-toolbar-title style="color: white">{{title}}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical/>
        <v-spacer/> -->
    <v-data-table class="table"
      :headers="headers"
      :items="tableItems"
      :items-per-page="tableMeta.limitPerPage"
      :server-items-length="tableMeta.totalItems"
      :footer-props="footerProps"
      :no-data-text="noDataText"
      @update:options="handleUpdate"
      @click:row="handleRowClick"
    >
    
    <template v-slot:[`item.no`]="{ item, index }">
      {{ (tableMeta.currentPage - 1) * tableMeta.limitPerPage + index + 1 }}.
    </template>
    <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: white">{{
            title
          }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="filter.q"
            @input="handleSearch"
            text
            solo
            flat
            hide-details
            clearable
            class="mr-2"
            append-icon="mdi-magnify"
            color="white"
            :placeholder="searchTitle"
          >
          </v-text-field>
          <v-btn icon @click="loadData">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn icon @click="$emit('add-item')">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-for="(_, slotName) in $slots" v-slot:[slotName]="scope">
        <slot :name="slotName" v-bind="scope"></slot>
      </template>
    </v-data-table>
    </v-card-text>
    </v-card>
  </v-container>
  </template>
  <script>
  export default {
    name: 'DataTable',
    emits: ['add-item', 'edit-item'],
    props: {
      headers: {
        type: Array,
        required: true
      },
      footerProps: {
        type: Object,
        default: () => ({
          'items-per-page-options': [8, 16, 24, 32 ],
        })
      },
      title: {
        type: String,
        default: ''
      },
      searchTitle: {
        type: String,
        default: ''
      },
      noDataText: {
        type: String,
        default: 'Tidak ada data yang tersedia'
      },
      fetchData: {
        type: Function,
        required: true
      },
      transformResponse: {
        type: Function,
        required: true
      },
      defaultSortBy: {
      type: String,
      default: ''
      },
      defaultSortType: {
      type: String,
      default: 'ASC'
      }
    },
    data() {
      return {
        filter: {
          q: '',
          pageSize: 10,
          pageNumber: 1,
          sortBy: this.defaultSortBy,
          sortType: this.defaultSortType
      },
      loading: false,
      searchTimeout: null,
      tableItems: [],
      tableMeta: {}
     }
    },
    async mounted() {
      await this.loadData();
    },
    methods: {
       // Dipanggil setiap kali user mengetik di search field
    handleSearch(value) {
      // Clear timeout yang ada untuk menghindari multiple requests
      // search minim 4 karakter
      if (value && value.length < 4) return;
      clearTimeout(this.searchTimeout);
      // Tunggu 500ms setelah user selesai mengetik
      this.searchTimeout = setTimeout(async () => {
        await this.loadData(1); // Reset ke halaman 1 dan load data
      }, 500);
    },

    async loadData() {
      try {
        this.$root.$emit('start-loading'); // Tampilkan garis loading
        // this.loading = true;
        // Kirim parameter search ke parent component
        // console.log('Searching with filter:', this.filter);
        const response = await this.fetchData(this.filter);
        const transformed = this.transformResponse(response);
        this.tableItems = transformed.items;
        this.tableMeta = transformed.meta;
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        // this.loading = false;
        this.$root.$emit('stop-loading'); // Sembunyikan garis loading
      }
    
    },
    // Handle perubahan sorting
    handleSort({ sortBy, sortDesc }) {
      if (sortBy.length === 0) return;
      this.filter.sortBy = sortBy[0];
      this.filter.sortType = sortDesc[0] ? 'DESC' : 'ASC';
      this.loadData();
    },
    // Handle perubahan halaman atau items per page
    handleUpdate({ page, itemsPerPage, sortBy, sortDesc  }) {
      this.filter.pageNumber = page;
      this.filter.pageSize = itemsPerPage;
      if (sortBy && sortBy.length > 0) {
        this.filter.sortBy = sortBy[0];
        this.filter.sortType = sortDesc[0] ? 'DESC' : 'ASC';
      }
      this.loadData();
    },

     // Tambahkan method untuk reset pencarian
     resetSearch() {
      this.filter.q = '';
      this.filter.pageNumber = 1;
      this.loadData();
    },
    handleRowClick(item) {
      this.$emit('edit-item', item);
    }


    }
  }
  </script>

<style scoped>
.v-data-table >>> .v-data-table__progress .v-progress-linear__determinate,
.v-data-table >>> .v-data-table__progress .v-progress-linear__indeterminate {
  background-color: rgb(0, 255, 106) !important;
}
.v-data-table.table {
  border: thin solid rgba(255, 251, 251, 0.12);
}

.v-data-table.table >>> td {
  border: thin solid rgba(255, 251, 251, 0.12);
}

.v-data-table.table >>> th {
  border: thin solid rgba(255, 251, 251, 0.12);
}
.v-card {
  width: 100%;
}

.v-card-text {
  width: 100%;
  padding: 16px !important; /* Sesuaikan padding sesuai kebutuhan */
}

</style>