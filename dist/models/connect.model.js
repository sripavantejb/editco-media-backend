import mongoose from "mongoose";
const schema = new mongoose.Schema({
    // Personal Information
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    emailAddress: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    companyName: {
        type: String,
        trim: true
    },
    // Project Details
    projectType: {
        type: String,
        required: true,
        enum: [
            'Select project type',
            'Brand Identity',
            'Website Development',
            'Social Media Content',
            'Digital Marketing',
            'AI Solutions',
            'Other'
        ]
    },
    budgetRange: {
        type: String,
        required: true,
        enum: [
            '$1k-$5k',
            '$5k-$10k',
            '$10k-$25k',
            '$25k-$50k',
            '$50k+'
        ]
    },
    timeline: {
        type: String,
        required: true,
        enum: [
            '1-2 weeks',
            '1 month',
            '2-3 months',
            '3-6 months',
            '6+ months'
        ]
    },
    // Services Needed
    servicesNeeded: [{
            type: String,
            enum: [
                'Real Editing',
                'Shirt Editing',
                'Thumbnail Editing',
                'T-Shirt Mockups',
                'AI Chatbots',
                'AI Websites',
                'Social Media Management',
                'Digital Marketing',
                'Logo Design & Branding',
                'Web Development'
            ]
        }],
    // Project Description
    projectDescription: {
        type: String,
        required: true,
        maxlength: 1000
    },
    // Agreement
    agreedToTerms: {
        type: Boolean,
        required: true,
        default: false
    },
    // Metadata
    submittedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'contacted', 'completed'],
        default: 'pending'
    }
}, {
    timestamps: true
});
const ContactForm = mongoose.model('ContactForm', schema);
export default ContactForm;
//# sourceMappingURL=connect.model.js.map