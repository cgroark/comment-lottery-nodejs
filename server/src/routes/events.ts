import { Router } from "express";
import { supabase } from "../services/supabaseClient";

const clientsRouter = Router();

clientsRouter.get("/", async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*');
    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default clientsRouter;