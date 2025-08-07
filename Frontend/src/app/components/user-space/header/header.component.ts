import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  router = inject(Router);
  activatedButtonId = "-2";

  async ngOnInit()
  {
    const url = this.router.url.split("/");
    if(url.length == 0)
    {
      this.activatedButtonId = "-2";
    }
    else if(url.at(-2)=="schedule")
    {
      this.activatedButtonId = "-1"
    }
    else if(url.at(-2)=="news")
    {
      this.activatedButtonId = url.at(-1)?? "0";
    }
  }

  onNavigationClick = (event: any) =>
    {
      switch(event.currentTarget.id)
      {
        case "-2":
          this.router.navigate([""]);
          break;
        case "-1":
          this.router.navigate([""]).then(()=>this.router.navigate(["schedule","-1"]));
          break;
        case "0":
          this.router.navigate([""]).then(()=>this.router.navigate(["news","0"]));
          break;
        case "1":
          this.router.navigate([""]).then(()=>this.router.navigate(["news","1"]));
          break;
        case "2":
          this.router.navigate([""]).then(()=>this.router.navigate(["news","2"]));
          break;
        case "3":
          this.router.navigate([""]).then(()=>this.router.navigate(["news","3"]));
          break;
        case "4":
          this.router.navigate([""]).then(()=>this.router.navigate(["news","4"]));
          break;
        case "5":
          this.router.navigate([""]).then(()=>this.router.navigate(["news","5"]));
          break;
      }
    }
}
