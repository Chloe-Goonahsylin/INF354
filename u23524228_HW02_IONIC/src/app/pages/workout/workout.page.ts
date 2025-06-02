import { Component } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workouts',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
  standalone: false,
})
export class WorkoutPage {
  workouts: any[] = []; // List of all workouts
  selectedWorkout: any = null; // Holds the selected workout details

  constructor(private workoutService: WorkoutService, private router: Router) {}

  ngOnInit() {
    this.workouts = this.workoutService.getWorkouts(); // Fetch workouts from the service
  }

  // Display details of the selected workout
  viewDetails(workout: any) {
    this.selectedWorkout = workout;
  }

  // Go back to the list of workout types
  goBack() {
    this.selectedWorkout = null;
  }

  // Mark the selected workout as completed
  markAsCompleted() {
    const workoutName = `${this.selectedWorkout.name} Program - Completed`;
    const completedWorkouts = JSON.parse(localStorage.getItem('completedWorkouts') || '[]');

    // Avoid duplicates in the completed workouts list
    if (!completedWorkouts.includes(workoutName)) {
      completedWorkouts.push(workoutName);
      localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts)); // Save to local storage
      alert(`${this.selectedWorkout.name} marked as completed!`);
    } else {
      alert(`${this.selectedWorkout.name} is already marked as completed.`);
    }

    this.goBack(); // Return to the list of workouts
  }

  // Check if the selected workout is already completed
  isWorkoutCompleted(): boolean {
    const workoutName = `${this.selectedWorkout.name} Program - Completed`;
    const completedWorkouts = JSON.parse(localStorage.getItem('completedWorkouts') || '[]');
    return completedWorkouts.includes(workoutName);
  }
}