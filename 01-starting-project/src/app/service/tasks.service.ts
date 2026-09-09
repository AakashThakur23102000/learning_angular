import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class TasksService {
    private dummyTasks = [
        {
            id: 't1',
            userId: 'u1',
            title: 'Master Angular',
            summary:
                'Learn all the basic and advanced features of Angular & how to apply them.',
            dueDate: '2025-12-31',
        },
        {
            id: 't2',
            userId: 'u3',
            title: 'Build first prototype',
            summary: 'Build a first prototype of the online shop website',
            dueDate: '2024-05-31',
        },
        {
            id: 't3',
            userId: 'u3',
            title: 'Prepare issue template',
            summary:
                'Prepare and describe an issue template which will help with project management',
            dueDate: '2024-06-15',
        },
    ]

    constructor() {
        const tasksArr = localStorage.getItem("task")
        if (tasksArr) {
            this.dummyTasks = JSON.parse(tasksArr);
        }
    }

    getTasksList() {
        return this.dummyTasks
    }

    addTasksInList(item: {
        id: string;
        userId: string;
        title: string;
        summary: string;
        dueDate: string;
    }
    ) {
        this.dummyTasks.push(item);
        this.saveDataToLocalHost()
    }

    getListAfterItemCompleted(id: string) {
        this.dummyTasks = this.dummyTasks.filter(item => item.id !== id);
        this.saveDataToLocalHost()
        return this.dummyTasks
    }


    private saveDataToLocalHost() {
        localStorage.setItem("task", JSON.stringify(this.dummyTasks))
    }
}
