import {ImageSourcePropType} from 'react-native';
import images from './images';

export interface OnboardingItemProps {
  source?: ImageSourcePropType;
  title?: string;
  route?: string;
  active: number;
}

const onboardingData: OnboardingItemProps[] = [
  {
    source: images.onboardImage1,
    title: 'أرسل أموالك من منزلك بأمان و سهولة',
    route: 'التالي',
    active: 1,
  },
  {
    source: images.onboardImage2,
    title: 'عملائنا هم الدليل على جودة خدماتنا ',
    route: 'التالي',
    active: 2,
  },
  {
    source: images.onboardImage3,
    title: 'تابع تحويلاتك السابقة في أي وقت',
    route: 'التالي',
    active: 3,
  },
];



export {
    onboardingData
}