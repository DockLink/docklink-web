import type { ComponentProps, ReactNode } from "react";
import { cn } from "./cn";

/** Shared look for text inputs, selects and textareas. 16px text stops iOS zoom-on-focus. */
export const controlClasses =
  "block w-full rounded-control border border-line-strong bg-white px-3.5 text-base text-ink shadow-hairline " +
  "placeholder:text-subtle transition-[border-color,box-shadow] duration-(--dur-fast) ease-standard " +
  "hover:border-ink/25 focus:border-brand focus:outline-none focus:ring-[3px] focus:ring-brand/20 " +
  "aria-invalid:border-danger aria-invalid:focus:ring-danger/20 " +
  "disabled:cursor-not-allowed disabled:bg-surface disabled:text-subtle";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: (describedBy: string | undefined, invalid: boolean) => ReactNode;
};

/** Label, control, hint and error wired together for screen readers. */
export function Field({ id, label, hint, error, optional, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children(describedBy, Boolean(error))}
      {hint && !error && (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = Omit<ComponentProps<"input">, "id"> & Omit<FieldProps, "children">;

export function Input({ id, label, hint, error, optional, className, ...rest }: InputProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} optional={optional}>
      {(describedBy, invalid) => (
        <input
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className={cn(controlClasses, "h-11", className)}
          {...rest}
        />
      )}
    </Field>
  );
}

type SelectProps = Omit<ComponentProps<"select">, "id"> & Omit<FieldProps, "children">;

export function Select({ id, label, hint, error, optional, className, children, ...rest }: SelectProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} optional={optional}>
      {(describedBy, invalid) => (
        <select
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className={cn(controlClasses, "h-11 appearance-none bg-[length:16px] bg-[right_0.875rem_center] bg-no-repeat pr-10", className)}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
          {...rest}
        >
          {children}
        </select>
      )}
    </Field>
  );
}

type TextareaProps = Omit<ComponentProps<"textarea">, "id"> & Omit<FieldProps, "children">;

export function Textarea({ id, label, hint, error, optional, className, rows = 4, ...rest }: TextareaProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} optional={optional}>
      {(describedBy, invalid) => (
        <textarea
          id={id}
          rows={rows}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className={cn(controlClasses, "py-2.5", className)}
          {...rest}
        />
      )}
    </Field>
  );
}
