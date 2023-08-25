import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontClub';

  items:MenuItem[] =[];

  constructor()
  {
    this.items = this.items = [
      {
        label:'Nuevo',
        icon: 'pi pi-save',
        items:[{
          label:'Socio',
          icon: 'pi pi-fw pi-plus',
          routerLink:'socio/nuevo'
        },
        {
          label:'Jugador',
          icon: 'pi pi-fw pi-plus',
          routerLink:'jugador/nuevo'
        },
        {
          label:'Entrenador',
          icon: 'pi pi-fw pi-plus',
          routerLink:'entrenador/nuevo'
        },
        {
          label:'Categoria',
          icon: 'pi pi-fw pi-plus',
          routerLink:'categoria/nuevo'
        },
        {
          label:'Cuota',
          icon: 'pi pi-fw pi-plus',
          routerLink:'cuota/nuevo'
        },
        {
          label:'Cancha',
          icon: 'pi pi-fw pi-plus',
          routerLink:'cancha/nuevo'
        },
        {
          label:'Partido',
          icon: 'pi pi-fw pi-plus',
          routerLink:'partido/nuevo'
        },
        { 
          label:'Bufé',
          icon: 'pi pi-fw pi-plus',
          routerLink:'bufe/nuevo'
        } 
    
      ]},
      {
      label:'Ingresos',
      icon: 'pi pi-fw pi-dollar',
      items:[{
        label:'Cuota',
        icon: 'pi pi-fw pi-list',
        items:[{

        label:'Jugador',
        icon: 'pi pi-fw pi-plus-circle',
        routerLink:'jugadorCuota/nuevo'
      },
      {
        label:'Socio',
        icon: 'pi pi-fw pi-plus-circle',
        routerLink:'socioCuota/nuevo'

        }
      ]},

      {
      label:'Alquiler',
      icon: 'pi pi-fw pi-list',
      items:[{
        label:'Cancha',
        icon: 'pi pi-fw pi-plus-circle',
        routerLink:'alquilerCancha/nuevo'
      },
      {
        label:'Bufe',
        icon: 'pi pi-fw pi-plus-circle',
        routerLink:'alquilerBufe/nuevo'
      }
      ]

      },
      {
        label:'Partido',
        icon: 'pi pi-fw pi-plus',
        routerLink:'partidoIngresos/nuevo'

        }

    ]},

      {
        label:'Egresos',
        icon: 'pi pi-fw pi-minus-circle',
        items:[{
          label:'Cuota entrenador',
          icon: 'pi pi-fw pi-minus',
          routerLink:'pagoCuotaEntrenador/nuevo'
        },
        {
          label:'Pago servicio',
          icon: 'pi pi-fw pi-minus',
          routerLink:'pagoServicio/nuevo'
         },
         {
           label:'Partido',
           icon: 'pi pi-fw pi-minus',
           routerLink:'partidoEgresos/nuevo'
          }
        
        ]},
        {
         label:'Cuenta',
         icon: 'pi pi-edit',
         routerLink:'cuenta/nuevo'
        }
  ]

  }
}


