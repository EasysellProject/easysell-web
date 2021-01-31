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

    static getDMYTime(date: Date): string {
        let day = date.getDate();
        let dayStr = '' + day;
        if (day < 10)
            dayStr = '0' + day
        let month = date.getMonth() + 1;
        let monthStr = '' + month;
        if (month < 10)
            monthStr = '0' + month
        let yearStr = date.getFullYear() + ''
        return dayStr + '/' + monthStr + '/' + yearStr
    }
}