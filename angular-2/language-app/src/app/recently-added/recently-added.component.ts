import { Component, OnInit } from '@angular/core';
import {TranslationService} from "../../services/translation.service";

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

  constructor(private translationService: TranslationService) {
  }

  testService() {
    this.translationService.translate("ru", "en", "задача").subscribe(data => {
      console.log(data["text"])
    });
  }

  ngOnInit(): void {
  }

}
