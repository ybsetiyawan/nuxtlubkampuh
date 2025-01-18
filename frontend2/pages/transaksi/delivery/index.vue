<template>
    <v-app>
      <div class="sales-container">
        <div class="card">
          <div class="flex-container">
            <h4>Delivery Process</h4>
            <v-spacer></v-spacer>
            <button type="submit" @click="buttonEnabled" :disabled="isButtonEnabled" class="new-button">New</button>
          </div>
          <div class="form-group flex-container"></div>
          <v-divider />
          <div class="form-group flex-container">
            <div>
              <label for="tanggal">Tanggal kirim :</label>
              <input type="date" id="tanggal" class="input-field" />
            </div>
            <v-divider vertical />
            <div class="flex-item">
              <label for="keterangan">Keterangan :</label>
              <input type="text" id="keterangan" autocomplete="off" class="input-field"
                :disabled="!isButtonEnabled" />
            </div>
            <v-divider vertical />
            <div class="flex-item-button">
              <!-- <label for="search"></label> -->
              <v-btn small elevation="7" class="input-field option-button" @click="dialog = true" :disabled="!isSearchButtonEnabled">
                <v-icon  elevation="7" title="search">mdi-magnify</v-icon>
              </v-btn>
            </div>
            <div class="flex-item-button">
              <!-- <label for="save"></label> -->
              <v-btn small elevation="7" class="input-field option-button" @click="saveTransaction" :disabled="!isSaveButtonEnabled">
                <v-icon  elevation="7" title="save">mdi-content-save</v-icon>
              </v-btn>
            </div>
            <div class="flex-item-button">
              <!-- <label for="cancel"></label> -->
              <v-btn small elevation="7" class="input-field option-button" @click="">
                <v-icon elevation="7" title="cancel">mdi-refresh</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <div class="card">
          <h4>Selected materials</h4>
          <v-divider/>
         
  
        </div>
      </div>
     
    </v-app>
  </template>
<script>
export default{
    data() {
        return{
            dialog : false,
            isButtonEnabled: false,
        }
    },
    methods:{
        buttonEnabled() {
        this.isButtonEnabled = true;
      },
      isSaveButtonEnabled() {
        return this.selectedItems.length > 0;
      },
      isSearchButtonEnabled() {
        return this.transaction.keterangan;
      },


      async saveTransaction() {
        console.log('save transaksi')
      }
    }
}
</script>

<style scoped>
.card {
  background-color: #fff;
  /* border-radius: 8px; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 20px;
}

.card h2 {
  margin-top: 0;
  color: #333;
}

.item-list,
.selected-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* .item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
} */

/* .item button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
} */

.item button:hover {
  background-color: #0056b3;
}

.flex-container {
  display: flex;
  gap: 10px;
}

.flex-item {
  flex: 1;
}

.form-group {
  margin-top: 15px;
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 12px;
  /* Adjust the font size */
  margin: 0;
  /* Adjust the margin */
}

.form-group input {
  width: 100%;
  padding: 4px;
  /* Adjust the padding */
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
  /* Adjust the font size */
  height: 25px;
  /* Adjust the height */
}

.input-field {
  margin-top: 10px;
}

.qty {
  max-width: 50px
}

.cart-body {
  font-size: 12px;
}

.texthargajual {
  background-color: #dcdee0;
}

.flex-item-button {
  margin-top: 15px;
}

.new-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  height: 25px;
  width: 50px;
  font-size: 15px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.new-button:disabled {
  background-color: #cccccc93;
  cursor: not-allowed
}

.new-button:hover:enabled {
  background-color: green;
}

.search {
  margin-left: 480px;
  margin-bottom: 30px;
  max-width: 700px;

}

.scrollable-table-body {
  display: block;
  max-height: 250px;
  /* Adjust the height as needed */
  overflow-y: auto;
}

/* Ensure the table headers align with the scrollable body */
.small-table thead,
.small-table tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

.small-table tbody {
  display: block;
}
</style>