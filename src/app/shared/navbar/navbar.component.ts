import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { TranslateService ,TranslateModule} from '@ngx-translate/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;

  public isCollapsed = true;
  public lang: any;
  loadArabic = false;
  dynamicCSSUrlar: string;

  @ViewChild("navbar-cmp", { static: false }) button;

  constructor(public sanitizer: DomSanitizer,location: Location, private renderer: Renderer2, private element: ElementRef, private router: Router, public translateService: TranslateService) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;

    this.lang = translateService.addLangs(['en', 'ta','ur'])
    translateService.setDefaultLang('en')
    const browserLang = translateService.getBrowserLang()
    translateService.use(browserLang.match(/en|ta|ur/) ? browserLang : 'en')
    console.log(browserLang)
    
  }

  ngOnInit() {
    // path for style page of urdu language
    this.dynamicCSSUrlar = '../../assets/css/style-ar.css'
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });
    
  }

  dynamicLoadingar(){
    this.loadArabic = true;
  }

  switchLanguage(lang:string){
    this.translateService.use(lang)
    document.documentElement.lang=lang
    if (lang == 'ur')
    {
      console.log("inside load Arabic")
      this.loadArabic = true;
    }
    else
    {
      this.loadArabic = false;

    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  };
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }

  }

}
