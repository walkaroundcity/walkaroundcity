export class CustomError extends Error {
  constructor(public name: string, message?: string, ...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }

    this.message = message || name
  }
}

export const AlreadyRegisteredError = new CustomError(
  "AlreadyRegistered",
  "User is already registered"
)
