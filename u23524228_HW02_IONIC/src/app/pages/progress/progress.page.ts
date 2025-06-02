import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
  standalone: false,
})
export class ProgressPage implements OnInit {
  completedWorkouts: string[] = []; // List of completed workouts

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadCompletedWorkouts(); // Load completed workouts when the page initializes
  }

  ionViewWillEnter() {
    // This lifecycle hook is triggered every time the page is about to be displayed
    this.loadCompletedWorkouts();
  }

  // Load completed workouts from local storage
  loadCompletedWorkouts() {
    const storedWorkouts = localStorage.getItem('completedWorkouts');
    this.completedWorkouts = storedWorkouts ? JSON.parse(storedWorkouts) : [];
  }

  // Reset progress by clearing the completed workouts
  resetProgress() {
    this.completedWorkouts = []; // Clear the array
    localStorage.setItem('completedWorkouts', JSON.stringify([])); // Reinitialize the key in local storage
    alert('Progress has been reset!');
  }
}
