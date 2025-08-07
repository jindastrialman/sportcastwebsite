import { Injectable } from "@angular/core";
import { MatchType } from '../enums/match-type-enum';

@Injectable({providedIn: 'root'})
export class SportTypeConverter
{
    translateSportType(sport: MatchType)
    {
        switch(sport)
        {
            case MatchType.F1:
                return "F1";

            case MatchType.NFL:
                return "NFL";

            case MatchType.basketball:
                return "Баскетболл";
            
            case MatchType.football:
                return "Футболл";
            
            case MatchType.hokkey:
                return "Хоккей";
            
            case MatchType.tennis:
                return "Теннис";

            default:
                return "";
        }
    }
}