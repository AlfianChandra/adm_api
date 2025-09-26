// models/Form.js
import mongoose from "mongoose";

const pengajuanSchema = new mongoose.Schema(
  {
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    no_surat: {
      type: String,
      default: "",
    },
    email: { type: String, required: true, lowercase: true, trim: true },
    date: { type: String },
    day: { type: String },
    month: { type: String },
    year: { type: String },
    name: { type: String, required: true, trim: true },
    nip: { type: String, required: true, trim: true },
    penempatan: { type: String, trim: true },
    jabatan: { type: String, trim: true },
    jenis_barang: { type: String, trim: true },
    tahun_pengadaan: { type: String, trim: true },
    penempatan: { type: String, trim: true },
    ttd: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "draft"],
      default: "pending",
    },
    items: {
      type: Array,
      required: true,
      default: [],
    },
    keadaan_barang: {
      type: String,
      default: "",
    },
    kode_registrasi: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Pengajuan = mongoose.model("Pengajuan", pengajuanSchema);
export default Pengajuan;
