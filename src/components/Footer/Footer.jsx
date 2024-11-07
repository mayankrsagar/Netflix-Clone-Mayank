import './Footer.css';

import React from 'react';

import facebook_icon from '../../assets/facebook_icon.png';
import instagram_icon from '../../assets/instagram_icon.png';
import twitter_icon from '../../assets/twitter_icon.png';
import youtube_icon from '../../assets/youtube_icon.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerIcons">
        <img src={youtube_icon} alt="YouTube icon" />
        <img src={twitter_icon} alt="Twitter icon" />
        <img src={instagram_icon} alt="Instagram icon" />
        <img src={facebook_icon} alt="Facebook icon" />
      </div>
      <ul className="footerLinks">
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Gift Cards</li>
        <li>Media Centre</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className="copyrightText">© 2023 Netflix.com, Inc. or its affiliates</p>
    </footer>
  );
}

export default Footer;
