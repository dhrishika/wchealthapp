import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WordpressService } from '../../services/wordpress.service';

/**
 * Generated class for the FibroidsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fibroids',
  templateUrl: 'fibroids.html',
})
export class FibroidsPage {


  ionViewDidLoad() {
    console.log('ionViewDidLoad FibroidsPage');
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

      this.wordpressService.getRecentPostsF(this.categoryId)
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
		this.navCtrl.push("PostPage", {
		  item: post
		});
  }

  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true;

    this.wordpressService.getRecentPostsF(this.categoryId, page)
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
    this.navCtrl.push("HomePage");
  }

  goHome(): void {
    this.navCtrl.setRoot('HomePage');
  }
}
