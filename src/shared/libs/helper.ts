export class Helper {

    static getWindowDimensions(): { width: number, height: number } {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    static generateRandomID(): string {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 12; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
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
    static getUserID(): string {
        return localStorage.getItem('userID');
    }
}

export const currencyMap = {
    "TL": "₺",
    "USD": "$"
}