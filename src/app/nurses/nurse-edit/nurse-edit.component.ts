import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Nurse } from '../nurse';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';

/* NgRx */
import { Store } from '@ngrx/store';
import { State, getCurrentNurse } from '../state/nurse.reducer';
import * as NurseActions from '../state/nurse.actions';

@Component({
  selector: 'app-nurse-edit',
  templateUrl: './nurse-edit.component.html',
  styleUrls: ['./nurse-edit.component.css']
})
export class NurseEditComponent implements OnInit {
  pageTitle = 'Nurse Edit';
  errorMessage = '';

  nurseForm!: FormGroup;
  nurse$!: Observable<Nurse | null>;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private store: Store<State>, private fb: FormBuilder) { 

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      firstName: {
        required: 'Nurse name is required.',
        minlength: 'Nurse name must be at least three characters.',
        maxlength: 'Nurse name cannot exceed 50 characters.'
      },
      dob: {
        required: 'Nurse DOB is required.'
      },
      numberOfPatients: {
        range: 'The Nurse number Of Patients between 0 and 15 (highest).'
      }
    };
    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // // Define the form group
    // this.nurseForm = this.fb.group({
    //   firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    //   dob: ['', Validators.required],
    //   numberOfPatients: ['', NumberValidators.range(0, 15)],
    // });
    this.nurseForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      dob: ['', Validators.required],
      numberOfPatients: ['', NumberValidators.range(0, 15)],
    });




    // Watch for changes to the currently selected Nurse
    this.nurse$ = this.store.select(getCurrentNurse)
      .pipe(
        tap(currentNurse => this.displayNurse(currentNurse))
        // tap(currentNurse => console.log(currentNurse))
      );

    // Watch for value changes for validation
    // this.nurseForm.valueChanges.subscribe(
    //   () => this.displayMessage = this.genericValidator.processMessages(this.nurseForm)
    // );
  }
  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.nurseForm);
  }

  displayNurse(nurse: Nurse | null): void {
    if (nurse) {
      // Reset the form back to pristine
      this.nurseForm.reset();

      // Display the appropriate page title
      if (nurse.nurseId === 0) {
        this.pageTitle = 'Add Nurse';
      } else {
        this.pageTitle = `Edit Nurse: ${nurse.firstName}`;
      }

      // Update the data on the form
      this.nurseForm.patchValue({
        firstName: nurse.firstName,
        lastName: nurse.lastName,
        dob: nurse.dob,
        numberOfPatients: nurse.numberOfPatients
      });
    }
  }

  cancelEdit(nurse: Nurse): void {
    // Redisplay the currently selected Nurse
    // replacing any edits made
    this.displayNurse(nurse);
  }

  deleteNurse(nurse: Nurse): void {
    if (nurse && nurse.nurseId) {
      if (confirm(`Really delete the Nurse: ${nurse.firstName}?`)) {
        this.store.dispatch(NurseActions.deleteNurse({ nurseId: nurse.nurseId }));
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(NurseActions.clearCurrentNurse());
    }
  }
  saveNurse(originalNurse: Nurse): void {
    if (this.nurseForm.valid) {
      if (this.nurseForm.dirty) {
        // Copy over all of the original Nurse properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const nurse = { ...originalNurse, ...this.nurseForm.value };

        if (nurse.nurseId === 0) {
          this.store.dispatch(NurseActions.createNurse({ nurse }));
        } else {
          this.store.dispatch(NurseActions.updateNurse({ nurse }));
        }
      }
    }
  }
}
