import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef} from '@angular/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent  {
  constructor(
    public dialogRef: MatDialogRef<SpinnerComponent>
  ) { }

  onNoClick (): void {
    this.dialogRef.close();
  }
}
