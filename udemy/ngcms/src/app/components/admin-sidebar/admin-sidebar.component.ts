import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
declare var CKEDITOR: any;

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  contentName: string;
  id: string;
  successMsg = false;

  constructor(
    private router: Router,
    private sidebarSesrvice: SidebarService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== '\"admin\"') {
      this.router.navigateByUrl('');
    }

    this.sidebarSesrvice.getSidebar().subscribe(res => {
      this.contentName = res['contentName'];
      this.id = res['id'];
      CKEDITOR.replace('content');
    });
  }

  editSidebar({value}) {
    value.contentName = CKEDITOR.instances.content.getData();
    this.sidebarSesrvice.putSidebar(value).subscribe(res => {
      this.successMsg = true;
      setTimeout(function() {
        this.successMsg = false;
      }.bind(this), 2000);
    });
  }

}
