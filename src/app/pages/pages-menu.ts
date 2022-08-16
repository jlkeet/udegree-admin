import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
  {
    title: 'Editor',
    icon: 'edit-outline',
    children: [
      {
        title: 'Course',
        link: '/pages/editors/course-edit',
      },
      {
        title: 'Degree',
        link: '/pages/editors/faculty-edit',
      },
      {
        title: 'Major',
        link: '/pages/editors/department-edit',
      },
      {
        title: 'Conjoint',
        link: '/pages/editors/conjoint-edit',
      },
    ],
  },
  {
    title: 'Administration',
    icon: 'settings-outline',
    children: [
      {
        title: 'Manage Users',
        link: '/pages/administration/manage-users',
      },
    ],
  },
];
