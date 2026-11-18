import { Injectable, computed, signal } from '@angular/core';
import { INITIAL_USERS } from './users.seed';
import { User, UserDraft } from '../domain/user.model';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private readonly usersState = signal<User[]>([...INITIAL_USERS]);

  readonly users = this.usersState.asReadonly();
  readonly total = computed(() => this.usersState().length);

addUser(draft: UserDraft): User {
  const currentUsers = this.usersState();

  const nextId =
    currentUsers.reduce(
      (maxId, user) => Math.max(maxId, user.id),
      0,
    ) + 1;

  const newUser: User = {
    ...draft,
    id: nextId,
  };

  this.usersState.update(users => [...users, newUser]);

  return newUser;
}
  updateUser(_id: number, _draft: UserDraft): boolean {
    throw new Error('TODO: implementar edición de usuario');
  }

  removeUser(_id: number): boolean {
    throw new Error('TODO: implementar eliminación de usuario');
  }
}
