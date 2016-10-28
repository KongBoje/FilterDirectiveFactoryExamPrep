var app = angular.module('examApp', []);

app.controller('ExamController', ['$scope', 'studentFactory', function ($scope, studentFactory) {
        var self = this;
        self.students = studentFactory.students;
        self.allCourses = studentFactory.allCourses;
        
        /* How I would implement the REST api call
            self.students = function() {
                studentFactory.students()
                .then(function (response) {
                console.log("Response is: " + response);
                self.students_all = response.data;
                console.log(self.countries_all);
            }, function (error) {
                self.status = 'Unable to load customer data: ' + error.message;
            });
            }
        
            self.allCourses = function() {
                studentFactory.allCourses()
                .then(function (response) {
                console.log("Response is: " + response);
                self.courses_all = response.data;
                console.log(self.countries_all);
            }, function (error) {
                self.status = 'Unable to load customer data: ' + error.message;
            });
            }
                
        */
    }]);

app.filter('averageFilter', [function () {
        return function (input) {
            var out = [];
            var num = 0;
            angular.forEach(input, function (student) {
                student.average = 0;
                num = 0;
                for (var i = 0; i < student.grades.length; i++) {
                    if (!angular.equals(student.grades[i], {})) {
                        num++;
                        student.average += parseInt(student.grades[i].grade);
                    }
                }
                student.average = (student.average) / num;
                out.push(student);
            });
            return out;
        };
    }]);

app.directive('gradeDirective', function () {
    return {
        restrict: 'AE',
        templateUrl: 'student-grades.html',
        controller: 'ExamController'
    };
});

app.factory('studentFactory', function () {
    var studentsInfo = {};
    studentsInfo.allCourses = [
        {courseId: 1000, courseName: "Basic Programming"},
        {courseId: 1001, courseName: "Advanced Programming"},
        {courseId: 1003, courseName: "DataBase Intro"}];
    studentsInfo.students = [];
    studentsInfo.students.push({studentId: 100, name: "Peter Hansen", grades: [{grade: "10"}, {grade: "12"}, {}]});
    studentsInfo.students.push({studentId: 101, name: "Jan Olsen", grades: [{grade: "7"}, {grade: "10"}, {}]});
    studentsInfo.students.push({studentId: 102, name: "Gitte Poulsen", grades: [{grade: "7"}, {grade: "7"}, {}]});
    studentsInfo.students.push({studentId: 103, name: "John McDonald", grades: [{grade: "10"}, {}, {grade: "7"}]});
    return studentsInfo;
    
    /* How I would implement a REST api call
      
      studentInfo.students = function() {
            return $http.get(http://data.com/api/student/all);
      }
    
      studentInfo.allCourses = function() {
            return $http.get(http://data.com/api/course/all);
      }
    
     */
    
    
});
