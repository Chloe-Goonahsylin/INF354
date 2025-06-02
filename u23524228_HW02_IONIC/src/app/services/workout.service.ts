import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workouts = [
    {
      id: 1,
      name: 'Weight Loss',
      description: 'Burn calories and lose weight.',
      exercises: ['Jumping Jacks', 'Burpees', 'Mountain Climbers'],
      duration: '30 minutes',
      equipment: ['Yoga Mat']
    },
    {
      id: 2,
      name: 'Muscle Gain',
      description: 'Build muscle and strength.',
      exercises: ['Push-ups', 'Pull-ups', 'Deadlifts'],
      duration: '45 minutes',
      equipment: ['Dumbbells', 'Barbell']
    },
    {
      id: 3,
      name: 'Cardio',
      description: 'Improve cardiovascular health.',
      exercises: ['Running', 'Cycling', 'Rowing'],
      duration: '40 minutes',
      equipment: ['Treadmill', 'Stationary Bike']
    },
    {
      id: 4,
      name: 'Yoga',
      description: 'Enhance flexibility and reduce stress.',
      exercises: ['Downward Dog', 'Warrior Pose', 'Child’s Pose'],
      duration: '60 minutes',
      equipment: ['Yoga Mat']
    },
    {
      id: 5,
      name: 'HIIT',
      description: 'High-intensity interval training for maximum calorie burn.',
      exercises: ['Sprints', 'Jump Squats', 'Plank Jacks'],
      duration: '20 minutes',
      equipment: ['None']
    },
    {
      id: 6,
      name: 'Strength Training',
      description: 'Build strength and endurance.',
      exercises: ['Bench Press', 'Squats', 'Deadlifts'],
      duration: '50 minutes',
      equipment: ['Barbell', 'Dumbbells']
    },
    {
      id: 7,
      name: 'Pilates',
      description: 'Improve core strength and posture.',
      exercises: ['Roll-Up', 'Leg Circles', 'Plank'],
      duration: '45 minutes',
      equipment: ['Mat', 'Resistance Bands']
    },
    {
      id: 8,
      name: 'Stretching',
      description: 'Increase flexibility and prevent injuries.',
      exercises: ['Hamstring Stretch', 'Quad Stretch', 'Shoulder Stretch'],
      duration: '15 minutes',
      equipment: ['None']
    }
  ];

  getWorkouts() {
    return this.workouts;
  }

  getWorkoutById(id: number) {
    return this.workouts.find((workout) => workout.id === id);
  }
}