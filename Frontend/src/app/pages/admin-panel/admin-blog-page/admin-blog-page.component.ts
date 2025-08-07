import { Component, inject } from '@angular/core';
import { AdminPanelSidebarComponent } from '../../../components/admin-panel/admin-panel-sidebar/admin-panel-sidebar.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/AuthService';
import { MatchType } from '../../../enums/match-type-enum';
import { NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { NewsService } from '../../../services/NewsService';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { DataServiceAdress } from "../../../environmentals";

@Component({
  selector: 'app-admin-blog-page',
  imports: [AdminPanelSidebarComponent,NgFor, MatInputModule, MatFormFieldModule, FormsModule, MatSelectModule],
  templateUrl: './admin-blog-page.component.html',
  styleUrl: './admin-blog-page.component.scss'
})
export class AdminBlogPageComponent {
  matchTypes: any;
  blogs: any;
  fileInfo: any;
  selectedBlog: any;
  formBlog: any;
  newsService = inject(NewsService);
  newBlog = {
    id: 0,
    title: "Новая новость",
    pictureUrl: "",
    sportType: 1,
    link: "",
    blogType: "",
    seoTitle: "",
    seoDescription: "",
    priority: 0,
    content: {
      textContent: "",
    }
  }

  constructor(private http: HttpClient, private router: Router, private auth: AuthService)
  {
    this.refreshBlogs();
    this.matchTypes = Object.keys(MatchType).filter((item) => {
      return isNaN(Number(item));
    });
    this.formBlog = this.newBlog;
  }

   onSelect(blog: any)
    {
      this.selectedBlog = blog;
      this.formBlog = blog;
      
      if(Number(blog.sportType))
        this.formBlog.sportType = MatchType[blog.sportType];
    }

  async onUpdateButtonPressed()
  {
    await this.uploadFile(this.fileInfo);
    this.setNewFromForm();
    this.newBlog.id = this.selectedBlog.id;
    this.http.put(`http://${DataServiceAdress}/api/blog/`+ this.selectedBlog.id, this.newBlog).subscribe(x=> {this.refreshBlogs();console.log(x);});
  }

  async onCreateButtonPressed()
  {
    await this.uploadFile(this.fileInfo);
    this.setNewFromForm();
    this.http.post(`http://${DataServiceAdress}/api/blog`, this.newBlog).subscribe(x=> {this.refreshBlogs();console.log(x);});
  }
  setNewFromForm()
  {
    this.newBlog.title = this.formBlog.title;
    this.newBlog.pictureUrl = this.formBlog.pictureUrl;
    this.newBlog.blogType = this.formBlog.blogType;
    this.newBlog.sportType = this.formBlog.sportType;
    this.newBlog.seoDescription = this.formBlog.seoDescription;
    this.newBlog.seoTitle = this.formBlog.seoTitle;
    this.newBlog.link = this.formBlog.link;
    this.newBlog.content.textContent = this.formBlog.content.textContent;
  }
  onDelete(){
    this.http.delete(`http://${DataServiceAdress}/api/Blog/` + this.selectedBlog.id).subscribe(x=> this.refreshBlogs());
  }

  async uploadFile(file : File) {
      if (file) {
        const fileName = this.fileInfo?.name;
        const formData = new FormData();
        formData.append("file", file);
        const upload$ = this.http.post(`http://${DataServiceAdress}/api/Image/load`, formData);
        this.formBlog.pictureUrl = `http://${DataServiceAdress}/api/Image?id=`+ file.name;
        upload$.subscribe((x: any) => 
        {
          console.log("image loaded");
        });
      }
      
    }

    uploadPost()
    {
      this.http.post(`http://${DataServiceAdress}/api/Blog`, this.newBlog).subscribe(x=> {this.refreshBlogs();});
    }

    refreshBlogs()
    {
      this.http.get(`http://${DataServiceAdress}/api/Blog/GetLast`).subscribe(x => 
        {
          this.blogs = x;
          console.log(this.blogs);
        });
    }
    onFileSelected(event: any) {
      this.fileInfo = event.target.files[0] as File;
    }
    
}
