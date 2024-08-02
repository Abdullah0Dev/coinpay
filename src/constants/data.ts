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
    title: 'Trusted by millions of people, part of one part',
    route: 'next',
    active: 1,
  },
  {
    source: images.onboardImage2,
    title: 'Spend money abroad, and track your expense',
    route: 'next',
    active: 2,
  },
  {
    source: images.onboardImage3,
    title: 'Receive Money From Anywhere In The World',
    route: 'next',
    active: 3,
  },
];



export {
    onboardingData
}