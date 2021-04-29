import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'popup-add-segment',
  templateUrl: './add-segment.component.html',
  styleUrls: [
    './add-segment.component.scss',
    '../../form-controls/form-controls.scss',
  ],
})
export class AddSegmentComponent implements OnInit {
  @ViewChild('emojiDropdown') emojiDropdown: ElementRef;
  @ViewChild('emojiRef') emojiRef: ElementRef;
  @ViewChild('colorDropdown') colorDropdown: ElementRef;
  @ViewChild('colorRef') colorRef: ElementRef;
  @ViewChild('selectedColor') selectedColor: ElementRef;

  @Input() type: string;
  @Output() value = new EventEmitter();

  selectedEmoji: any = {
    colons: ':camera_with_flash:',
    emoticons: [],
    hidden: [],
    id: 'camera_with_flash',
    keywords: [],
    name: 'Camera with Flash',
    native: '📸',
    set: 'twitter',
    sheet: [27, 21],
    shortName: 'camera_with_flash',
    shortNames: ['camera_with_flash'],
    skinVariations: [],
    text: '',
    unified: '1F4F8',
  };
  emojiDropdownToggle: boolean = false;
  colorDropdownToggle: boolean = false;
  colors: string[] = [];
  form: FormGroup;
  tableForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private renderer: Renderer2
  ) {}

  @HostListener('document:click', ['$event.target'])
  clickedOutside(target): void {
    if (!this.emojiDropdown.nativeElement.contains(target)) {
      this.emojiDropdownToggle = false;
      this.emojiRef.nativeElement.blur();
    } else {
      this.emojiRef.nativeElement.focus();
    }
    if (this.type == 'table')
      if (!this.colorDropdown.nativeElement.contains(target)) {
        this.colorDropdownToggle = false;
      }
  }

  ngOnInit() {
    this.colors = this.sharedService.colors;
    this.initForm();
  }
  initForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      icon: [this.selectedEmoji, Validators.required],
      description: [null, Validators.required],
      tables: [[]],
      id: [[]],
    });
    this.tableForm = this.formBuilder.group({
      name: [null, Validators.required],
      icon: [this.selectedEmoji, Validators.required],
      color: ['rgba(0, 84, 209, 1)', Validators.required],
    });
  }
  onSubmit() {
    if (this.type == 'segment') this.value.emit(this.form.value);
    else this.value.emit(this.tableForm.value);
  }
  onCancel() {
    this.value.emit();
  }
  addEmoji(event) {
    this.selectedEmoji = event.emoji;
    if (this.type == 'segment')
      this.form.patchValue({ icon: this.selectedEmoji });
    else this.tableForm.patchValue({ icon: this.selectedEmoji });
    this.emojiDropdownToggle = false;
  }
  onSelectColor(color: string) {
    this.tableForm.patchValue({ color: color });
    this.renderer.setStyle(
      this.selectedColor.nativeElement,
      'background-color',
      color
    );
    this.colorDropdownToggle = false;
  }
  toggleEmojiDropdown() {
    this.emojiDropdownToggle = !this.emojiDropdownToggle;
  }
  toggleColorDropdown() {
    this.colorDropdownToggle = !this.colorDropdownToggle;
    console.log(this.colorDropdownToggle);
  }
}
