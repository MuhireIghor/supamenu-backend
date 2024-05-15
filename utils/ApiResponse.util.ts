export default class ApiResponse {
    message: string;
    data: any;
    success: boolean;
    constructor(message, data, success) {
        this.message = message;
        this.data = data;
        this.success = success;

    }
    static success(message, data) {
        return new ApiResponse(message, data, true);
    }
    static error(message, data) {
        return new ApiResponse(message, data, false)
    }
}