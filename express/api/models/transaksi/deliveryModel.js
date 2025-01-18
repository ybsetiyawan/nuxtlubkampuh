const formatDeliveryAll = (delivery) => ({
    id: delivery.id,
    docNo: delivery.doc_no,
    tanggalKirim: delivery.tanggal_kirim,
    idCustomer: delivery.id_customer,
    keterangan: delivery.keterangan,
    isStatus: delivery.is_status,
    createdAt: delivery.created_at,
    createdBy: delivery.created_by,
    updatedAt: delivery.updated_at,
    updatedBy: delivery.updated_by,
    isDeleted: delivery.is_deleted || false,
  });
  
  module.exports = { formatDeliveryAll };
  