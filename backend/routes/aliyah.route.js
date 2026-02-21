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
import { verifyToken, verifyAdmin } from '../middleware/verifyToken.js';

const router = express.Router();

router.get("/", verifyToken, getAliyahFrom);
router.get("/all", verifyToken, getUserAliyah);
router.get("/getAllUsersAliyah", verifyToken, verifyAdmin, getAllUsersAliyah);
router.post("/addAliyahToUser", verifyToken, verifyAdmin, addAliyahToUser);
router.post("/getUnpaidAliyot", verifyToken, verifyAdmin, getUnpaidAliyot);
router.post("/payAliyot", verifyToken, payAliyot);
router.put("/mark-paid", verifyToken, verifyAdmin, markAliyahAsPaid);
router.delete("/delete", verifyToken, verifyAdmin, deleteAliyah);

export default router;
