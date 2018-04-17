import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

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
    private storage2: Storage, private alertCtrl: AlertController) {
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
      console.log("Submitted");
      var total_score = 0;
      var total_qs = this.items.length;
      for(var key in this.scores) {
        var value = this.scores[key];
        total_score += value;
      }
      console.log(total_score);

      this.storage.get('authToken').then((token) => {
        this.http
          .get('http://womanovaapp.com/quiz_update.php?t_token='+ token + '&total_score=' + total_score + '&total_qs=' + total_qs + '&ts=' + Date.now())
          .subscribe((data: any) => {
            if(data && data['success']){
              console.dir(data);
              this.presentAlert(total_score, total_qs);
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

    mcqAnswer(idx, ans){
      console.log(idx, ans);
      if(this.items[idx]['is_correct'] == ans){
        this.scores[idx] = 1;
      }
      else{
        this.scores[idx] = 0;
      }
    }
    presentAlert(total_score, total_qs) {
      if(total_qs > 0 && total_score/total_qs > 0.5){
        let alert = this.alertCtrl.create({
          title: 'Good job!',
          subTitle: 'You got ' + total_score.toString() + " out of " + total_qs.toString() + " questions correct! Check out your profile!",
          buttons: ['Dismiss']
        });
        alert.present();
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Better luck next time!',
          subTitle: 'You got ' + total_score.toString() + " out of " + total_qs.toString() + " questions correct!",
          buttons: ['Dismiss']
        });
        alert.present();
      }
      
    }
}
