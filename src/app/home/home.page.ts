import { Component, Inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageServiceModule} from 'angular-webstorage-service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  taskList = [];
  taskName: string;
  public data: any = [];
  constructor(
             // @Inject(LOCAL_STORAGE) private storage: WebStorageService,
              public alertController: AlertController) { }

  addTask() {
    if (this.taskName.length > 0) {
      const task = this.taskName;
      this.taskList.push(task);
     // this.saveInLocal(1, task);
      this.taskName = '';
    }
  }

  // saveInLocal(key, val): void {
  //  console.log('recieved= key:' + key + 'value:' + val);
  //  this.storage.set(key, val);
  //  this.data[key] = this.storage.get(key);
  // }

  // getFromLocal(key): void {
  //  console.log('recieved= key:' + key);
  //  this.data[key] = this.storage.get(key);
  //  console.log(this.data);
  // }
  async deleteTask(index) {
    const alert = await this.alertController.create({
      header: 'Delete Task?',
      message: 'Are you really absolutely sure to delete your task?',
      buttons: [{ text: 'Cancel', role: 'cancel' },
      {
        text: 'Delete', handler: data => {
          this.taskList.splice(index, 1);
        }
      }
      ]
    });
    await alert.present();
  }

  async updateTask(index) {
    const alert = await this.alertController.create({
      header: 'Update Task?',
      message: 'Type in your new task to update.',
      inputs: [{ name: 'editTask', placeholder: 'Task' }],
      buttons: [{ text: 'Cancel', role: 'cancel' },
      {
        text: 'Update', handler: data => {
          this.taskList[index] = data.editTask;
        }
      }
      ]
    });
    await alert.present();
  }
}
