import React from 'react'
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="Footer">
        <a href="https://t.me/KursFlaskReactBot">
          <FaTelegramPlane className='TelegramIcon'/>
          Телеграм бот
        </a>
    </footer>
  )
}

export default Footer;