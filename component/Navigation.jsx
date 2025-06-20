'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItem = [
  { title: 'Home', href: '/' },
  { title: 'Blog', href: '/blog' },
  { title: 'Vendors', href: '/vendors' },
  { title: 'Gallery', href: '/gallery' },
  { title: 'Favorite', href: '/favorite' },
  { title: "Let's Swipe", href: '/swipe' },
  { title: 'Locate Us', href: '/locate' },
  { title: 'Support Us', href: '/support' },
];

const Navigation = ({ onNavClick }) => {
  const pathname = usePathname();

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='flex flex-col md:flex-row items-center'>
      {navItem.map((item, index) => (
        <motion.div key={item.title} variants={itemVariants}>
          <Link href={item.href} passHref>
            <span
              className={`block md:px-4 xl:px-8 py-2 text-[18px] font-[500] font-Inter ${
                pathname === item.href ? 'text-orange-500' : 'text-black'
              }`}
              onClick={() => onNavClick(index)}>
              {item.title}
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default Navigation;
