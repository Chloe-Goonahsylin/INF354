import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: false,
})
export class DetailsPage implements OnInit {
  workout: any; // holds the details of the selected workout

  constructor(
    private route: ActivatedRoute, // uused to access parameters
    private workoutService: WorkoutService // fetch workout data
  ) {}

  ngOnInit() {
    // gets the workout ID from the  parameters
    const id = +this.route.snapshot.paramMap.get('id')!;
    // fetchs the workout details using the ID
    this.workout = this.workoutService.getWorkoutById(id);
  }
}