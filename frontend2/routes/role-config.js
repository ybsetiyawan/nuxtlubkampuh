// HA01 = SUPERADMIN
// HA02 = CUSTOMER

export default {
    '/master/customer': ['HA01'], 
    '/dashboard': ['HA01', 'HA02'],
    '/pengaturan/menu': ['HA01'],  
    '/pengaturan/user': ['HA01'],  
    '/pengaturan/role': ['HA01'],  
  };
  