import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Config from '../config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
// The Wordpress service has the links to the categories from the wordpress websites which will even 
//get the recent posts if any post was uploaded.

@Injectable()
export class WordpressService {
  constructor(public http: Http){}

  getRecentPosts(categoryId:number, page:number = 36){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }
  // Genintal Concern Category
  getRecentPostsGenConc(categoryId:number, page:number = 19){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  // Plevic Floor Problems Category
  getRecentPostsPFP(categoryId:number, page:number = 39){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  // Breast Cancer Category
  getRecentPostsBC(categoryId:number, page:number = 41){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  // Colon Cancer Category
  getRecentPostsCoC(categoryId:number, page:number = 42){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  // Cervical Cancer Category
  getRecentPostsCeC(categoryId:number, page:number = 43){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  // Diabetes Category
  getRecentPostsD(categoryId:number, page:number = 44){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  // Heart Diseases Category
  getRecentPostsHD(categoryId:number, page:number = 45){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  // Stroke Category
  getRecentPostsS(categoryId:number, page:number = 51){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //Obesity category
  getRecentPostsO(categoryId:number, page:number = 52){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //High Blood Pressure category
  getRecentPostsHBP(categoryId:number, page:number = 53){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //Nutrition category
  getRecentPostsN(categoryId:number, page:number = 47){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //Exercise Category
  getRecentPostsE(categoryId:number, page:number = 48){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //Tobacco Category
  getRecentPostsT(categoryId:number, page:number = 70){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //Breast Problems category
  getRecentPostsBP(categoryId:number, page:number = 56){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //Fibroids Category
  getRecentPostsF(categoryId:number, page:number = 57){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //Pelvic Pain Category
  getRecentPostsPP(categoryId:number, page:number = 58){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //Infertility Category
  getRecentPostsI(categoryId:number, page:number = 59){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //Menopause Category
  getRecentPostsMeno(categoryId:number, page:number = 11){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //Hormonal Contraception Category
  getRecentPostsHC(categoryId:number, page:number = 60){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //IUD Category
  getRecentPostsIUD(categoryId:number, page:number = 61){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //Permanent Sterillization Category
  getRecentPostsPS(categoryId:number, page:number = 62){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //Mensurual Pain Category
  getRecentPostsMP(categoryId:number, page:number = 63){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //Abnormal Bleeding Category
  getRecentPostsAB(categoryId:number, page:number = 64){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //Others category
  getRecentPostsOthers(categoryId:number, page:number = 65){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //Sexual Transition Category
  getRecentPostsST(categoryId:number, page:number = 66){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //UTI catgory
  getRecentPostsUTI(categoryId:number, page:number = 68){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url +'&ts=' + Date.now())
    .map(res => res.json());
  }

  //Frequent Asked Questions Category
  getRecentPostsFaq(categoryId:number, page:number = 4){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?categories=' + page
      + category_url)
    .map(res => res.json());
  }


  getComments(postId:number, page:number = 1){
    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + "comments?post=" + postId
      + '&page=' + page
    )
    .map(res => res.json());
  }

  getAuthor(author){
    return this.http.get(Config.WORDPRESS_REST_API_URL 
       + "users/" + author
    )
    .map(res => res.json());
  }

  getPostCategories(post){
    let observableBatch = [];

    post.categories.forEach(category => {
      observableBatch.push(this.getCategory(category));
    });

    return Observable.forkJoin(observableBatch);
  }

  getCategory(category){
    return this.http.get(Config.WORDPRESS_REST_API_URL + "categories/" + category)
    .map(res => res.json());
  }

  createComment(postId, user, comment){
    let header: Headers = new Headers();
    header.append('Authorization', 'Bearer ' + user.token);

    return this.http.post(Config.WORDPRESS_REST_API_URL + "comments?token=" + user.token, {
      author_name: user.displayname,
      author_email: user.email,
      post: postId,
      content: comment
    },{ headers: header })
    .map(res => res.json());
  }
}
