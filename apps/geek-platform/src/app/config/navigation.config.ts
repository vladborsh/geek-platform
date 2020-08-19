import { NavigationInterface } from '@geek-platform/ui';
import { Routes } from '../enums/route.enum';

export const HOME_NAVIGATION: NavigationInterface[] = [
  {
    label: 'Welcome',
    route: `/${Routes.HOME}`,
  },
  {
    label: 'Quiz',
    route: `/${Routes.HOME}/${Routes.QUIZ}`,
  },
  {
    label: 'Editor',
    route: `/${Routes.HOME}/${Routes.EDITOR}`,
  },
];
