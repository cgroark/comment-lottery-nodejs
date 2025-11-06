import { Router } from 'express';
import { supabase } from '../services/supabaseClient';
import type { client } from '../../../frontend/src/types/types';

const clientsRouter = Router();

clientsRouter.get('/', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*');
    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

clientsRouter.post('/', async (req, res ) => {
  try {
    const clientItem: client = req.body;

    if (!clientItem.name) {
      return res.status(400).json({
        code: 'MISSING_NAME',
        error: 'Name is required',
      });
    }

    const { data, error } = await supabase
      .from('clients')
      .insert([clientItem])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);

  } catch (err: any) {
    if (err.message?.includes('duplicate key value')) {
      return res.status(409).json({
        code: 'DUPLICATE_CLIENT',
        error: 'This client already exists.',
      });
    }

    res.status(500).json({
      code: 'INTERNAL_ERROR',
      error: err.message || 'Something went wrong while saving the client.',
    });
  }
});

clientsRouter.delete('/:id', async (req, res ) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        code: 'MISSING_ID',
        error: 'Id is required',
      });
    }

    const { data, error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);

  } catch (err: any) {
    res.status(500).json({
      code: 'INTERNAL_ERROR',
      error: err.message || 'Unable to delete client at this time.',
    });
  }
})

clientsRouter.patch('/:id', async (req, res ) => {
  try {
    const { id } = req.params;
    const clientItem: Partial<client> = req.body;

    if (!id) {
      return res.status(400).json({
        code: 'MISSING_ID',
        error: 'ID is required',
      });
    }

    const { data, error } = await supabase
      .from('clients')
      .update([clientItem])
      .eq('id', id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        error: 'Movie not found',
      });
    }
    res.status(201).json(data[0]);

  } catch (err: any) {
    res.status(500).json({
      code: 'INTERNAL_ERROR',
      error: err.message || 'Error saving this movie.',
    });
  }
});

export default clientsRouter;