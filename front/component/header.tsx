"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../public/css/nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBuilding,
    faLandmark,
    faEnvelope,
    faSignInAlt,
    faUser,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
 
export default function Navbar() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Vérifier l'état de connexion au montage du composant
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const toggleMobileNav = () => {
        setIsMobileNavOpen((prevState) => !prevState);
    };

    const handleLinkClick = () => {
        setIsMobileNavOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setIsMobileNavOpen(false);
        // Rediriger vers la page d'accueil ou de login si nécessaire
        window.location.href = '/';
    };

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

            <div
                className={`${styles.hamburger} ${isMobileNavOpen ? styles.active : ""}`}
                onClick={toggleMobileNav}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>

            <nav
                className={`${styles.navLinks} ${
                    isMobileNavOpen ? `${styles.mobileNav} ${styles.open}` : ""
                }`}
            >
                <ul>
                    <li>
                        <Link href="/" onClick={handleLinkClick}>
                            <FontAwesomeIcon icon={faHome} className={styles.icon} /> Accueil
                        </Link>
                    </li>
                    <li className={styles.dropdown}>
                        <span className={isActive("/Vente") ? styles.active : ""}>
                            <FontAwesomeIcon icon={faBuilding} className={styles.icon} /> Vente
                        </span>
                        <ul className={styles.dropdownMenu}>
                            <li>
                                <Link href="/Vente/Maison" onClick={handleLinkClick}>
                                    <FontAwesomeIcon icon={faLandmark} className={styles.icon} /> Maisons
                                </Link>
                            </li>
                            <li>
                                <Link href="/Vente/Terrain" onClick={handleLinkClick}>
                                    <FontAwesomeIcon icon={faLandmark} className={styles.icon} /> Terrains
                                </Link>
                            </li>
                            <li>
                                <Link href="/Vente/model" onClick={handleLinkClick}>
                                    <FontAwesomeIcon icon={faLandmark} className={styles.icon} /> Modélisation 3D
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={styles.dropdown}>
                        <span className={isActive("/location") ? styles.active : ""}>
                            <FontAwesomeIcon icon={faBuilding} className={styles.icon} /> Location
                        </span>
                        <ul className={styles.dropdownMenu}>
                            <li>
                                <Link href="/location/Maison" onClick={handleLinkClick}>
                                    <FontAwesomeIcon icon={faLandmark} className={styles.icon} /> Maisons
                                </Link>
                            </li>
                            <li>
                                <Link href="/location/Terrain" onClick={handleLinkClick}>
                                    <FontAwesomeIcon icon={faLandmark} className={styles.icon} /> Terrains
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className={isActive("/contact") ? styles.active : ""}
                            onClick={handleLinkClick}
                        >
                            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> Contact
                        </Link>
                    </li>
                </ul>

                {isLoggedIn ? (
                    <div className={styles.loginButton}>
                        <Link href="/client/${user.id}" onClick={handleLinkClick}>
                            <button className={styles.profileButton}>
                                <FontAwesomeIcon icon={faUser} className={styles.icon} /> Mon compte
                            </button>
                        </Link>
                    </div>
                ) : (
                    <Link href="/login" onClick={handleLinkClick}>
                        <button className={styles.loginButton}>
                            <FontAwesomeIcon icon={faSignInAlt} className={styles.icon} /> Se connecter
                        </button>
                    </Link>
                )}

            </nav>
        </div>
    );
}