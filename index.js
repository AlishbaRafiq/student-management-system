import inquirer from "inquirer";
class Student {
  id;
  name;
  coursesEnrolled;
  feesAmount;
  constructor(id, name, coursesEnrolled, feesAmount) {
    this.id = id;
    this.name = name;
    this.coursesEnrolled = coursesEnrolled;
    this.feesAmount = feesAmount;
  }
}
let baseId = 12345;
let studentId = "";
let continueEnrollment = true;
let students = [];
do {
  let action = await inquirer.prompt({
    type: "list",
    name: "ans",
    message: "Please select an option to continue: \n",
    choices: ["Enroll a student", "Show student status"],
  });
  if (action.ans === "Enroll a student") {
    let studentName = await inquirer.prompt({
      type: "input",
      name: "ans",
      message: "Please enter a student name",
    });
    let trimmedStudentName = studentName.ans.trim().toLowerCase();
    let studentNameCheck = students.map((obj) => obj.name);
    if (studentNameCheck.includes(trimmedStudentName) === false) {
      if (trimmedStudentName !== "") {
        baseId++;
        studentId = "STID" + baseId;
        console.log("\nYour account has been created");
        console.log(`\n Welcome ${trimmedStudentName}!`);
        let course = await inquirer.prompt({
          type: "list",
          name: "courses",
          message: "Please select a course",
          choices: ["AI", "Graphic Design", "Web Development", "E-Commerce"],
        });
        let courseFees = 0;
        switch (course.courses) {
          case "AI":
            courseFees = 50000;
            break;
          case "Graphic Design":
            courseFees = 3000;
            break;
          case "Web Development":
            courseFees = 5000;
            break;
          case "E-Commerce":
            courseFees = 7000;
            break;
        }
        let courseConfirm = await inquirer.prompt({
          type: "confirm",
          name: "confirmation",
          message: "Do you want to enroll in the course? ",
        });
        if (courseConfirm.confirmation === true) {
          let student = new Student(
            studentId,
            trimmedStudentName,
            [course.courses],
            courseFees
          );
          students.push(student);
          console.log("\nYou have successfully enrolled in this course");
        }
      } else {
        console.log("\nInvalid student");
      }
    } else {
      console.log("\nThis name is already exists");
    }
  } else if (action.ans === "Show student status") {
    if (students.length !== 0) {
      let studentNameCheck = students.map((e) => e.name);
      let selectedStudent = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please select name",
        choices: studentNameCheck,
      });
      let foundStudent = students.find(
        (student) => student.name === selectedStudent.ans
      );
      console.log("Student Information");
      console.log(foundStudent);
      console.log("\n");
    } else {
      console.log("Record is empty");
    }
  }
  let userConfirm = await inquirer.prompt({
    type: "confirm",
    name: "ans",
    message: "Do you want to continue?",
  });
  if (userConfirm.ans === false) {
    continueEnrollment = false;
  }
} while (continueEnrollment);
