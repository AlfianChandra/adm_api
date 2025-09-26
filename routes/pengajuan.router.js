import { Router } from "express";
import pengajuan from "../controllers/pengajuan.controller.js";
import { adminOnly } from "../middlewares/restrictions.middleware.js";
const router = Router();

router.post("/propose", pengajuan.propose);
router.post("/history", pengajuan.history);
router.post("/update-status", pengajuan.updateStatus);
router.post("/update-ttd", pengajuan.updateTTD);
router.post("/delete", pengajuan.deletePengajuan);

router.post("/request-return", pengajuan.requestReturn);
router.post("/return-reset", pengajuan.returnReset);

router.post("/adm/approve", adminOnly, pengajuan.admApproveProposal);
router.post("/adm/get-proposal", adminOnly, pengajuan.admGetProposals);
router.post("/adm/return/approve", pengajuan.admApproveReturn);
router.post("/adm/return/reject", pengajuan.admRejectReturn);
export default router;
