import React from 'react';
import ImageCarousel from '../../components/GalleryCarasoul/ImageCarousel.component';
import PageHero from '../../components/ui/PageHero';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Gallery = () => {
  useDocumentTitle('Gallery');
  return (
    <>
      <PageHero title="Gallery" intro="Moments from our team and company events." />
      <section className="page py-7 sm:py-9">
        <ImageCarousel />
      </section>
    </>
  );
};

export default Gallery;
