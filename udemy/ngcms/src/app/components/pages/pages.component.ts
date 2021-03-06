import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageService } from '../../services/page.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  private param: any;
  private pageBody: any;
  public sidebar: string;
  public hasSidebar: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private pageServce: PageService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.param = params['page'];

      if (this.param === undefined) {
        this.param = 'home';
        this.title.setTitle('CMS');
      } else {
        this.title.setTitle(this.param.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
      }

      this.pageServce.getPage(this.param).subscribe(page => {
        if (page === 'PageNotFound') {
          this.router.navigateByUrl('');
        }
        this.pageBody = page['content'];
        if (page['hasSidebar'] === 'true') {
          this.hasSidebar = true;
          this.sidebarService.getSidebar().subscribe(sidebar => {
            this.sidebar = sidebar['contentName'];
          });
        } else {
          this.hasSidebar = false;
        }
      });
    });
  }

}
