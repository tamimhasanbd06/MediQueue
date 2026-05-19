import Banner from '@/Components/Banner';
import WhyChooseMediQueue from '@/Components/Why_Choose_MediQueue';
import Testimonials from '@/Components/Testimonials';
import Top_Tutors from '@/Components/Top_Tutors';
import React from 'react';

const page = () => {
  return (
    <div>
      <Banner/>
      <Top_Tutors/>
<WhyChooseMediQueue/>
<Testimonials/>

    </div>
  );
};

export default page;