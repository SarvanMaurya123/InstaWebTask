import { Router } from "express";

import {
  createLead,
 
} from "../controller/leads/createleads";
import { getAllLeads } from "../controller/leads/getleads";
import { searchLeads } from "../controller/leads/searchLeads";
import { getLeadStats } from "../controller/leads/getLeadStats";
import { getLeadById } from "../controller/leads/getLeadById";
import { updateLead } from "../controller/leads/updateLead";
import { deleteLead } from "../controller/leads/deleteLead";
import { protect } from "../utiles/auth.middleware";

const router = Router();

router.post("/create",protect, createLead);

router.get("/get",protect, getAllLeads);

router.get("/search", protect, searchLeads);

router.get("/stats",protect,  getLeadStats);

router.get("/:id", protect, getLeadById);

router.put("/:id", protect, updateLead);

router.delete("/:id", protect, deleteLead);

export default router;