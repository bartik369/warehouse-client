import {faUser, faEnvelope, faLocationDot, faHandshake, 
    faChartSimple, faWarehouse } from "@fortawesome/free-solid-svg-icons";


export const headerMenuData = [
    {id: 1, title: 'Ссылка 1', url: '#'},
    {id: 2, title: 'Ссылка 2', url: '#'},
    {id: 3, title: 'Ссылка 3', url: '#'},
    {id: 4, title: 'Ссылка 4', url: '#'},
];
export const sidebarMenuData = [
    {id: 1, title: 'Локации', url: '#', icon: faWarehouse, locations: [
      { id: 1, subTitle: 'Московский офис', url: '#'},
      { id: 2, subTitle: 'Екатеринбург', url: '#'},
      { id: 3, subTitle: 'Красногорск', url: '#'},
    ]
},
    {id: 2, title: 'Сообщения', url: '#', icon: faEnvelope},
    {id: 3, title: 'Пользователи', url: '#', icon: faUser},
    {id: 3, title: 'Подрядчики', url: '#', icon: faHandshake},
];