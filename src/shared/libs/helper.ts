export class Helper {

    static getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    static validateEmail(email: string): boolean {
        var re = /\S+@\S+\.\S+/;
        return re.test(email)
    }
}