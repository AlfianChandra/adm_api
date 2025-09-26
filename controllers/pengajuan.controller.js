import Pengajuan from "../models/pengajuan.model.js";
const pengajuanBuilder = () => {
  const propose = async (req, res) => {
    try {
      let data = req.body;
      data["id_user"] = req.user.id;
      data["status"] = "pending";
      const newPengajuan = new Pengajuan(data);
      await newPengajuan.save();
      return res.status(201).json({
        message: "Pengajuan berhasil dibuat",
        payload: newPengajuan,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  const history = async (req, res) => {
    try {
      const { status } = req.body;
      const idUser = req.user.id;

      if (status === "all") {
        const list = await Pengajuan.find({ id_user: idUser }).sort({
          createdAt: -1,
        });
        return res.status(200).json({
          message: "History pengajuan berhasil diambil",
          payload: list,
        });
      } else {
        const list = await Pengajuan.find({ id_user: idUser, status }).sort({
          createdAt: -1,
        });
        return res.status(200).json({
          message: "History pengajuan berhasil diambil",
          payload: list,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  const updateStatus = async (req, res) => {
    try {
      const { _id, status } = req.body;
      if (status !== "pending" && status !== "draft") {
        return res.status(400).json({ message: "Status tidak valid" });
      }
      const updated = await Pengajuan.findByIdAndUpdate(
        _id,
        { status },
        { new: true }
      );
      return res.status(200).json({
        message: "Status pengajuan berhasil diupdate",
        payload: updated,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  const updateTTD = async (req, res) => {
    try {
      const { _id, ttd } = req.body;
      const updated = await Pengajuan.findByIdAndUpdate(
        _id,
        { ttd },
        { new: true }
      );
      return res.status(200).json({
        message: "TTD pengajuan berhasil diupdate",
        payload: updated,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  const deletePengajuan = async (req, res) => {
    try {
      const { _id } = req.body;
      await Pengajuan.findByIdAndDelete(_id);
      return res.status(200).json({
        message: "Pengajuan berhasil dihapus",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  const admGetProposals = async (req, res) => {
    try {
      const { status } = req.body;
      if (status === "all") {
        const list = await Pengajuan.find().sort({ createdAt: -1 });
        return res.status(200).json({
          message: "List pengajuan berhasil diambil",
          payload: list,
        });
      } else {
        const list = await Pengajuan.find({ status }).sort({ createdAt: -1 });
        return res.status(200).json({
          message: "List pengajuan berhasil diambil",
          payload: list,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  const admApproveProposal = async (req, res) => {
    try {
      const { _id, ...filters } = req.body;
      const status = "approved";
      const updated = await Pengajuan.findByIdAndUpdate(
        _id,
        { ...filters, status },
        { new: true }
      );
      return res.status(200).json({
        message: "Pengajuan berhasil difinalisasi",
        payload: updated,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  const requestReturn = async (req, res) => {
    try {
      const { id_proposal, id_item, ...return_data } = req.body;
      const pengajuan = await Pengajuan.findById(id_proposal);
      if (!pengajuan) {
        return res.status(404).json({ message: "Pengajuan tidak ditemukan" });
      }

      const itemIndex = pengajuan.items.findIndex(
        (item) => item._id.toString() === id_item
      );
      if (itemIndex === -1) {
        return res.status(404).json({ message: "Item tidak ditemukan" });
      }

      pengajuan.items[itemIndex].return_data.proposal_data = return_data;
      pengajuan.items[itemIndex].return_data.status = "pending";
      pengajuan.markModified("items");
      await pengajuan.save();
      return res.status(200).json({
        message: "Request return berhasil dibuat",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  const admApproveReturn = async (req, res) => {
    try {
      const { id_proposal, id_item, ...approver_data } = req.body;
      const pengajuan = await Pengajuan.findById(id_proposal);
      if (!pengajuan) {
        return res.status(404).json({ message: "Pengajuan tidak ditemukan" });
      }
      const itemIndex = pengajuan.items.findIndex(
        (item) => item._id.toString() === id_item
      );
      if (itemIndex === -1) {
        return res.status(404).json({ message: "Item tidak ditemukan" });
      }
      pengajuan.items[itemIndex].return_data.approver_data = approver_data;
      pengajuan.items[itemIndex].return_data.status = "approved";
      pengajuan.markModified("items");
      await pengajuan.save();
      return res.status(200).json({
        message: "Return barang berhasil disetujui",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  const admRejectReturn = async (req, res) => {
    try {
      const { id_proposal, id_item, rejection_reason } = req.body;
      const pengajuan = await Pengajuan.findById(id_proposal);
      if (!pengajuan) {
        return res.status(404).json({ message: "Pengajuan tidak ditemukan" });
      }

      const itemIndex = pengajuan.items.findIndex(
        (item) => item._id.toString() === id_item
      );

      if (itemIndex === -1) {
        return res.status(404).json({ message: "Item tidak ditemukan" });
      }

      pengajuan.items[itemIndex].return_data.status = "rejected";
      pengajuan.items[itemIndex].return_data.rejection_reason =
        rejection_reason;
      pengajuan.markModified("items");
      await pengajuan.save();
      return res.status(200).json({
        message: "Return barang berhasil ditolak",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  const returnReset = async (req, res) => {
    try {
      const { id_proposal, id_item } = req.body;
      const pengajuan = await Pengajuan.findById(id_proposal);
      if (!pengajuan) {
        return res.status(404).json({ message: "Pengajuan tidak ditemukan" });
      }

      const itemIndex = pengajuan.items.findIndex(
        (item) => item._id.toString() === id_item
      );

      if (itemIndex === -1) {
        return res.status(404).json({ message: "Item tidak ditemukan" });
      }

      if(pengajuan.items[itemIndex].return_data.status !== "rejected"){
        return res.status(400).json({ message: "Hanya request yang ditolak yang bisa direset" });
      }

      pengajuan.items[itemIndex].return_data.status = "idle";
      pengajuan.items[itemIndex].return_data.rejection_reason = "";
      pengajuan.items[itemIndex].return_data.proposal_data = {
        name: "",
        nip: "",
        jabatan: "",
        email: "",
        date: "",
        ttd: "",
      }

      pengajuan.items[itemIndex].return_data.approver_data = {
        no: "",
        kode_registrasi: "",
        keadaan_barang: "",
      }

      pengajuan.markModified("items");
      await pengajuan.save();
      return res.status(200).json({
        message: "Request return berhasil direset",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };

  return {
    propose,
    history,
    updateStatus,
    updateTTD,
    deletePengajuan,
    admGetProposals,
    admApproveProposal,
    requestReturn,
    admApproveReturn,
    admRejectReturn,
  };
};

const pengajuan = pengajuanBuilder();
export default pengajuan;
