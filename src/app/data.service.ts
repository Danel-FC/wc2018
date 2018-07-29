import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl:string=`http://131.1.5.114/wc18srv/api`;
  //`http://localhost:50271/api`;
  //`http://131.1.5.114/wc18srv/api`;

  games:any[];
  standings:any[];
  loginInfo:any=null;
  editingGame:any={Score1:0,Score2:0};
  predictions:any[];

  constructor(private http: HttpClient) { 
    // this.login('Eli','rm13',(success)=>{});
    this.getGames();
    this.getStandings();
    
  }

  getImg(team:string):string{
    return `../../wc18/assets/${team.toLowerCase().replace(' ','-')}.png`;
  }
  
  get groupTables():any[]{
    let teamDic:any[]=[];
    let groupDic:any[]=[];
    let team1:any;
    let team2:any;
    let group:any;
    let groupGames = this.games.filter(i=>i.Score1!=undefined && i.Score2!=undefined && i.Stage===1);
    for (let i=0;i<groupGames.length;i++) {
      group = groupDic.find(g=>g.group===groupGames[i].Group);
      if(!group){
        group={group:groupGames[i].Group,teams:[]};
        groupDic.push(group);
      }
      team1 = teamDic.find(t=>t.name===groupGames[i].Team1);
      if (!team1) {
        team1={name:groupGames[i].Team1, group:groupGames[i].Group, w:0,d:0,l:0,s:0,c:0,p:0};
        teamDic.push(team1);
      }
      team2 = teamDic.find(t=>t.name===groupGames[i].Team2);
      if (!team2) {
        team2={name:groupGames[i].Team2, group:groupGames[i].Group, w:0,d:0,l:0,s:0,c:0,p:0};
        teamDic.push(team2);
      }

      if(groupGames[i].Score1===groupGames[i].Score2){
        team1.d++;
        team2.d++;
        team1.p++;
        team2.p++;
      }else if(groupGames[i].Score1>groupGames[i].Score2){
        team1.w++;
        team2.l++;
        team1.p+=3;
      }else{
        team1.l++;
        team2.w++;
        team2.p+=3;
      }
      
      team1.s+=groupGames[i].Score1;
      team2.c+=groupGames[i].Score1;
      team1.c+=groupGames[i].Score2;
      team2.s+=groupGames[i].Score2;

      if(!group.teams.find(t=>t.name===team1.name)){
        group.teams.push(team1);
      }
      if(!group.teams.find(t=>t.name===team2.name)){
        group.teams.push(team2);
      }
    } 
    console.log(teamDic);
    console.log(groupDic);
    for (let i=0;i<groupGames.length;i++) {
      group = groupDic.find(g=>g.group===groupGames[i].Group);
      group.teams.sort(function(obj1, obj2) {
        // Ascending: first age less than the previous
        if(obj1.p > obj2.p)
          return -1;
        if(obj1.p < obj2.p)
          return 1;
        let gd1=obj1.s-obj1.c;// (obj2.s-obj2.c)-(obj1.s-obj1.c);
        let gd2=obj2.s-obj2.c;
        if(gd1>gd2)
          return -1;
        if(gd1<gd2)
          return 1;
        return obj2.s-obj1.s;
      });
    }
    return groupDic;
  }

  get isLoggedIn():boolean{
    return this.loginInfo;
  }

  login(user:string,pass:string,callback: (success: boolean)=>void){
    this.http.get(`${this.baseUrl}/Login?user=${user}&pass=${pass}`).subscribe((i:any)=>
    {
      let li = JSON.parse(i);
      if(li.Token)
        this.loginInfo=li;
      else
        this.loginInfo=null;
      callback(this.loginInfo);
      this.getPredictions();
    });
  }

  logout(){
    this.loginInfo=null;
    this.predictions=null;
  }

  getGames(){
    this.http.get(`${this.baseUrl}/Games`).subscribe((i:any)=>{
      this.games=JSON.parse(i);
      this.getPredictions();
    });
  }

  getStandings(){    
    this.http.get(`${this.baseUrl}/Standings`).subscribe((i:any)=>this.standings=JSON.parse(i));
  }

  predict(mid:number,score1:number,score2:number,callback: (success: boolean)=>void){
    this.http.get(`${this.baseUrl}/Games?uid=${this.loginInfo.ID}&token=${this.loginInfo.Token}&mid=${mid}&score1=${score1}&score2=${score2}`).subscribe((i:any)=>
    {
      let li = JSON.parse(i);
      callback(li.error==0);   
      this.getPredictions();   
    });
  }

  getPredictions(){
    if(!this.loginInfo)
      return;
    this.http.get(`${this.baseUrl}/Games?uid=${this.loginInfo.ID}&token=${this.loginInfo.Token}`).subscribe((i:any)=>{
      let li = JSON.parse(i);
      if(!li.error)
        this.predictions=li;
        this.setGamePredictions();
    });
  }

  setGamePredictions(){
    if(!this.games||!this.predictions)
      return;
    for(let i=0;i<this.games.length;i++){
      let pr = this.predictions.find(p=>
        p.MatchID==this.games[i].ID
      );
      this.games[i].prediction=pr;
    }
  }
}

