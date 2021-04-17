import "linear-equation-system"

interface SimpleLinearRegressionParams{
    b0:number,
    b1:number,
    coefficientOfDetermination:number
}

export class Algorithms{

    //Simple Linear Regression (one explanatory and one response variable)
    SimpleLinearRegression(response:number[], explanatory:number[]):SimpleLinearRegressionParams{
        if(response.length != explanatory.length){
            console.log("length of arrays for explanatory and response variables and different");
            return {b0:0, b1:0, coefficientOfDetermination:0};
        }
        var n = response.length
        var XxYSum = 0
        var XsqSum = 0
        var YsqSum = 0
        var Xsum = 0
        var Ysum = 0
        for(let i = 0; i < n; i++){
            Xsum = Xsum + explanatory[i];
            Ysum = Ysum + response[i];
            YsqSum = YsqSum + response[i]*response[i];
            XsqSum = XsqSum + explanatory[i]*explanatory[i];
            XxYSum = XxYSum + explanatory[i]*response[i];
        }
        var Sxy = XxYSum - (Xsum*Ysum/n)
        var Sxx = XsqSum - (Xsum*Xsum/n)
        var b1E = Sxy/Sxx
        var b0E = (Ysum/n) - b1E*(Xsum/n)
        var SSE = 0
        var SST = 0
        for(let i = 0; i < n; i++){
            SSE = SSE + Math.pow((response[i] - (explanatory[i]*b1E + b0E)), 2)
            SST = SST + Math.pow((response[i] - (Ysum/n)), 2)
        }
        var SSR = SST - SSE

        return{b0:b0E, b1:b1E, coefficientOfDetermination:(SSR/SST)}
    }
    //Multiple Linear regression (multiple explanatory variables and one response variable)
    MultiVariableRegression(explanatory:number[][], response:number[]):number[]{
        var linSystem = require("linear-equation-system");
        var n = explanatory.length;
        var m = explanatory[0].length;
        var a:number[][] = []
        var b:number[] = []
        if(n != response.length){
            console.log("There are length mismatch between the matrix of explanatory and response variables")
        }
        for(let i = 0; i < n; i++){
            if(explanatory[i].length != m){
                console.log("There are length mismatch between the matrix rows of explanatory variables")
                return null
            }
            if(explanatory[i][0] != 1){
                console.log("explanatory matrix format is not correct. First elements of all explanatory rows should be 1")
            }
        }

        for(let i = 0; i < m; i++){
            a.push([])
            for(let j = 0; j < m; j++){
                let sum = 0
                for(let k = 0; k < n; k++){
                    sum = sum + explanatory[k][i]*explanatory[k][j]
                }
                a[i].push(sum)
            }
            let sum = 0
            for(let d = 0; d < n; d++){
                sum = sum + response[d]*explanatory[d][i]
            }
            b.push(sum)
        }
        let result = linSystem.solve(a, b)
        return result
    }
    differentiation(input:number[]):number[]{
        if(input.length < 2){
            console.log("input is too short for calculating differentiation")
            return []
        }
        var output:number[] = []
        output.push(0)
        for(let i = 1; i < input.length; i++){
            output.push((output[i] - output[i-1])/output[i-1]*100)
        }
        return output
    }
    mean(input:number[]):number{
        if(input.length < 1){
            console.log("input array has length less than 1. Mean cannot be calculated")
            return -1
        }
        var sum = 0
        for(let i = 0; i < input.length; i++){
            sum = sum + input[i]
        }
        return sum/input.length
    }
    median(input:number[]):number{
        if(input.length < 1){
            console.log("input length is not enough")
            return -1
        }
        else if(input.length % 2 == 1){
            return input[Math.round((input.length-1)/2)]
        } 
        else{
            return (input[Math.round(input.length/2)] + input[Math.round(input.length/2 - 1)])/2
        }
    }
}