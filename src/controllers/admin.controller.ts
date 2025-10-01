import type { Request, Response } from "express";
import ContactForm from "../models/connect.model.js";

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "editco2024"
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
