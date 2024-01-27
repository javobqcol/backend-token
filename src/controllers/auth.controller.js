import User from "../models/User.js";
import { compare, encrypt } from "../helpers/handleBcrypt.js";

import { generateRefreshToken, generateToken} from "../helpers/tokenManager.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user?.active ) {
      throw new Error("Authorization problem");
    }
    const checkPassword = await compare(password, user.password);
    if ( !checkPassword ) {
      throw new Error("Authorization problem");
    }

    if (!user || !user?.active || !checkPassword) {
      throw new Error("Authorization problem");
    }
    const { token, expiresIn } = generateToken(user._id);
    generateRefreshToken(user._id, res);
  

    return res.status(200).json({ token, expiresIn });
  } catch (error) {
    return res.status(401).json({ error: error?.message });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existe = await User.findOne({ email: email }).exec();
    if (existe) {
      throw new Error("Registered user ");
    }
    const encriptPassword = await encrypt(password); 
    const user = User({ email, password:encriptPassword, active: true });

    const userSaved = await user.save();
    const { token, expiresIn } = generateToken(user._id);
    generateRefreshToken(user._id, res);
    res.status(200).json({ token, expiresIn });
  } catch (error) {
    return res.status(401).json({ error: error?.message });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req?.uid).lean();
    if (!user.active) {
      throw new Error("Inactive User");
    }
    return res.status(200).json({ id: user._id, email: user.email });
  } catch (error) {
    return res.status(401).json({ error: error?.message });
  }
};
export const refreshToken = (req, res) => {
  try {
      const { token, expiresIn } =  generateToken(req.uid);

      return res.status(200).json({ token, expiresIn });
  } catch (error) {

      return res.status(500).json({ error: error?.message });
  }
};
export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};


