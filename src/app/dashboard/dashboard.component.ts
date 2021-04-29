import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DataService } from '../data.service';
import { Segment } from '../models/segment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss',
    '../shared/components/form-controls/form-controls.scss',
  ],
})
export class DashboardComponent implements OnInit {
  @ViewChildren('tablesContainerRef') tablesContainerRef: QueryList<ElementRef>;
  segments: Segment[] = [];
  selectedSegment: string;
  popupToggle: boolean = false;
  popupType: string;
  onHover: boolean = false;
  searchString: string = '';
  constructor(
    private renderer: Renderer2,
    private ref: ChangeDetectorRef,
    private dataService: DataService
  ) {}

  ngOnInit() {
    if (sessionStorage.getItem('segmentData')) {
      this.segments = JSON.parse(sessionStorage.getItem('segmentData'));
    } else {
      this.segments = this.dataService.segments.slice(0);
    }
  }

  toggleSegmentPopup(value?, type?, id?) {
    this.popupToggle = !this.popupToggle;
    if (type) {
      this.popupType = type;
    }
    if (id) {
      this.selectedSegment = id;
    }
    if (value) {
      if (this.popupType == 'segment') {
        value.id = this.segments.length == 0 ? '0' : '' + this.segments.length;
        this.segments.push(value);
        //this.dataService.segments = this.segments.slice(0);
        sessionStorage.setItem('segmentData', JSON.stringify(this.segments));
      } else {
        this.segments
          .filter((segment) => {
            return segment.id == this.selectedSegment;
          })[0]
          .tables.push(value);
        sessionStorage.setItem('segmentData', JSON.stringify(this.segments));
        //this.dataService.segments = this.segments.slice(0);
        console.log(JSON.stringify(this.segments));
      }
    }
  }
  setTableDisplay(segment, index) {
    this.renderer.setStyle(
      this.tablesContainerRef.get(index).nativeElement,
      'display',
      'grid'
    );
    this.ref.detectChanges();
    let cardCount,
      totalSpace,
      space,
      val,
      cardWidth = 80,
      usedCardCount;
    cardCount = Math.floor(
      this.tablesContainerRef.get(index).nativeElement.offsetWidth / cardWidth
    );
    totalSpace =
      this.tablesContainerRef.get(index).nativeElement.offsetWidth -
      cardCount * cardWidth;
    space = 50;
    val = '';
    for (let j = 1; j <= cardCount + 1; j++) {
      val += 'auto ';
    }
    val = val.substring(0, val.length - 1);

    this.renderer.setStyle(
      this.tablesContainerRef.get(index).nativeElement,
      'grid-template-columns',
      val
    );
    this.renderer.setStyle(
      this.tablesContainerRef.get(index).nativeElement,
      'grid-column-gap',
      '' + space + 'px'
    );
    this.renderer.setStyle(
      this.tablesContainerRef.get(index).nativeElement,
      'grid-row-gap',
      '' + 20 + 'px'
    );

    usedCardCount = cardCount;
    if (segment.tables.length + 1 < usedCardCount) {
      this.renderer.setStyle(
        this.tablesContainerRef.get(index).nativeElement,
        'display',
        'flex'
      );
    } else {
      this.renderer.setStyle(
        this.tablesContainerRef.get(index).nativeElement,
        'display',
        'grid'
      );
    }
  }
  scrollToView(segment) {
    let targetEle = document.getElementById(segment);
    let pos = targetEle.style.position;
    let top = targetEle.style.top;
    targetEle.style.position = 'relative';
    targetEle.style.top = '-20px';
    targetEle.scrollIntoView({ behavior: 'smooth', block: 'start' });
    targetEle.style.top = top;
    targetEle.style.position = pos;
  }
}
