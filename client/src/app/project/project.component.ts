// project.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  constructor(private http: HttpClient) { }

  createProject() {
    this.http.post('https://your-api-base-url/api/projects/create', {}).subscribe(response => {
      console.log('Project created successfully:', response);
    }, error => {
      console.error('Error creating project:', error);
    });
  }

  addUserToProject(projectId: number, username: string) {
    this.http.post(`https://your-api-base-url/api/projects/addUserToProject/${projectId}`, { username }).subscribe(response => {
      console.log('User added to project successfully:', response);
    }, error => {
      console.error('Error adding user to project:', error);
    });
  }
}
