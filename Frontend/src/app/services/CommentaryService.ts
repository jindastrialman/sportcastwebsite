import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { interval, mergeMap, lastValueFrom, Observable } from 'rxjs';
import { DataServiceAdress } from "../environmentals";

@Injectable({providedIn: 'root'})
export class CommentaryService
{
    http = inject(HttpClient);
    task: any;

    async getComments(matchId: number)
    {
        return ((await lastValueFrom(this.http.get(`http://${DataServiceAdress}/api/Commentary/MatchId/` + matchId))) as any)
    }
    async postComment(comment: any)
    {
    }
}