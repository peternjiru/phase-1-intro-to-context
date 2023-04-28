// createEmployeeRecord

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {

    let EmployeeRecord = {
        "firstName": firstName,
        "familyName": familyName,
        "title": title,
        "payPerHour": payPerHour,
        "timeInEvents": [],
        "timeOutEvents": [],
    }

    return EmployeeRecord;

}

// console.log(createEmployeeRecord(["sam","goodman", "CEO", 15])) // test data (one employee)

// createEmployeeRecords

function createEmployeeRecords(employeesArray) {

    let employeeRecords = []

    for (let record of employeesArray) {

        let eachEmployee = createEmployeeRecord(record)
        employeeRecords.push(eachEmployee)
    }

    return employeeRecords;

}

// console.log(createEmployeeRecords([["sam","goodman", "CEO", 15],["tom","tumb", "HR", 12]])) // test data (many employees)

//test employees

// let emp1 = {
//     "firstName": "sam",
//     "familyName": "goodman",
//     "title": "ceo",
//     "payPerHour": 15,
//     "timeInEvents": [],
//     "timeOutEvents": [],
// }

// let emp2 = {
//     "firstName": "tom",
//     "familyName": "thumb",
//     "title": "hr",
//     "payPerHour": 12,
//     "timeInEvents": [],
//     "timeOutEvents": [],
// }


// createTimeInEvent

function createTimeInEvent(employeeObject, dateStamp) {

    let hour = parseInt(dateStamp.substring(11))
    let date = dateStamp.substring(0, 10)

    employeeObject.timeInEvents.push({ "type": "TimeIn", "hour": hour, "date": date })

    return employeeObject
}

// createTimeInEvent(emp1,"2022-01-01 1400") // test code to create time in on two days
// createTimeInEvent(emp1,"2022-01-02 1000") 

// createTimeOutEvent

function createTimeOutEvent(employeeObject, dateStamp) {

    let hour = parseInt(dateStamp.substring(11))
    let date = dateStamp.substring(0, 10)

    employeeObject.timeOutEvents.push({ "type": "TimeOut", "hour": hour, "date": date })

    return employeeObject
}

// createTimeOutEvent(emp1,"2022-01-01 1900") // test code to create time out on two days
// console.log(createTimeOutEvent(emp1,"2022-01-02 1200")) // console log only this to see result for 2 days


// --- start of test data ---

// test employees with time in and time out data

let emp1 = {
    firstName: 'sam',
    familyName: 'goodman',
    title: 'ceo',
    payPerHour: 15,
    timeInEvents: [
        { type: 'TimeIn', hour: 1400, date: '2022-01-01' },
        { type: 'TimeIn', hour: 1000, date: '2022-01-02' }
    ],
    timeOutEvents: [
        { type: 'TimeOut', hour: 1900, date: '2022-01-01' },
        { type: 'TimeOut', hour: 1200, date: '2022-01-02' }
    ]
}


let emp2 = {
    firstName: 'tom',
    familyName: 'thumb',
    title: 'hr',
    payPerHour: 12,
    timeInEvents: [
        { type: 'TimeIn', hour: 1000, date: '2022-05-05' },
        { type: 'TimeIn', hour: 2100, date: '2022-06-06' }
    ],
    timeOutEvents: [
        { type: 'TimeOut', hour: 2200, date: '2022-05-05' },
        { type: 'TimeOut', hour: 2400, date: '2022-06-06' }
    ]
}


let staff = [emp1, emp2] // all employees to test total payroll

// --- end of test data ---

//   hoursWorkedOnDate

function hoursWorkedOnDate(object, date) {

    for (let item of object.timeInEvents) {

        if (date === item.date) {

            let inHour = item.hour

            for (let item of object.timeOutEvents) {
                if (date === item.date) {
                    let outHour = item.hour

                    let hoursWorkedOnDate = outHour - inHour
                    hoursWorkedOnDate = String(hoursWorkedOnDate)
                    hoursWorkedOnDate = hoursWorkedOnDate.substring(0, hoursWorkedOnDate.length - 2)
                    hoursWorkedOnDate = parseInt(hoursWorkedOnDate)

                    return hoursWorkedOnDate;
                }
            }

        }


    }

}

// console.log(hoursWorkedOnDate(emp1,"2022-01-02")) // test code for hours worked on specific date

// // // wagesEarnedOnDate

function wagesEarnedOnDate(employeeObject, date) {

    let hours = hoursWorkedOnDate(employeeObject, date)
    let payOwed = hours * employeeObject.payPerHour
    return payOwed

}

// console.log(wagesEarnedOnDate(emp2,"2022-05-05")) // testing wages earned on a specific date

// allWagesFor

function allWagesFor(object) {

    let payOwed = 0

    for (let item of object.timeInEvents) {

        payOwed += wagesEarnedOnDate(object, item.date)

    }

    return payOwed

}

// console.log(allWagesFor(emp1)) // testing total pay owed for one employee

// calculatePayroll

function calculatePayroll(empsarray) {

    let totalPayOwed = 0

    for (let eachRecord of empsarray) {

        totalPayOwed += allWagesFor(eachRecord)

    }

    return totalPayOwed

}

// console.log(calculatePayroll(staff)) // testint total payroll