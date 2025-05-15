'use client';

import Image from 'next/image';
import styles from './style.module.css';
import '../../app/globals.css';
import TopBar from '@/components/TopBar';

export default function AboutUs() {
    return (
        <div>
            <TopBar />
            <br/>
            <div className={styles.aboutContainer}>
                <div className={styles.hero}>
                    <h1>About Us</h1>
                    <p>Discover Mongolia's beauty with us</p>
                </div>

                <section className={styles.mission}>
                    <h2>Our Mission</h2>
                    <p>
                        We are dedicated to showcasing the breathtaking landscapes and rich cultural heritage of Mongolia. 
                        Our goal is to provide unforgettable travel experiences while promoting sustainable tourism.
                    </p>
                </section>

                <section className={styles.team}>
                    <h2>Our Team</h2>
                    <div className={styles.teamGrid}>
                        <div className={styles.teamMember}>
                            <Image
                                src="/images/profile.png"
                                alt="Team Member"
                                width={200}
                                height={200}
                                className={styles.memberImage}
                            />
                            <h3>М.Төгсбилэг</h3>
                            <p>Founder & CEO</p>
                        </div>
                        <div className={styles.teamMember}>
                            <Image
                                src="/images/profile.png"
                                alt="Team Member"
                                width={200}
                                height={200}
                                className={styles.memberImage}
                            />
                            <h3>Б.Эрдэнэ-очир</h3>
                            <p>Founder & CEO</p>
                        </div>
                        <div className={styles.teamMember}>
                            <Image
                                src="/images/profile.png"
                                alt="Team Member"
                                width={200}
                                height={200}
                                className={styles.memberImage}
                            />
                            <h3>Энхмэнд</h3>
                            <p>Founder & CEO</p>
                        </div>
                    </div>
                </section>

                <section className={styles.values}>
                    <h2>Our Values</h2>
                    <div className={styles.valuesGrid}>
                        <div className={styles.valueCard}>
                            <h3>Sustainability</h3>
                            <p>We are committed to eco-friendly tourism practices that preserve Mongolia's natural beauty.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <h3>Authenticity</h3>
                            <p>We provide genuine experiences that showcase the real Mongolia and its culture.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <h3>Excellence</h3>
                            <p>We strive for excellence in every aspect of our service and customer experience.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
} 