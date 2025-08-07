import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { interval, mergeMap, lastValueFrom, Observable } from 'rxjs';
import { DataServiceAdress } from "../environmentals";
@Injectable({providedIn: 'root'})
export class ScheduleService implements OnInit
{
    http = inject(HttpClient);
    private matches: any;
    private lastUpdated: Date;
    constructor()
    {
        this.lastUpdated = new Date();
    }
    async ngOnInit() {
        this.matches = ((await lastValueFrom(this.http.get(`http://${DataServiceAdress}/api/Schedule?matchType=-1`))) as any);
    }
    async loadMatches()
    {
        this.lastUpdated = new Date();
        this.matches = ((await lastValueFrom(this.http.get(`http://${DataServiceAdress}/api/Schedule?matchType=-1`))) as any);
    }
    async getMatches()
    {

        const datetimeNow = new Date();
        if(!this.matches || (datetimeNow.getTime() - this.lastUpdated.getTime()) / 1000 > 30)
        {
            await this.loadMatches();
        }
        return this.matches;
    }
}