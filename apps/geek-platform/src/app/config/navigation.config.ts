import { NavigationInterface } from '@geek-platform/ui';
import { RouteUrls } from '../enums/route.enum';

export const HOME_NAVIGATION: NavigationInterface[] = [
  {
    label: 'Welcome',
    route: `/${RouteUrls.HOME}`,
  },
  {
    label: 'Quiz',
    route: `/${RouteUrls.HOME}/${RouteUrls.QUIZ}`,
  },
  {
    label: 'Assignment',
    route: `/${RouteUrls.HOME}/${RouteUrls.QUIZ_ASSIGNMENT}`,
  },
];
