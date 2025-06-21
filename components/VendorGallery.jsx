'use client';

import { useVendorContext } from '@/contexts/VendorContext';
import VendorCard from './VendorCard';

export default function VendorGallery() {
  const { vendorsData, totalPages, currentPage, setCurrentPage, loading } =
    useVendorContext();

  return (
    <VendorCard
      data={vendorsData}
      totalPages={totalPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      loading={loading}
    />
  );
}
