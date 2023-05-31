import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Todos } from 'src/app/models/todos';
import { LoginService } from 'src/app/services/login.service';
import { ToDoListService } from 'src/app/services/to-do-list.service';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit{

  todos!: Todos[];
  filteredTodosByUserId: Todos[] | undefined;
  filteredTdos: Todos[] | undefined;
  userId!: number;
  showListOptions: any[] = [5, 15, 25, 'all'];
  optionForm!: FormGroup;
  lengthTodos: any;

  constructor(public toDoListService: ToDoListService,
              public loginService: LoginService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog){}

  ngOnInit() {

    this.initOptionForm();

    this.toDoListService.getToDoList().subscribe((response) => {
      this.todos = response;
      this.filterTodosByUser();
    });

  }

  filterTodosByUser() {
    this.userId = this.loginService.getUser()?.id;
    this.filteredTodosByUserId =  this.todos.filter((todo) => todo.userId === this.userId);
    this.filteredTdos = this.filteredTodosByUserId ;
  }

  showListOption() {

    this.optionForm.value.hideDoneTodos
    ?  this.filteredTdos = this.filteredTodosByUserId?.filter((todo) => todo.completed == false)
    : this.filteredTdos = this.filteredTodosByUserId ;

    if(this.optionForm.value.selectedOption !== 'all') {
      this.filteredTdos = this.filteredTdos?.slice(0 , this.optionForm.value.selectedOption)
    }

  }

  initOptionForm() {
    this.optionForm = this.formBuilder.group({
      selectedOption: 'all',
      hideDoneTodos: false
    });
  }

  changeTodoStatus(todo: Todos) {
    todo.completed = !todo.completed
    this.showListOption()
  }



  openTodoDialog() :void {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {})

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
         const todoToAdd : Todos = {
        'userId' : this.userId,
        'id' : this.todos[this.todos.length - 1].id + 1,
        'title' : result,
        'completed' : false
      }

      this.filteredTodosByUserId?.unshift(todoToAdd);
      this.showListOption();
      Swal.fire(`Tood added succsesfuly!`);
      }
    });

  }




}
