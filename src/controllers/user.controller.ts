import type { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";

// User Registration
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, firstName, lastName, phoneNumber, companyName } = req.body;
    
    // Validate required fields
    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide all required fields' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email already registered' 
        });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ 
          success: false, 
          error: 'Username already taken' 
        });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      companyName,
      authProvider: 'credentials'
    });

    await newUser.save();

    // Return success (don't send password back)
    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Registration failed', 
      details: error.message 
    });
  }
};

// User Login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { usernameOrEmail, password } = req.body;
    
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username/Email and password are required' 
      });
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [
        { username: usernameOrEmail },
        { email: usernameOrEmail }
      ]
    });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }

    // Record login history
    const loginEntry = {
      timestamp: new Date(),
      ipAddress: req.ip || req.headers['x-forwarded-for'] as string || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown'
    };
    
    user.loginHistory.push(loginEntry);
    await user.save();

    // Return success with user data (don't send password back)
    res.json({ 
      success: true, 
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        companyName: user.companyName,
        avatar: user.avatar,
        authProvider: user.authProvider
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Login failed', 
      details: error.message 
    });
  }
};

// Get User Profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    res.json({ 
      success: true, 
      user 
    });
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch user profile', 
      details: error.message 
    });
  }
};

// Update User Profile
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, phoneNumber, companyName } = req.body;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, phoneNumber, companyName },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Profile updated successfully',
      user 
    });
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update profile', 
      details: error.message 
    });
  }
};

const getOAuthClient = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error('GOOGLE_CLIENT_ID is not configured');
  }
  return new OAuth2Client(clientId);
};

const generateUniqueUsername = async (base: string) => {
  const sanitizedBase = base.toLowerCase().replace(/[^a-z0-9._-]/g, '') || 'user';
  let username = sanitizedBase;
  let suffix = 1;
  while (await User.exists({ username })) {
    username = `${sanitizedBase}${suffix}`;
    suffix += 1;
  }
  return username;
};

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({
        success: false,
        error: 'Google access token is required'
      });
    }

    const client = getOAuthClient();
    const tokenInfo = await client.getTokenInfo(accessToken);

    if (!tokenInfo.email) {
      return res.status(400).json({
        success: false,
        error: 'Unable to retrieve email from Google'
      });
    }

    client.setCredentials({ access_token: accessToken });
    const userInfoResponse = await client.request<{ email?: string; given_name?: string; family_name?: string; picture?: string; sub?: string; name?: string }>({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo'
    });
    const profile = userInfoResponse.data;

    const email = profile.email ?? tokenInfo.email;
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Unable to retrieve email from Google profile'
      });
    }

    const emailAddress = email as string;

    let user = await User.findOne({ email: emailAddress });

    if (!user) {
      const [baseUsername = emailAddress] = emailAddress.split('@');
      const username = await generateUniqueUsername(baseUsername);
      const randomPassword = crypto.randomBytes(32).toString('hex');
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = new User({
        username,
        email: emailAddress,
        password: hashedPassword,
        firstName: profile.given_name || profile.name?.split(' ')[0] || 'Google',
        lastName: profile.family_name || profile.name?.split(' ').slice(1).join(' ') || 'User',
        avatar: profile.picture,
        authProvider: 'google',
        googleId: profile.sub
      });
    } else {
      if (!user.authProvider || user.authProvider === 'credentials') {
        user.authProvider = 'google';
      }
      if (!user.googleId && profile.sub) {
        user.googleId = profile.sub;
      }
      if (profile.picture && user.avatar !== profile.picture) {
        user.avatar = profile.picture;
      }
    }

    const loginEntry = {
      timestamp: new Date(),
      ipAddress: req.ip || (req.headers['x-forwarded-for'] as string) || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown'
    };

    user.loginHistory.push(loginEntry);
    await user.save();

    res.json({
      success: true,
      message: 'Google login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        companyName: user.companyName,
        avatar: user.avatar,
        authProvider: user.authProvider
      }
    });
  } catch (error: any) {
    console.error('Google login error:', error);
    res.status(500).json({
      success: false,
      error: 'Google login failed',
      details: error.message
    });
  }
};

