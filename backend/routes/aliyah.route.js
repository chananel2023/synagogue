import express from "express";
import { 
    markAliyahAsPaid, 
    deleteAliyah, 
    addAliyahToUser,
    
    getAliyahFrom,
    
    getUserAliyah,
    getAllUsersAliyah
} from "../controllers/aliyaht.controller.js";

const router = express.Router();

router.post("/addAliyahToUser",addAliyahToUser)
// נתיב לעדכון עלייה לסטטוס שולם
router.put("/mark-paid", markAliyahAsPaid);

// נתיב למחיקת עלייה
router.delete("/delete", deleteAliyah);
router.get("/all",getUserAliyah)
router.get("/",getAliyahFrom)
router.get('/getAllUsersAliyah' ,getAllUsersAliyah)

export default router;
 