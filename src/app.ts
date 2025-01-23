import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import {sequelize} from './config/database';
import authRoutes from './routes/authRoutes';
import User from './models/User';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/auth', authRoutes);


const startServer = async () => {
  try {
   
    await sequelize.sync(); 
    console.log('Database connected and models synced');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();