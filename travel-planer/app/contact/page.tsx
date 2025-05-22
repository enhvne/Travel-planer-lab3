'use client';

import { useState } from 'react';
import styles from './style.module.css';
import '../../app/globals.css';
import TopBar from '@/components/TopBar';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Sending message...' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus({
                    type: 'success',
                    message: 'Message sent successfully! We will get back to you soon.'
                });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
    console.error('Contact form error:', error); // Add this line
    setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
    });
}
    };

    return (
        <div>
            <TopBar />
            <div className={styles.contactContainer}>
                <div className={styles.hero}>
                    <h1>Contact Us</h1>
                    <p>Get in touch with our team</p>
                </div>

                <div className={styles.content}>
                    <div className={styles.contactInfo}>
                        <div className={styles.infoCard}>
                            <h3>Address</h3>
                            <p>123 Travel Street</p>
                            <p>Ulaanbaatar, Mongolia</p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3>Email</h3>
                            <p>info@mongoliatravel.com</p>
                            <p>support@mongoliatravel.com</p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3>Phone</h3>
                            <p>+976 1234 5678</p>
                            <p>+976 8765 4321</p>
                        </div>
                    </div>

                    <form className={styles.contactForm} onSubmit={handleSubmit}>
                        <h2>Send us a message</h2>
                        
                        {status.message && (
                            <div className={`${styles.status} ${styles[status.type]}`}>
                                {status.message}
                            </div>
                        )}

                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                            />
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
} 