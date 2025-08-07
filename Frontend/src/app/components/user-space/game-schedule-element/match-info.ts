import { DataServiceAdress } from "../../../environmentals";

export class TeamDto
{
    public imageUrl: string = `http://${DataServiceAdress}/api/Image?id=2024-08-22_20.36.18.png`;
    public teamName: string = "CoolColowaya Teem";
}
export class CommentatorDto
{
    public name: string = "дядя володя";
}
export class MatchDto
{
    public teams: Array<TeamDto> = new Array<TeamDto>(new TeamDto(), new TeamDto());
    public commetator: CommentatorDto = new CommentatorDto();
    public startTime: Date = new Date();
    public matchId: Number = 0;
}