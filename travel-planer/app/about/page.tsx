'use client';

import Image from 'next/image';
import styles from './style.module.css';

export default function AboutUs() {AboutUs
    return (
        <div>
            <br/>
            <div className={styles.aboutContainer}>
                <div className={styles.hero}>
                    <h1>Бидний тухай</h1>
                    <p>Монголынхоо сайхныг бидэнтэй хамт олж мэдээрэй</p>
                </div>

                <section className={styles.mission}>
                    <h2>Бидний эрхэм зорилго</h2>
                    <p>
                        Бид Монголын байгалийн үзэсгэлэнт газар нутаг, соёлын баялаг өвийг харуулахыг зорьдог. 
                        Бидний зорилго бол тогтвортой аялал жуулчлалыг дэмжихийн зэрэгцээ мартагдашгүй аялалын туршлагыг бий болгох явдал юм.
                    </p>
                </section>

                <section className={styles.team}>
                    <h2>Манай баг</h2>
                    <div className={styles.teamGrid}>
                        <div className={styles.teamMember}>
                            <Image
                                src="/images/profiles/tugsuu.jpg"
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
                                src="/images/profiles/leader.jpg"
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
                                src="/images/profiles/enh.jpg"
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
                    <h2>Бидний үнэт зүйлс</h2>
                    <div className={styles.valuesGrid}>
                        <div className={styles.valueCard}>
                            <h3>Тогтвортой байдал</h3>
                            <p>Бид Монголын байгалийн үзэсгэлэнт газруудыг хадгалан үлдээсэн байгальд ээлтэй аялал жуулчлалын арга барилыг эрхэмлэдэг.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <h3>Жинхэнэ байдал</h3>
                            <p>Бид жинхэнэ Монгол улс, түүний соёлыг харуулсан жинхэнэ туршлагаар хангадаг.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <h3>Давуу чанар</h3>
                            <p>Бид үйлчилгээ, үйлчлүүлэгчдийнхээ туршлагыг бүх талаараа шилдэг байхыг эрмэлздэг.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
} 