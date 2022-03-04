import { Permission } from '@prisma/client';
import { allPermissions } from '../auth/permissions';

type DiffableProperty = string | number | boolean;

type Change = {
  name: string;
  fromValue?: DiffableProperty;
  toValue?: DiffableProperty;
};

type DiffProps<T> = {
  selector: (obj: T) => DiffableProperty;
  omitValues?: boolean;
  name: string;
};

export function diff<T>(from: T, to: T, props: DiffProps<T>[]): Change[] {
  const changes: Change[] = [];
  for (const prop of props) {
    const fromValue = prop.selector(from);
    const toValue = prop.selector(to);
    if (fromValue !== toValue) {
      if (prop.omitValues) {
        changes.push({ name: prop.name });
      } else {
        changes.push({
          name: prop.name,
          fromValue,
          toValue,
        });
      }
    }
  }
  return changes;
}

function formatChange(change: Change) {
  if (change.fromValue || change.toValue) {
    return `${change.name}: ${change.fromValue} -> ${change.toValue}`;
  } else {
    return change.name;
  }
}

export function formattedDiff<T>(
  from: T,
  to: T,
  props: DiffProps<T>[],
  additionalChanges: Change[] = [],
): string {
  const changes = [...diff(from, to, props), ...additionalChanges];
  if (!changes.length) {
    return '(Brak zmian do pokazania.)';
  } else {
    return '(' + changes.map(formatChange).join(', ') + ')';
  }
}

export function havePermissionsChanged(
  prevPermissions: Permission[],
  newPermissions: Permission[],
): boolean {
  return allPermissions.some(
    (perm) => prevPermissions.includes(perm) !== newPermissions.includes(perm),
  );
}
