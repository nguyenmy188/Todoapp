import { Component,OnInit,EventEmitter } from '@angular/core';
import { CheckboxControlValueAccessor, CheckboxRequiredValidator } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TodoItem } from './interfaces/todo-item';
import { TodoListService } from './services/todo-list.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  titleApp:string= "hello";
  title: string;
  todoList: TodoItem[];
  item: TodoItem;

  constructor(private todoListServer: TodoListService) {}

  ngOnInit():void {
    this.todoList = this.todoListServer.getTodoList();
    console.log(this.todoList);
  }

  completeItem(item) : void {
    const changes = {
      title: item.title,
      completed: !item.completed,
    }
    console.log(item);
    this.todoListServer.updateItem(item, changes);
   }

  addItem(title:string):void {
    console.log("add item", title);
    if (title !=="") {
      this.todoListServer.addItem({title, completed: false});
      console.log("addItem:",this.todoListServer);
    }
    else{
      alert("please add text");
    }
    this.title="";
  }

  removeItem(item):void{
    this.todoListServer.deleteItem(item);
    console.log("removeItem",this.todoListServer);
  }

  removeCompletedItem(TodoItem) : void {
    let n = this.todoList.length;
    console.log(n);
    for ( let i= n-1; i >= 0; i-- ) {
      console.log(i);
      console.log(n);
      if (this.todoList[i].completed == true) {
      this.todoListServer.deleteItem(this.todoList[i]);
      }
    }
  }


  //   this.todoListServer.deleteCompletedItem(item);
  // }

}
