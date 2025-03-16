"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import de usePathname
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
    const pathname = usePathname(); // Récupère le chemin actuel

    const toggleMobileNav = () => {
        setIsMobileNavOpen((prevState) => !prevState);
    };

    // Fermer le menu mobile après un clic sur un lien
    const handleLinkClick = () => {
        setIsMobileNavOpen(false);
    };

    // Vérifier si le chemin actuel correspond à un menu principal
    const isActive = (path: string) => {
        return pathname.startsWith(path);
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
                        <Link
                            href="/"
                            className={isActive("/") ? styles.active : ""}
                            onClick={handleLinkClick}
                        >
                            <FontAwesomeIcon icon={faHome} className={styles.icon} /> Accueil
                        </Link>
                    </li>
                    <li className={styles.dropdown}>
                        <span className={isActive("/SiteFront/Vente") ? styles.active : ""}>
                            <FontAwesomeIcon icon={faBuilding} className={styles.icon} /> Vente
                        </span>
                        <ul className={styles.dropdownMenu}>
                            <li>
                                <Link
                                    href="/SiteFront/Vente/Maison"
                                    onClick={handleLinkClick}
                                >
                                    <FontAwesomeIcon icon={faLandmark} className={styles.icon} /> Maisons
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/SiteFront/Vente/Terrain"
                                    onClick={handleLinkClick}
                                >
                                    <FontAwesomeIcon icon={faLandmark} className={styles.icon} /> Terrains
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/SiteFront/Vente/model"
                                    onClick={handleLinkClick}
                                >
                                    <FontAwesomeIcon icon={faLandmark} className={styles.icon} /> Modélisation 3D
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={styles.dropdown}>
                        <span className={isActive("/SiteFront/location") ? styles.active : ""}>
                            <FontAwesomeIcon icon={faBuilding} className={styles.icon} /> Location
                        </span>
                        <ul className={styles.dropdownMenu}>
                            <li>
                                <Link
                                    href="/SiteFront/location/Maison"
                                    onClick={handleLinkClick}
                                >
                                    <FontAwesomeIcon icon={faLandmark} className={styles.icon} /> Maisons
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/SiteFront/location/Terrain"
                                    onClick={handleLinkClick}
                                >
                                    <FontAwesomeIcon icon={faLandmark} className={styles.icon} /> Terrains
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link
                            href="/SiteFront/contact"
                            className={isActive("/SiteFront/contact") ? styles.active : ""}
                            onClick={handleLinkClick}
                        >
                            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> Contact
                        </Link>
                    </li>
                </ul>
                <Link href="/SiteFront/login" onClick={handleLinkClick}>
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