import React from 'react';
import DeliverySection from '../../components/sections/DeliverySection';
import ProcessSection from '../../components/sections/ProcessSection';
import VedErpSection from '../../components/sections/VedErpSection';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Products = () => {
  useDocumentTitle('Products');
  return (
    <>
      <h1 className="sr-only">Products</h1>
      <VedErpSection />
      <DeliverySection
        hiddenLinks={['/Products#ved-erp', 'https://www.utkarshavivah.com', 'https://www.travobuddy.com']}
      />
      <ProcessSection />
    </>
  );
};

export default Products;
