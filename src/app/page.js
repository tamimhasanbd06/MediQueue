import React from 'react';

import Banner from '@/Components/Banner';
import Top_Tutors from '@/Components/Top_Tutors';
import WhyChooseMediQueue from '@/Components/Why_Choose_MediQueue';
import HowItWorks from '@/Components/HowItWorks';
import LearningSupport from '@/Components/LearningSupport';
import SubjectHighlights from '@/Components/SubjectHighlights';
import Testimonials from '@/Components/Testimonials';
import HomeCallToAction from '@/Components/HomeCallToAction';
import ThemeToast from '@/Components/ThemeToast';

export const metadata = {
  title: 'Home',
};

const Page = () => {
  return (
    <div>
      <Banner />

      <Top_Tutors />

      <WhyChooseMediQueue />

      <HowItWorks />

      <LearningSupport />

      <SubjectHighlights />

      <Testimonials />

      <HomeCallToAction />

      <ThemeToast />
    </div>
  );
};

export default Page;