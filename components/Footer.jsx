'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';
import Logo from '../public/logo.png'; // Adjust the path as necessary
import Navigation from './Navigation';

export default function Footer() {
  return (
    <footer className='bg-red-600 text-center p-6'>
      {/* Logo */}
      <div className='flex justify-center mb-4'>
        <Image src={Logo} alt='Logo' width={100} height={100} />
      </div>

      {/* Separator Line */}
      <hr className='border-white mb-4 w-10/12 mx-auto' />

      {/* Centered Navigation */}
      <div className='flex justify-center'>
        <Navigation activeItem={0} />
      </div>

      {/* Social Media Icons */}
      <div className='flex justify-center space-x-10 mt-4 text-white text-xl'>
        <Link href='#' className='hover:text-gray-300'>
          <FaFacebookF />
        </Link>
        <Link href='#' className='hover:text-gray-300'>
          <FaTwitter />
        </Link>
        <Link href='#' className='hover:text-gray-300'>
          <FaInstagram />
        </Link>
        <Link href='#' className='hover:text-gray-300'>
          <FaWhatsapp />
        </Link>
        <Link href='#' className='hover:text-gray-300'>
          <FaTelegramPlane />
        </Link>
      </div>

      {/* Copyright Text */}
      <p className='text-gray-300 text-sm mt-4'>
        Copyright © 2025. All Rights Reserved.
      </p>
    </footer>
  );
}
