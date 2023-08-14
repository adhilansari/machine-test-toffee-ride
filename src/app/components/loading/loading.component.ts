import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  constructor(private loadingService:LoadingService){}
  isLoading: Subject<boolean> = this.loadingService.isLoading;

}
