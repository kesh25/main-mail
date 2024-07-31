export const common_items: string[] = [
    "Appointment Scheduling",
    "Email Routing", 
    "Web Access",
    "Mobile App | Android or iOS",
    "24/7 Expert Support",
    "Antivirus & Spam Guard",
    "Shared & Private Calendar",
    "Contact Manager",
    "Shared & Private File Storage",
    "No Ads",
    "Daily Back Ups"
]

const basic: string[] = [
    "Upto 5 Email Accounts",
    "30 GB Storage",
]; 
// - 500

const premium: string[] = [
    "Upto 15 Email Accounts",
    "70 GB Storage",
     
]; 

// - 2000 
const startup: string[] = [
    "Upto 25 Email Account",
    "150 GB Storage",
    "API Access"
]; 

// - 3500
const custom: string[] = [
    "More than 20 Email Account",
    "200 GB Storage and above",
    "API Access"
]; 

let plans: {title: string, description: string, features: string[], price: number}[] = [
    {
        features: [...basic],
        price: 999,
        title: "Basic",
        description: "Best for individuals"
    },
    {
        features: [...premium],
        price: 2999,
        title: "Premium",
        description: "Perfect for small businesses"
    },
    {
        features: [...startup],
        price: 4999,
        title: "Startup",
        description: "Ideal for small to mid-range startups "
    },
    {
        features: [...custom],
        price: 5000,
        title: "Custom",
        description: "Designed for large organizations"
    }
];

export default plans; 