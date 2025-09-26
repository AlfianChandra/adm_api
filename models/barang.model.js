import mongoose from "mongoose";
const barangSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  kode_aset: {
    type: String,
    required: true,
    unique: true,
  },
  jenis: {
    type: String,
    required: true,
    enum: ["Elektronik", "Furniture", "ATK", "Lainnya"],
  },
  sub_jenis: {
    type: String,
    required: true,
  },
  stok: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});

export const Barang = mongoose.model("Barang", barangSchema);
export default Barang;
