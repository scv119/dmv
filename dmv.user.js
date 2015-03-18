// ==UserScript==
// @name        DMV
// @namespace   scv119@gmail.com
// @include     https://www.dmv.ca.gov/*
// @version     1
// @grant       none
// ==/UserScript==

var config = {
  office: 632, //DMV Santa Clara
  firstName: 'TIM',
  lastName: 'DUNCAN',
  dlNumber: 'F1234567',
  month: '04',
  day: '25',
  year: '1976',
  phone: '1234567890',
};

var stop = false;
var currentMonth = 3;
var currentDay = 9;

function doItAgain() {
  if (!stop) {
   setTimeout(function() {window.location.href = 'https://www.dmv.ca.gov/foa/clear.do?goTo=driveTest';}, 30000);
  }
}

function findElements(tagName, attributeName, attributeValue) {
  var eles = document.getElementsByTagName(tagName);
  var ret = [];
  for (var i = 0; i < eles.length; i++) {
      var ele = eles[i];
      if (attributeValue === ele.getAttribute(attributeName)) {
        ret.push(ele);
      }
  }
  return ret;
}

function check_time() {
  var office = document.getElementById('officeId');
  office.value = config.office;
  
  var testType = document.getElementById('DT');
  testType.checked = true;
  
  var firstName = document.getElementById('first_name');
  firstName.value = config.firstName;
  var lastName = document.getElementById('last_name');
  lastName.value = config.lastName;
  var dlNumber = document.getElementById('dl_number');
  dlNumber.value = config.dlNumber;
  var month = document.getElementsByName('birthMonth')[0];
  month.value = config.month;
  var day = document.getElementsByName('birthDay')[0];
  day.value = config.day;
  var year = document.getElementsByName('birthYear')[0];
  year.value = config.year;
  var area = document.getElementsByName('telArea')[0];
  area.value = config.phone.substr(0, 3);
  var prefix = document.getElementsByName('telPrefix')[0];
  prefix.value = config.phone.substr(3, 3);
  var suffix = document.getElementsByName('telSuffix')[0];
  suffix.value = config.phone.substr(6, 4);
  var submit = findElements('input', 'type', 'submit')[0];
  submit.click();
}


if(window.location.href === 'https://www.dmv.ca.gov/foa/clear.do?goTo=driveTest') {
  check_time();
} else if (window.location.href === 'https://www.dmv.ca.gov/wasapp/foa/findDriveTest.do') {
  var appointment = document.getElementsByClassName('alert')[1].textContent;
  var date = new Date(Date.parse(appointment.split(',')[1] + ' 2015'));
  var month = date.getMonth() + 1;
  var day = date.getUTCDate();
  //alert(month + ' ' + day);
  if (month === currentMonth && day <= currentDay) {
    var submit = findElements('input', 'type', 'submit')[1];
    submit.click();
  } else {
    doItAgain();
  }
} else if (window.location.href === 'https://www.dmv.ca.gov/wasapp/foa/reviewDriveTest.do') {
  var submit = findElements('input', 'type', 'submit')[1];
  submit.click();
} else if (window.location.href === 'https://www.dmv.ca.gov/wasapp/foa/confirmDriveTest.do') {
  var submit = findElements('input', 'type', 'submit')[1];
  //alert(submit.value);
  stop = true;
  submit.click();
} else {
  doItAgain();
}
