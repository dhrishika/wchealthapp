import { Component } from '@angular/core';
import { NavParams, MenuController } from 'ionic-angular';

@Component({
  templateUrl: 'primary-tabs.html'
})
export class PrimaryTabsPage {

  tabs: any;
  t2Root: any = 'RemindersPage';
  t1Root: any = 'HomePage';
  t3Root: any = 'SymptomDiaryHomePage';
  mySelectedIndex: number;


  constructor(public navParams: NavParams, public menu: MenuController) {

    this.tabs = [
      {title: "Home", root: "HomePage", icon: "home"},
      {title: "Symptom Diary", root: "SymptomDiaryHomePage", icon: "clipboard"},
      {title: "Reminders", root: "RemindersPage", icon: "notifications"}
    ];

    this.mySelectedIndex = navParams.data.tabIndex || 0;
    // let getComponentFromNavPArams = navParams.get('componentFromNavParams');
    // if (getComponentFromNavPArams != undefined) {
    //   this.tabs[0].root = getComponentFromNavPArams; //override first tab which set actual page
    // } else {
    //   this.tabs[0].root = "HomePage"; // if no set, then home page
    // }
  }

}
