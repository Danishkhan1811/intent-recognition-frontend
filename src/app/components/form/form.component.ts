import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormComponent implements OnInit {
  intentForm!: FormGroup;
  submitted = false;
  submitSuccess = false;
  isSubmitting = false;

  // Inject HttpClient
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.intentForm = this.fb.group({
      intentName: ['', Validators.required],
      trainingPhrases: this.fb.array([this.fb.control('', Validators.required)]),
      response: ['', Validators.required],
    });
  }

  get trainingPhrases() {
    return this.intentForm.get('trainingPhrases') as FormArray;
  }

  addTrainingPhrase() {
    this.trainingPhrases.push(this.fb.control('', Validators.required));
  }

  removeTrainingPhrase(index: number) {
    if (this.trainingPhrases.length > 1) {
      this.trainingPhrases.removeAt(index);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.intentForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  isTrainingPhraseInvalid(index: number): boolean {
    const control = this.trainingPhrases.at(index);
    return control.invalid && (control.dirty || control.touched);
  }

  isTrainingPhrasesInvalid(): boolean {
    return this.trainingPhrases.invalid && (this.trainingPhrases.dirty || this.trainingPhrases.touched);
  }

  async onSubmit() {
    if (this.intentForm.valid) {
      this.isSubmitting = true;
      this.submitted = false;

      try {
        // POST form data to backend
        const response = await this.http
          .post('http://localhost:3000/api/intents', this.intentForm.value)
          .toPromise(); // Make sure to replace the URL with your backend API endpoint

        console.log('Response from backend:', response);

        this.submitted = true;
        this.submitSuccess = true;
        this.intentForm.reset();
        this.initForm(); // Reset to initial state with one empty training phrase
      } catch (error) {
        this.submitted = true;
        this.submitSuccess = false;
        console.error('Error submitting form:', error);
      } finally {
        this.isSubmitting = false;
      }
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.intentForm.controls).forEach((key) => {
        const control = this.intentForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
