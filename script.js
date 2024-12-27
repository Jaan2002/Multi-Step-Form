document.addEventListener('DOMContentLoaded',function(){
var form1= document.getElementById("form1");
var form2= document.getElementById("form2");
var form3= document.getElementById("form3");
var Next1= document.getElementById("Next1");
var Next2= document.getElementById("Next2");
var Back1= document.getElementById("Back1");
var Back2= document.getElementById("Back2");
var submitBtn = document.getElementById("Submit");
var successMessage= document.getElementById("successMessage");
var clearFormBtn = document.getElementById("clearForm");
var jsonPreview = document.getElementById('jsonPreview');
var progress= document.getElementById("progress");

var formData = {
    personalDetails:{},
    professionalDetails:{},
};

//Validations
function validateFullName(){
    var fullName = document.getElementById('fullName');
    var errorMsg = document.getElementById('fullName-error');
    if( fullName.value.trim() === ''){
        errorMsg.textContent = 'Full Name is required.';
        return false;
    }
    if(fullName.value.length < 3){
        errorMsg.textContent = "Full Name must be at least 3 characters long.";
        return false;
    }
    var regex = /^[A-Za-z\s]+$/;
    if(!regex.test(fullName.value)){
        errorMsg.textContent = "Full Name must contain letters only.";
        return false;
    }

    errorMsg.textContent = '';
    return true;
}

function validateEmail(){
    var email = document.getElementById('email');
    var errorMsg = document.getElementById('email-error');
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(email.value.trim()=== ''){
        errorMsg.textContent= 'Email is required.';
        return false;
    }else if(!regex.test(email.value)){
        errorMsg.textContent = 'Please enter valid email address';
        return false;
    }
    errorMsg.textContent ='';
    return true;
    
}

function validatePhone(){
    var phone = document.getElementById('phone');
    var errorMsg = document.getElementById('phone-error');
    var regex = /^\d{10}$/;
    if(phone.value.trim() === ''){
        errorMsg.textContent = 'Phone number is required.';
        return false;
    }else if(!regex.test(phone.value)){
        errorMsg.textContent = 'Please enter a valid 10-digit phone number.';
        return false;
    }
    errorMsg.textContent = '';
    return true;

}

function validateAge(){
    var age = document.getElementById('age');
    var errorMsg = document.getElementById('age-error');
    if(age.value.trim() === ''){
        errorMsg.textContent = 'Age is required.';
        return false;
    }else if( age.value < 18 || age.value > 100){
        errorMsg.textContent = 'Age must be between 18 and 100.';
        return false;
    }
    errorMsg.textContent = '';
    return true;
}

function validateGender() {
    var gender = document.querySelector('input[name="gender"]:checked');
    var errorMsg = document.getElementById('gender-error');
    if (!gender) {
      errorMsg.textContent = 'Please select a gender.';
      return false;
    }
    errorMsg.textContent = '';
    return true;
  }

 
  function validateEducation() {
    var education = document.getElementById('education');
    var errorMsg = document.getElementById('education-error');
    if (education.value === '') {
      errorMsg.textContent = 'Education is required.';
      return false;
    }
    errorMsg.textContent = '';
    return true;
  }

    
  function validateSkills() {
    var errorMsg = document.getElementById('skills-error');
    var checkedSkills = document.querySelectorAll('input[name="skills"]:checked');
    if (checkedSkills.length === 0) {
      errorMsg.textContent = 'Please select at least one skill.';
      return false;
    }
    errorMsg.textContent = '';
    return true;
  }

  function validateExperience() {
    var experience = document.getElementById('experience');
    var errorMsg = document.getElementById('experience-error');
    if (experience.value.trim() === '') {
      errorMsg.textContent = 'Experience is required.';
      return false;
    } else if (experience.value < 0 || experience.value > 50) {
      errorMsg.textContent = 'Experience must be between 0 and 50 years.';
      return false;
    }
    errorMsg.textContent = '';
    return true;
  }

  function validateRole() {
    var role = document.getElementById('currentRole');
    var errorMsg = document.getElementById('currentRole-error');
    if (role.value.trim() === '') {
      errorMsg.textContent = 'Current role is required.';
      return false;
    }
    errorMsg.textContent = '';
    return true;
  }

Next1.onclick = function() {
    if(validateFullName() && validateEmail() && validatePhone() && validateAge() && validateGender()){
    form1.style.transform = "translateX(-450px)";  
    form2.style.transform = "translateX(0px)";  
    progress.style.width = "240px";
    savePersonalDetails();
    }
};

Back1.onclick = function() {
    form1.style.transform = "translateX(0px)";  
    form2.style.transform = "translateX(450px)";  
    progress.style.width = "120px";
};

Next2.onclick = function() {
    if(validateEducation() && validateSkills() && validateExperience() && validateRole()){
    form2.style.transform = "translateX(-450px)";  
    form3.style.transform = "translateX(0px)";  
    progress.style.width = "360px";
    saveProfessionalDetails();
        displayReviewSection();
    }
};

Back2.onclick = function() {
    form2.style.transform = "translateX(0px)";  
    form3.style.transform = "translateX(450px)";  
    progress.style.width = "240px";
};

//Saving data
function savePersonalDetails(){
    formData.personalDetails.fullName = document.getElementById('fullName').value;
    formData.personalDetails.email = document.getElementById('email').value;
    formData.personalDetails.phone = document.getElementById('phone').value;
    formData.personalDetails.age = document.getElementById('age').value;
    formData.personalDetails.gender = document.querySelector('input[name="gender"]:checked').value;
    localStorage.setItem('personalDetails',JSON.stringify(formData.personalDetails));
}

function saveProfessionalDetails() {
    formData.professionalDetails.education = document.getElementById('education').value;
    formData.professionalDetails.skills = [];
    document.querySelectorAll('input[name="skills"]:checked').forEach(function (checkbox) {
      formData.professionalDetails.skills.push(checkbox.value);
    });
    formData.professionalDetails.experience = document.getElementById('experience').value;
    formData.professionalDetails.currentRole = document.getElementById('currentRole').value;  
    localStorage.setItem('professionalDetails', JSON.stringify(formData.professionalDetails));
}



// Display Review Section 
function displayReviewSection() {
    var personalDetails = JSON.parse(localStorage.getItem('personalDetails'));
    var professionalDetails = JSON.parse(localStorage.getItem('professionalDetails'));

    console.log('Personal Details:', personalDetails);
    console.log('Professional Details:', professionalDetails);

    var reviewSection = document.getElementById('reviewSection');
    reviewSection.innerHTML = `
    <div class = "review-section">
    <div class="detail-group">
      <h4>Personal Details</h4>
      <p><strong>Full Name:</strong> ${personalDetails.fullName}</p>
      <p><strong>Email:</strong> ${personalDetails.email}</p>
      <p><strong>Phone:</strong> ${personalDetails.phone}</p>
      <p><strong>Age:</strong> ${personalDetails.age}</p>
      <p><strong>Gender:</strong> ${personalDetails.gender}</p>
 
      <h4>Professional Details</h4>
      <p><strong>Education:</strong> ${professionalDetails.education}</p>
      <p><strong>Skills:</strong> ${professionalDetails.skills.join(', ')}</p>
      <p><strong>Experience:</strong> ${professionalDetails.experience} years</p>
     <p><strong>Current Role:</strong> ${professionalDetails.currentRole}</p>
     </div>
     </div>
    `;
    
    jsonPreview.textContent = JSON.stringify({ personalDetails, professionalDetails }, null, 2);
    submitBtn.disabled = false;
}

//Submit form success-message
submitBtn.onclick = function (event){
    event.preventDefault();
    successMessage.style.display= 'block';
    setTimeout(function(){
        successMessage.style.display ='none';
    },3000);

    setTimeout(function() {
        form1.reset();
        form2.reset();
        form3.reset();
        localStorage.clear();
    }, 3000);  
}


//Export JSOn function
document.getElementById("exportData").onclick = function() {
    var jsonData = jsonPreview.textContent;  
  
    var blob = new Blob([jsonData], { type: "application/json" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "formData.json";  
    link.click();
};

//Clear Form
clearFormBtn.onclick = function () {
    localStorage.removeItem('personalDetails');
    localStorage.removeItem('professionalDetails');
    window.location.reload(); 
  };

});


