import { Injectable } from "@angular/core";
import { MatchType } from '../enums/match-type-enum';
import moment from 'moment';
import 'moment/locale/ru';

@Injectable({providedIn: 'root'})
export class DateFormatter
{
    formatDate(date: Date)
    {
        var moment = require('moment'); // require
        moment.locale('ru');
        var time = moment(date).format("dddd, D MMMM");
        return time;
    }
    
    formatDateForSchedule(date: Date)
    {
        var moment = require('moment'); // require
        moment.locale('ru');
        var time = moment(date).fromNow();
        return time;
    }
    formatDateForReplays(date: Date)
    {
        var moment = require('moment'); // require
        moment.locale('ru');
        var time = moment(date).format("HH:mm, D MMM");
        return time;
    }
}