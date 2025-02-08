"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../public/css/nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBuilding,
    faLandmark,
    faEnvelope,
    faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faTwitter,
    faInstagram,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const toggleMobileNav = () => {
        setIsMobileNavOpen((prevState) => !prevState);
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.navBrand}>
                <Link href="/">
                    <span>K&A Immobilier</span>
                </Link>
            </div>

            {/* Bouton hamburger */}
            <div
                className={`${styles.hamburger} ${isMobileNavOpen ? styles.active : ""}`}
                onClick={toggleMobileNav}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>

            {/* Menu mobile */}
            <nav
                className={`${styles.navLinks} ${
                    isMobileNavOpen ? `${styles.mobileNav} ${styles.open}` : ""
                }`}
            >
                <ul>
                    <li>
                        <Link href="/">
                            <FontAwesomeIcon icon={faHome} className={styles.icon} /> Accueil
                        </Link>
                    </li>
                    <li className={styles.dropdown}>
                        <span>
                            <FontAwesomeIcon icon={faBuilding} className={styles.icon} /> Vente
                        </span>
                        <ul className={styles.dropdownMenu}>
                            <li>
                                <Link href="../SiteFront/Vente/Maison">
                                    <FontAwesomeIcon icon={faLandmark} className={styles.icon} /> Maisons
                                </Link>
                            </li>
                            <li>
                                <Link href="../SiteFront/Vente/Terrain">
                                    <FontAwesomeIcon icon={faLandmark} className={styles.icon} /> Terrains
                                </Link>
                            </li>
                            <li>
                                <Link href="../SiteFront/Vente/model">
                                    <FontAwesomeIcon icon={faLandmark} className={styles.icon} /> Modélisation 3D
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={styles.dropdown}>
                        <span>
                            <FontAwesomeIcon icon={faBuilding} className={styles.icon} /> Location
                        </span>
                        <ul className={styles.dropdownMenu}>
                            <li>
                                <Link href="../SiteFront/location/Maison">
                                    <FontAwesomeIcon icon={faLandmark} className={styles.icon} /> Maisons
                                </Link>
                            </li>
                            <li>
                                <Link href="../SiteFront/location/Maison">
                                    <FontAwesomeIcon icon={faLandmark} className={styles.icon} /> Terrains
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link href="../SiteFront/contact">
                            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> Contact
                        </Link>
                    </li>
                </ul>
                <Link href="../SiteFront/login">
                    <button className={styles.loginButton}>
                        <FontAwesomeIcon icon={faSignInAlt} className={styles.icon} /> Se connecter
                    </button>
                </Link>

                {/* Réseaux sociaux */}
                <div className={styles.socialLinks}>
                    <Link href="https://www.facebook.com" target="_blank" aria-label="Facebook">
                        <FontAwesomeIcon icon={faFacebook} className={styles.socialIcon} />
                    </Link>
                    <Link href="https://www.twitter.com" target="_blank" aria-label="Twitter">
                        <FontAwesomeIcon icon={faTwitter} className={styles.socialIcon} />
                    </Link>
                    <Link href="https://www.instagram.com" target="_blank" aria-label="Instagram">
                        <FontAwesomeIcon icon={faInstagram} className={styles.socialIcon} />
                    </Link>
                    <Link href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn">
                        <FontAwesomeIcon icon={faLinkedin} className={styles.socialIcon} />
                    </Link>
                </div>
            </nav>
        </div>
    );
}
