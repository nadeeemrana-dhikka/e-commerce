class ApiResponse {
    statusCode: number;
    data: any;
    message: string;
    success: boolean;

    constructor(statusCode: number, data: any, message: string = "Success") {
        this.statusCode = statusCode; // Set the statusCode property
        this.data = data; // Set the data property
        this.message = message; // Set the message property
        this.success = statusCode < 400; // Set the success property based on the statusCode
    }
}

export { ApiResponse }; // Export the ApiResponse class
