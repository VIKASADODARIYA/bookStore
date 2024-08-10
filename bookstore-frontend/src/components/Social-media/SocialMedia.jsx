import React from 'react'
import { useDarkMode } from '../../DarkModeContext';
import './SocialMedia.css'

export default function SocialMedia() {
    const { isDarkMode } = useDarkMode();

    return (
        <>
            {/* Social Media Sidebar */}
            <div className={`social-sidebar ${isDarkMode ? 'dark-mode' : ''}`}>
                <a href="https://github.com/VIKASADODARIYA" target="_blank" rel="noreferrer" className="social-icon">
                    <i className="bi bi-github"></i>
                </a>
                <a href="https:/youtube.com/" target="_blank" rel="noreferrer" className="social-icon">
                    <i className="bi bi-youtube"></i>
                </a>
                <a href="https://www.linkedin.com/in/vikas-adodariya-22b719242" target="_blank" rel="noreferrer" className="social-icon">
                    <i className="bi bi-linkedin"></i>
                </a>
                <a href="https://www.instagram.com/v_i_k_a_s_patel.03" target="_blank" rel="noreferrer" className="social-icon">
                    <i className="bi bi-instagram"></i>
                </a>
            </div>
        </>
    )
}
