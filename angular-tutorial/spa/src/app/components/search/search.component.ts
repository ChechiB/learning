import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})

export class SearchComponent implements OnInit {

  heroes: any[] = [];
  index: number;
  text: string;

  constructor(private activatedRoute: ActivatedRoute, private _heroesService: HeroesService, private router: Router) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.text = params['text'];
      this.heroes = this._heroesService.searchHeroe(params['text']);
    });
  }

  showHeroDetail( idx: number ): any{
    this.router.navigate( ['/heroes', idx] );
  }
}
