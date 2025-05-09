import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Here you would typically:
        // 1. Send an email notification
        // 2. Store the message in a database
        // 3. Integrate with a CRM system
        // For now, we'll just simulate a successful submission

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return res.status(200).json({
            message: 'Message received successfully',
            data: {
                name,
                email,
                subject,
                message
            }
        });
    } catch (error) {
        console.error('Error processing contact form:', error);
        return res.status(500).json({ error: 'Failed to process message' });
    }
} 