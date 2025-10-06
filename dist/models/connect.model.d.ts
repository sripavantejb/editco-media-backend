import mongoose from "mongoose";
declare const ContactForm: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    projectType: "Select project type" | "Brand Identity" | "Website Development" | "Social Media Content" | "Digital Marketing" | "AI Solutions" | "Other";
    budgetRange: "$1k-$5k" | "$5k-$10k" | "$10k-$25k" | "$25k-$50k" | "$50k+";
    timeline: "1-2 weeks" | "1 month" | "2-3 months" | "3-6 months" | "6+ months";
    servicesNeeded: ("Digital Marketing" | "Real Editing" | "Shirt Editing" | "Thumbnail Editing" | "T-Shirt Mockups" | "AI Chatbots" | "AI Websites" | "Social Media Management" | "Logo Design & Branding" | "Web Development")[];
    projectDescription: string;
    agreedToTerms: boolean;
    submittedAt: NativeDate;
    status: "pending" | "reviewed" | "contacted" | "completed";
    companyName?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    projectType: "Select project type" | "Brand Identity" | "Website Development" | "Social Media Content" | "Digital Marketing" | "AI Solutions" | "Other";
    budgetRange: "$1k-$5k" | "$5k-$10k" | "$10k-$25k" | "$25k-$50k" | "$50k+";
    timeline: "1-2 weeks" | "1 month" | "2-3 months" | "3-6 months" | "6+ months";
    servicesNeeded: ("Digital Marketing" | "Real Editing" | "Shirt Editing" | "Thumbnail Editing" | "T-Shirt Mockups" | "AI Chatbots" | "AI Websites" | "Social Media Management" | "Logo Design & Branding" | "Web Development")[];
    projectDescription: string;
    agreedToTerms: boolean;
    submittedAt: NativeDate;
    status: "pending" | "reviewed" | "contacted" | "completed";
    companyName?: string | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    projectType: "Select project type" | "Brand Identity" | "Website Development" | "Social Media Content" | "Digital Marketing" | "AI Solutions" | "Other";
    budgetRange: "$1k-$5k" | "$5k-$10k" | "$10k-$25k" | "$25k-$50k" | "$50k+";
    timeline: "1-2 weeks" | "1 month" | "2-3 months" | "3-6 months" | "6+ months";
    servicesNeeded: ("Digital Marketing" | "Real Editing" | "Shirt Editing" | "Thumbnail Editing" | "T-Shirt Mockups" | "AI Chatbots" | "AI Websites" | "Social Media Management" | "Logo Design & Branding" | "Web Development")[];
    projectDescription: string;
    agreedToTerms: boolean;
    submittedAt: NativeDate;
    status: "pending" | "reviewed" | "contacted" | "completed";
    companyName?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    projectType: "Select project type" | "Brand Identity" | "Website Development" | "Social Media Content" | "Digital Marketing" | "AI Solutions" | "Other";
    budgetRange: "$1k-$5k" | "$5k-$10k" | "$10k-$25k" | "$25k-$50k" | "$50k+";
    timeline: "1-2 weeks" | "1 month" | "2-3 months" | "3-6 months" | "6+ months";
    servicesNeeded: ("Digital Marketing" | "Real Editing" | "Shirt Editing" | "Thumbnail Editing" | "T-Shirt Mockups" | "AI Chatbots" | "AI Websites" | "Social Media Management" | "Logo Design & Branding" | "Web Development")[];
    projectDescription: string;
    agreedToTerms: boolean;
    submittedAt: NativeDate;
    status: "pending" | "reviewed" | "contacted" | "completed";
    companyName?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    projectType: "Select project type" | "Brand Identity" | "Website Development" | "Social Media Content" | "Digital Marketing" | "AI Solutions" | "Other";
    budgetRange: "$1k-$5k" | "$5k-$10k" | "$10k-$25k" | "$25k-$50k" | "$50k+";
    timeline: "1-2 weeks" | "1 month" | "2-3 months" | "3-6 months" | "6+ months";
    servicesNeeded: ("Digital Marketing" | "Real Editing" | "Shirt Editing" | "Thumbnail Editing" | "T-Shirt Mockups" | "AI Chatbots" | "AI Websites" | "Social Media Management" | "Logo Design & Branding" | "Web Development")[];
    projectDescription: string;
    agreedToTerms: boolean;
    submittedAt: NativeDate;
    status: "pending" | "reviewed" | "contacted" | "completed";
    companyName?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    projectType: "Select project type" | "Brand Identity" | "Website Development" | "Social Media Content" | "Digital Marketing" | "AI Solutions" | "Other";
    budgetRange: "$1k-$5k" | "$5k-$10k" | "$10k-$25k" | "$25k-$50k" | "$50k+";
    timeline: "1-2 weeks" | "1 month" | "2-3 months" | "3-6 months" | "6+ months";
    servicesNeeded: ("Digital Marketing" | "Real Editing" | "Shirt Editing" | "Thumbnail Editing" | "T-Shirt Mockups" | "AI Chatbots" | "AI Websites" | "Social Media Management" | "Logo Design & Branding" | "Web Development")[];
    projectDescription: string;
    agreedToTerms: boolean;
    submittedAt: NativeDate;
    status: "pending" | "reviewed" | "contacted" | "completed";
    companyName?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default ContactForm;
//# sourceMappingURL=connect.model.d.ts.map