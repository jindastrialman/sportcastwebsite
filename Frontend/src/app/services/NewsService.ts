import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { interval, mergeMap, lastValueFrom, Observable, map } from 'rxjs';
import { NewsType } from '../enums/news-type-enum';
import { DataServiceAdress } from "../environmentals";

@Injectable({providedIn: 'root'})
export class NewsService
{
    http = inject(HttpClient);
    task: any;
    constructor()
    {
    }
    async getMoreNews(sportType: Number = -1, NewsType: string = 'article', skip: Number = 0, take: Number = 3)
    {
        const result = await lastValueFrom(this.http.get(`http://${DataServiceAdress}/api/Blog?skip=${skip}&take=${take}&sportType=${sportType}&blogType=${NewsType}`)) as Array<any>;
        return result;
    }
}