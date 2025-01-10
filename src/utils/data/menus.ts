import userIcon from '../../assets/elements/user-icon.svg';
import MessageIcon from '../../assets/elements/messages-icon.svg';
import LocationIcon from '../../assets/elements/location-icon.svg';
import ContractorIcon from '../../assets/elements/contractor-icon.svg';
import CalendarIcon from '../../assets/elements/calendar-icon.svg';
import DiagramIcon from '../../assets/elements/diagram-icon.svg';
import LibraryIcon from '../../assets/elements/library-icon.svg';


export const headerMenuData = [
    {id: 1, title: 'Ссылка 1', path: '#'},
    {id: 2, title: 'Ссылка 2', path: '#'},
    {id: 3, title: 'Ссылка 3', path: '#'},
    {id: 4, title: 'Ссылка 4', path: '#'},
];
export const profileMenuData = [
    {id: 1, title: 'Админ-панель', path: '/device/add'},
    {id: 2, title: 'Профиль', path: '#'},
    {id: 3, title: 'Сброс пароля', path: '#'},
    {id: 4, title: 'Настройки', path: '#'},
];
export const sidebarMenuData = [
      { id: 1,  title: 'Локации', path: '#', icon: LocationIcon, subMenu: [
      { id: 1, title: 'Московский офис', path: '/moscow'},
      { id: 2, title: 'Екатеринбург', path: '/ekb'},
      { id: 3, title: 'Красногорск', path: '/krasnogrsk'},
    ]
},

    {id: 2, title: 'Сообщения', path: '/messages', icon: MessageIcon},
    {id: 3, title: 'Пользователи', path: '/users', icon: userIcon},
    {id: 4, title: 'Подрядчики', path: '/contractors', icon: ContractorIcon},
    {id: 5, title: 'Календарь', path: '/calendar', icon: CalendarIcon},
    {id: 6, title: 'Статистика', path: '/sttistic', icon: DiagramIcon},
    {id: 7, title: 'База знаний', path: '/library', icon: LibraryIcon},
];

  
