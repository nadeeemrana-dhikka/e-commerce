class ApiError extends Error {
    statusCode: number;
    data: any;
    success: boolean;
    errors: any[];

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: any[] = [],
        stack: string = ""
    ) {
        super(message); // Call the parent class constructor (Error)
        this.statusCode = statusCode; // Set the statusCode property
        this.data = null; // Initialize data property to null
        this.message = message; // Set the error message
        this.success = false; // Set success property to false
        this.errors = errors; // Set errors property to the provided errors array

        if (stack) {
            this.stack = stack; // If a stack trace is provided, set it
        } else {
            Error.captureStackTrace(this, this.constructor); // Otherwise, capture the current stack trace
        }
    }
}

export { ApiError }; // Export the ApiError class
