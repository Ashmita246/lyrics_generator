import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ 
      where: { 
        [Op.or]: [{ email }, { username }]
      } 
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const user = await User.create({ username, email, password });

    const token = jwt.sign(
      { id: user.id, username: user.username }, 
      process.env.JWT_SECRET || 'default_secret', 
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, user: { id: user.id, username: user.username, email: user.email, token } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.validatePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username }, 
      process.env.JWT_SECRET || 'default_secret', 
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during login' });
  }
};