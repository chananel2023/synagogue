import express from "express";
import {
    markAliyahAsPaid,
    deleteAliyah,
    addAliyahToUser,
    getAliyahFrom,
    getUserAliyah,
    getAllUsersAliyah,
    payAliyot,
    getUnpaidAliyot
} from "../controllers/aliyaht.controller.js";

const router = express.Router();

router.post("/addAliyahToUser", addAliyahToUser);
router.put("/mark-paid", markAliyahAsPaid);
router.delete("/delete", deleteAliyah);
router.get("/all", getUserAliyah);
router.get("/", getAliyahFrom);
router.get("/getAllUsersAliyah", getAllUsersAliyah);
router.post("/getUnpaidAliyot", getUnpaidAliyot);
router.post("/payAliyot", payAliyot);  // תיקנתי את זה

export default router;