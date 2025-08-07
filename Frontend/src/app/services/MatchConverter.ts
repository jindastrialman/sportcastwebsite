import { Injectable } from "@angular/core";
import { CommentatorDto, MatchDto, TeamDto } from '../components/user-space/game-schedule-element/match-info';

@Injectable({providedIn: 'root'})
export class MatchConverter
{
    convertToMatchDto(matches: any) : Array<MatchDto>
    {
        const result = matches?.map((x: any) =>
            {
                const match = new MatchDto();
                const commentator = new CommentatorDto();
                const team1 = new TeamDto();
                const team2 = new TeamDto();

                team1.teamName = x.matchTeams[0].team.name;
                team1.imageUrl = x.matchTeams[0].team.teamLogoUrl;

                team2.teamName = x.matchTeams[1].team.name;
                team2.imageUrl = x.matchTeams[1].team.teamLogoUrl;

                commentator.name = x.matchCasters[0].caster.name +' '+ x.matchCasters[0].caster.surname;
                
                match.startTime = new Date(x.matchStartTime+"+03:00");
                
                match.matchId = x.id;
                match.commetator = commentator;
                match.teams = [team1,team2];

                return match;
            });
        return result ?? new Array<MatchDto>;
    }
}