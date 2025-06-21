import Vendor1 from '../public/Gallery1.png';
import Vendor2 from '../public/Gallery2.png';
import Vendor3 from '../public/Gallery3.png';
import Vendor4 from '../public/Gallery4.png';
import Vendor5 from '../public/Gallery5.png';
import Vendor6 from '../public/Gallery6.png';

import CategoryVendor1 from '../public/vendorPage/Vendor1.png';
import CategoryVendor2 from '../public/vendorPage/Vendor2.png';
import CategoryVendor3 from '../public/vendorPage/Vendor3.png';
import CategoryVendor4 from '../public/vendorPage/Vendor4.png';

import Blog1 from '../public/Blog1.png';
import Blog3 from '../public/Blog3.png';
import Blog2 from '../public/Blog4.png';

import a1 from '../downloads/1.json';
import a2 from '../downloads/2.json';
import a3 from '../downloads/3.json';
import a4 from '../downloads/4.json';
import a7 from '../downloads/7.json';
import chana from '../downloads/Chanachur.json';
import puchka from '../downloads/Puchka.json';
import dosa from '../downloads/dosa.json';

export const galleryImages = [
  Vendor1,
  Vendor2,
  Vendor3,
  Vendor4,
  Vendor5,
  Vendor6,
];

export const preferences = [
  {
    image: a1,
    title: 'HYGIENE',
    description:
      'Good hygiene is the secret ingredient in every perfect plate of chaat!',
    color: '#3FA025',
  },
  {
    image: a2,
    title: 'TASTE',
    description: "It's the ultimate balance of flavors, isn't it?",
    color: '#3FA025',
    scaleUp: true,
  },
  {
    image: a3,
    title: 'HOSPITALITY',
    description: 'Chaat vendor’s stall feels like the calm in the storm.',
    color: '#3FA025',
  },
];

export const blogPosts = [
  {
    image: Blog1,
    title: 'Samosa: the crispy, spicy hug you need on a bad day.',
    author: 'Anjika',
    date: 'January 1st, 2025',
  },
  {
    image: Blog2,
    title: 'A good pani puri is like a burst of happiness in your mouth.',
    author: 'Anjika',
    date: 'January 1st, 2025',
  },
  {
    image: Blog3,
    title: 'If happiness had a flavor, it would be bhel puri.',
    author: 'Anjika',
    date: 'January 1st, 2025',
  },
];

export const vendors = [
  {
    image: a7,
    title: 'VADA PAU SELLER',
    item: 'Vada Pau',
  },
  {
    image: a4,
    title: 'GOOGHNI SELLER',
    item: 'Googhni',
  },
  {
    image: dosa, //a6
    title: 'DOSA SELLER',
    item: 'Dosa and Idli',
  },
  {
    image: puchka,
    title: 'PUCHKA SELLER',
    item: 'Chanachur Garam',
  },
  {
    image: chana,
    title: 'CHANACHUR SELLER',
    item: 'Chanachur Garam',
  },
];

export const categoryVendors = [
  { image: CategoryVendor1, title: 'Vada Pau' },
  { image: CategoryVendor2, title: 'Dosa' },
  { image: CategoryVendor3, title: 'Puchka' },
  { image: CategoryVendor4, title: 'Momo' },
];
