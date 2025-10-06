import ContactForm from "../models/connect.model.js";
export const postDetails = async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        console.log('Request headers:', req.headers);
        const { firstName, lastName, emailAddress, phoneNumber, companyName, projectType, budgetRange, timeline, servicesNeeded, projectDescription, agreedToTerms } = req.body;
        // Validate required fields
        if (!firstName || !lastName || !emailAddress || !phoneNumber || !projectType || !budgetRange || !timeline || !projectDescription) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const newContact = new ContactForm({
            firstName,
            lastName,
            emailAddress,
            phoneNumber,
            companyName,
            projectType,
            budgetRange,
            timeline,
            servicesNeeded,
            projectDescription,
            agreedToTerms
        });
        await newContact.save();
        res.status(201).json({ message: 'Contact form submitted successfully', data: newContact });
    }
    catch (error) {
        console.error('Error saving contact form:', error);
        res.status(500).json({ error: 'Failed to save contact form', details: error.message });
    }
};
//# sourceMappingURL=connect.controller.js.map