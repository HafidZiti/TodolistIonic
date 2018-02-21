import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {TodoItem, TodoList} from "../modules/Todoliste";

import {v4 as uuid} from 'uuid';
import {Observable} from "rxjs/Observable";
import {observableToBeFn} from "rxjs/testing/TestScheduler";


@Injectable()
export class ServicesFirebaseSeviceProvider {

  TodoRef$: AngularFireList<TodoList>;

  constructor(private db: AngularFireDatabase) {

    this.TodoRef$ = this.db.list('/list-tasks/')
  }

  public getListsFire(): Observable<TodoList[]> {
    return this.TodoRef$.valueChanges();
  }

  public insertListeFire(_dataNewListe): Promise<void> {
    const todoListRef$ = this.TodoRef$.push(<TodoList>{});

    const todoList: TodoList = {
      uuid: todoListRef$.key,
      name: _dataNewListe,
      items: new Set()
    };

    console.log("path", '/list-tasks/' + todoListRef$.key + '/items/');
    return todoListRef$.set(todoList);
  }

  public updateListeFire() {

  }

  public insertItemFire(_todolist: TodoList, _data_clavier): Promise<void> {
    const todoListItemRef$ = this.db.list('/list-tasks/' + _todolist.uuid + '/items/').push(<TodoItem>{});
    const item: TodoItem = {
      uuid: todoListItemRef$.key,
      name: _data_clavier.titre,
      desc: _data_clavier.desc,
      complete: false
    };
    return todoListItemRef$.set(item);
  }

  public GetItmesListeByKeyFirebase(todolist: TodoList): AngularFireList<TodoItem> {
    return this.db.list(`/todo-lists/${todolist.uuid}/items/`);
  }

  public GetItemsList(_todoliste: TodoList): Observable<TodoList> {
    const itemslist: AngularFireObject<TodoList> = this.db.object('/list-tasks/' + _todoliste.uuid + '/');
    return itemslist.valueChanges();
  }

  public removeItemFromList(_todolist:TodoList, id_item):Promise<void>{
    return this.db.list('/list-tasks/' + _todolist.uuid + '/items/').remove(id_item);
  }

  public updateItemFromList(_todolist:TodoList, _item:TodoItem):Promise<void>{
    return this.db.list('/list-tasks/' + _todolist.uuid + '/items/').set(_item.uuid,_item);
  }


}
