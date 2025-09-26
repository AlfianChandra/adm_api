import Barang from "../models/barang.model.js";
const inventBuilder = () => {
  const addInvent = async (req, res) => {
    try {
      const { nama, kode_aset, jenis, stok, sub_jenis } = req.body;
      //Check existing
      const existing = await Barang.findOne({ kode_aset });
      if (existing) {
        return res.status(400).json({ message: "Barang sudah ada!" });
      }

      const barang = new Barang({ nama, kode_aset, jenis, sub_jenis, stok });
      await barang.save();
      return res.status(201).json({ message: "Disimpan!", payload: barang });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  const getInvents = async (req, res) => {
    try {
      const { searchKey } = req.body;
      let filter = {};
      if (searchKey) {
        filter = {
          $or: [
            { nama: { $regex: searchKey, $options: "i" } },
            { kode_aset: { $regex: searchKey, $options: "i" } },
            { jenis: { $regex: searchKey, $options: "i" } },
          ],
        };
      }

      const barangs = await Barang.find(filter).sort({ createdAt: -1 });
      return res.status(200).json({ message: "Berhasil", payload: barangs });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  const deleteInvent = async (req, res) => {
    try {
      const { _id } = req.body;
      await Barang.findByIdAndDelete(_id);
      return res.status(200).json({ message: "Berhasil dihapus" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  const updateInvent = async (req, res) => {
    const { _id, ...updateFilters } = req.body;
    try {
      const update = await Barang.findByIdAndUpdate(_id, updateFilters, {
        new: true,
      });
      return res
        .status(200)
        .json({ message: "Berhasil diupdate", payload: update });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    addInvent,
    getInvents,
    deleteInvent,
    updateInvent,
  };
};

const invent = inventBuilder();
export default invent;
