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
      { id: 1, title: 'Московский офис', path: '#'},
      { id: 2, title: 'Екатеринбург', path: '#'},
      { id: 3, title: 'Красногорск', path: '#'},
    ]
},
    {id: 2, title: 'Сообщения', path: '#', icon: MessageIcon},
    {id: 3, title: 'Пользователи', path: '#', icon: userIcon},
    {id: 4, title: 'Подрядчики', path: '#', icon: ContractorIcon},
    {id: 5, title: 'Календарь', path: '#', icon: CalendarIcon},
    {id: 6, title: 'Статистика', path: '#', icon: DiagramIcon},
];
  
  // Пример данных для меню
  
