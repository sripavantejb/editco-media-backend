import type { Request, Response } from "express";
import ContactForm from "../models/connect.model.js";
import User from "../models/user.model.js";

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  username: "superadmin@editcomedia.com",
  password: "editcomedia@DHT"
};

// Admin login endpoint
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Set a simple session flag (in production, use proper JWT tokens)
      res.json({ 
        success: true, 
        message: 'Login successful',
        admin: true 
      });
    } else {
      res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }
  } catch (error: any) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

// Get all contact form submissions
export const getAllSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await ContactForm.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .select('-__v'); // Exclude version field
    
    res.json({ 
      success: true, 
      data: submissions,
      count: submissions.length 
    });
  } catch (error: any) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions', details: error.message });
  }
};

// Get submission by ID
export const getSubmissionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const submission = await ContactForm.findById(id).select('-__v');
    
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    
    res.json({ success: true, data: submission });
  } catch (error: any) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ error: 'Failed to fetch submission', details: error.message });
  }
};

// Update submission status
export const updateSubmissionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'reviewed', 'contacted', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const submission = await ContactForm.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    ).select('-__v');
    
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    
    res.json({ success: true, data: submission });
  } catch (error: any) {
    console.error('Error updating submission:', error);
    res.status(500).json({ error: 'Failed to update submission', details: error.message });
  }
};

// Delete submission
export const deleteSubmission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const submission = await ContactForm.findByIdAndDelete(id);
    
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    
    res.json({ success: true, message: 'Submission deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ error: 'Failed to delete submission', details: error.message });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .select('-password -__v')
      .sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      data: users,
      count: users.length 
    });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
};

// Get login history for all users or specific user
export const getLoginHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    
    if (userId) {
      // Get login history for a specific user
      const user = await User.findById(userId)
        .select('username email firstName lastName loginHistory');
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json({ 
        success: true, 
        data: {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          },
          loginHistory: user.loginHistory
        }
      });
    } else {
      // Get login history for all users
      const users = await User.find()
        .select('username email firstName lastName loginHistory')
        .sort({ 'loginHistory.timestamp': -1 });
      
      // Flatten login history with user info
      const allLoginHistory = users.flatMap(user => 
        user.loginHistory.map(login => ({
          userId: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          timestamp: login.timestamp,
          ipAddress: login.ipAddress,
          userAgent: login.userAgent
        }))
      ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      res.json({ 
        success: true, 
        data: allLoginHistory,
        count: allLoginHistory.length 
      });
    }
  } catch (error: any) {
    console.error('Error fetching login history:', error);
    res.status(500).json({ error: 'Failed to fetch login history', details: error.message });
  }
};
