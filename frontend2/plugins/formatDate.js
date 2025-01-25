import Vue from "vue";

// Tidak perlu async karena ini operasi sinkron
export function formatDate(date) {
    return date ? new Date(date).toLocaleDateString('ID') : '-';
}

// Menambahkan $formatDate ke prototype Vue
Vue.prototype.$formatDate = formatDate;
