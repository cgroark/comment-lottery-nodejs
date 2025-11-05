import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import entriesRouter from './routes/entries';
import eventsRouter from './routes/events';
import clientsRouter from './routes/clients';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/entries', entriesRouter);
app.use('/api/events', eventsRouter);
app.use('/api/clients', clientsRouter)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
