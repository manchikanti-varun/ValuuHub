"use server"

import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"

// Define the form data type
export type ContactFormData = {
    name: string
    email: string
    message: string
}

export async function submitContactForm(formData: ContactFormData) {
    try {
        // Create a JWT client using the service account credentials
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Replace escaped newlines
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        })

        // Initialize the Google Spreadsheet
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || "", serviceAccountAuth)

        // Load the document properties and sheets
        await doc.loadInfo()

        // Get the first sheet
        const sheet = doc.sheetsByIndex[0]

        // Add a new row with the form data and timestamp
        await sheet.addRow({
            Name: formData.name,
            Email: formData.email,
            Message: formData.message,
            Timestamp: new Date().toISOString(),
        })

        return { success: true, message: "Form submitted successfully!" }
    } catch (error) {
        console.error("Error submitting form to Google Sheets:", error)
        return { success: false, message: "Failed to submit form. Please try again later." }
    }
}
