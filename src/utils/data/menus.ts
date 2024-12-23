import userIcon from '../../assets/elements/user-icon.svg';
import MessageIcon from '../../assets/elements/messages-icon.svg';
import LocationIcon from '../../assets/elements/location-icon.svg';
import ContractorIcon from '../../assets/elements/contractor-icon.svg';
import CalendarIcon from '../../assets/elements/calendar-icon.svg';
import DiagramIcon from '../../assets/elements/diagram-icon.svg';


export const headerMenuData = [
    {id: 1, title: 'Ссылка 1', url: '#'},
    {id: 2, title: 'Ссылка 2', url: '#'},
    {id: 3, title: 'Ссылка 3', url: '#'},
    {id: 4, title: 'Ссылка 4', url: '#'},
];
export const sidebarMenuData = [
      { id: 1,  title: 'Локации', path: '#', icon: LocationIcon, subMenu: [
      { id: 1, title: 'Московский офис', path: '/moscow'},
      { id: 2, title: 'Екатеринбург', path: '/ekb'},
      { id: 3, title: 'Красногорск', path: '/krasnogrsk'},
    ]
},
{ id: 2,  title: 'Процессы', path: '#', icon: LocationIcon, subMenu: [
    { id: 1, title: 'Перемещения', path: '/move'},
    { id: 2, title: 'Выдача', path: '/take'},
    { id: 3, title: 'Прием', path: '/get'},
    { id: 4, title: 'Инвентаризация', path: '/inventory'},
  ]
},
    {id: 3, title: 'Сообщения', path: '/messages', icon: MessageIcon},
    {id: 4, title: 'Пользователи', path: '/users', icon: userIcon},
    {id: 5, title: 'Подрядчики', path: '/contractors', icon: ContractorIcon},
    {id: 6, title: 'Календарь', path: '/calendar', icon: CalendarIcon},
    {id: 7, title: 'Статистика', path: '/sttistic', icon: DiagramIcon},
];

  
