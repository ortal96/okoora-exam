import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.scss']
})
export class AddTodoDialogComponent implements OnInit {

  addTodoForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initFormAddTodo();
  }

  closeDialog(todo? : string): void {
    this.dialogRef.close(todo);
  }

  initFormAddTodo() :void {
      this.addTodoForm = this.formBuilder.group({
        title: [null, Validators.required],
      })
  }


  submit(form : FormGroup) {
    form.markAllAsTouched();
    if (form.valid) {
      this.closeDialog(form.value.title);
    }
  }

}
