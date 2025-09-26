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
    },
    items: [
      {
        inv: {
          nama: {
            type: String,
            default: "",
          },
          kode_aset: {
            type: String,
            default: "",
          },
          jenis: {
            type: String,
            default: "",
          },
          sub_jenis: {
            type: String,
            default: "",
          },
        },
        qty: {
          type: Number,
          default: 1,
        },
        return_data: {
          proposal_data: {
            name: { type: String, default: "" },
            nip: { type: String, default: "" },
            jabatan: { type: String, default: "" },
            email: { type: String, default: "" },
            date: { type: String, default: "" },
            day: { type: String },
            month: { type: String },
            year: { type: String },
          },
          approver_data: {
            no: { type: String, default: "" },
            kode_registrasi: { type: String, default: "" },
            keadaan_barang: { type: String, default: "" },
          },
          status: { type: String, enum: ["pending", "approved", "rejected"] },
        },
      },
    ],
    keadaan_barang: {
      type: String,
      default: "",
    },

    kode_registrasi: {
      type: String,
      default: "",
    },
    rejection_reason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Pengajuan = mongoose.model("Pengajuan", pengajuanSchema);
export default Pengajuan;
