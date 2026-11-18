import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { UsersStore } from '../user-data-acces/users.store';
import { UserDraft } from '../domain/user.model';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  imports:[FormField],
  styleUrl: './users-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent {
  private readonly store = inject(UsersStore);

  readonly users = this.store.users;
  readonly total = this.store.total;



  readonly userModel = signal<UserDraft>({
  name: '',
  email: '',
  role: 'Viewer',
});

readonly userForm = form(this.userModel, path => {
  required(path.name);
  minLength(path.name, 3);

  required(path.email);
  email(path.email);

  required(path.role);
});

onSubmit(event: SubmitEvent): void {
  event.preventDefault();

  if (!this.userForm().valid()) {
    return;
  }

  this.store.addUser(this.userModel());

  this.userModel.set({
    name: '',
    email: '',
    role: 'Viewer',
  });
}

}
