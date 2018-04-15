import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

  public items : Array<any> = [];
  public storage: Storage;
  public item: any = [];
  public scores = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,public http   : HttpClient,
    private storage2: Storage) {
    this.storage = storage2;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
  }
  ionViewWillEnter() : void
    {
      console.log('ionViewWillEnter QuizPage');
      console.log(this.navParams);
      console.log(this.navParams.get("cat"));

        if(this.navParams.get("cat"))
        {
          var cat= this.navParams.get("cat");
          this.storage.get('authToken').then((token) => {
            this.http
              .get('http://womanovaapp.com/quiz.php?t_token='+ token + '&cat=' + cat + '&ts=' + Date.now())
              .subscribe((data: any) => {
                if(data && data['success']){
                  console.dir(data);
                  this.items = data['quizzes'];
                  this.item = data['quizzes'];
                }
                else{
                  console.dir(data);
                }

              },
                (error: any) => {
                  console.dir(error);
                });
          });
        }
        else
        {
          console.log("No category sent to quiz")
        }
    }
    submitQuiz(): void{
      console.log("BLA BLA zzzZZZZzzZZZZ");
      // var result = document.getElementsByClassName("quizzes");
      // console.log(result);
      var total_score = 0;
      for(var key in this.scores) {
        var value = this.scores[key];
        total_score += value;
        // do something with "key" and "value" variables
      }
      console.log(total_score);
    }

    mcqAnswer(idx, ans){
      console.log(idx, ans);
      if(this.items[idx]['is_correct'] == ans){
        this.scores[idx] = 1;
      }
      else{
        this.scores[idx] = 0;
      }
    }
}
