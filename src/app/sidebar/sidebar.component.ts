import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path : '/home',     title:'Home',           icon:'nc-layout-11',   class:''},
    { path: '/student',     title: 'Student',         icon:'nc-single-02',       class: '' },
    { path: '/staffDetails',     title: 'Staff Details',         icon:'nc-bank',       class: '' },
    { path: '/health',     title: 'Health',         icon:'nc-send',       class: '' },
    { path: '/assessment',     title: 'Assessment',         icon:'nc-paper',       class: '' },
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-button-power',       class: '' },
    { path : '/settings',     title:'Settings',           icon:'nc-settings-gear-65',   class:''},
    { path : '/settingStepper',     title:'Configuration',           icon:'nc-settings-gear-65',   class:''},
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
