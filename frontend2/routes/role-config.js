// HA01 = SUPERADMIN
// HA02 = CUSTOMER

export default {
    '/dashboard': ['HA01', 'HA02'],
    
    '/master/customer': ['HA01'], 
    '/master/material': ['HA01'], 
    
    '/pengaturan/menu': ['HA01'],  
    '/pengaturan/user': ['HA01'],  
    '/pengaturan/role': ['HA01'], 

    '/transaksi/delivery': ['HA02'],  
    '/transaksi/afterdelivery': ['HA01'],

  };
  