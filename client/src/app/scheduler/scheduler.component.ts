import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { scheduler } from "dhtmlx-scheduler";


@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "scheduler",
    styleUrls: ['./scheduler.component.css'],
    templateUrl: './scheduler.component.html'
})


export class SchedulerComponent implements OnInit {
    @ViewChild("scheduler_here", {static: true}) schedulerContainer!: ElementRef;


    ngOnInit() {
        scheduler.init(this.schedulerContainer.nativeElement, new Date(2023, 4, 15));
    }
}