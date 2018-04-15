import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { WordpressService } from '../../services/wordpress.service';
import { PostPage } from '../post/post';

/**
 * Generated class for the SexualTransitionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sexual-transition',
  templateUrl: 'sexual-transition.html',
})
export class SexualTransitionPage {


  ionViewDidLoad() {
    console.log('ionViewDidLoad SexualTransitionPage');
  }

  posts: Array<any> = new Array<any>();
  morePagesAvailable: boolean = true;
  loggedUser: boolean = false;

  categoryId: number;
  categoryTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public wordpressService: WordpressService
    ) {}

  ionViewWillEnter() {
    

    //if we are browsing a category
    this.categoryId = this.navParams.get('id');
    this.categoryTitle = this.navParams.get('title');

    if(!(this.posts.length > 0)){
      let loading = this.loadingCtrl.create();
      loading.present();

      this.wordpressService.getRecentPostsST(this.categoryId)
      .subscribe(data => {
        for(let post of data){
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
          this.posts.push(post);
        }
        loading.dismiss();
      });
    }
  }

  postTapped(event, post) {
		this.navCtrl.push('PostPage', {
		  item: post
		});
  }

  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true;

    this.wordpressService.getRecentPostsST(this.categoryId, page)
    .subscribe(data => {
      for(let post of data){
        if(!loading){
          infiniteScroll.complete();
        }
        post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
        this.posts.push(post);
        loading = false;
      }
    }, err => {
      this.morePagesAvailable = false;
    })
  }

  /**
    * Allow navigation to the QuizPage for this category
    * (We supply the actual quiz category as this method's parameter,
    * to the QuizPage
    *
    * @public
    * @method quiz
    * @param param 		{any} 			Navigation data to send to the next page
    * @return {None}
    */
   quiz(param: any): void {
    this.navCtrl.push('QuizPage', param);
  }

  goToLogin(){
    this.navCtrl.push('HomePage');
  }


}
