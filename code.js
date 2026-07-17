// Load Data
let applications = JSON.parse(localStorage.getItem("applications")) || [];

// Form Elements
const form = document.getElementById("applicationForm");
const applicationList = document.getElementById("applicationList");

const company = document.getElementById("company");
const role = document.getElementById("role");
const locationInput = document.getElementById("location");
const salary = document.getElementById("salary");
const jobLink = document.getElementById("jobLink");
const applyDate = document.getElementById("applyDate");
const status = document.getElementById("status");
const notes = document.getElementById("notes");

const search = document.getElementById("search");
const filter = document.querySelector(".application-toolbar select");

// Save Data

function saveData() {
    localStorage.setItem("applications", JSON.stringify(applications));
}

// Dashboard

function updateDashboard() {

    const applied = applications.filter(a => a.status === "Applied").length;
    const interview = applications.filter(a => a.status === "Interview").length;
    const offer = applications.filter(a => a.status === "Offer").length;
    const rejected = applications.filter(a => a.status === "Rejected").length;

    document.getElementById("totalApplications").innerText = applications.length;
    document.getElementById("appliedCount").innerText = applied;
    document.getElementById("interviewCount").innerText = interview;
    document.getElementById("offerCount").innerText = offer;
    document.getElementById("rejectedCount").innerText = rejected;

    // Analytics

    document.getElementById("analyticsTotal").innerText = applications.length;
    document.getElementById("analyticsInterview").innerText = interview;
    document.getElementById("analyticsOffer").innerText = offer;

    let success = 0;

    if (applications.length > 0) {
        success = ((offer / applications.length) * 100).toFixed(1);
    }

    document.getElementById("successRate").innerText = success + "%";

}

// Display Applications

function displayApplications(data = applications) {

    if (data.length === 0) {
    applicationList.innerHTML = `
        <div class="no-data">
            <h2>📂 No Applications Found</h2>
            <p>Add your first job application to start tracking.</p>
        </div>
    `;
    return;
}

    applicationList.innerHTML = "";

    data.forEach((app, index) => {

        applicationList.innerHTML += `

        <div class="application-card">

            <h2>${app.company}</h2>

            <p><strong>Role:</strong> ${app.role}</p>

            <p><strong>Location:</strong> ${app.location}</p>

            <p><strong>Salary:</strong> ₹${app.salary}</p>

            <p><strong>Status:</strong> ${app.status}</p>

            <p><strong>Date:</strong> ${app.date}</p>

            <p>${app.notes}</p>

            <a href="${app.link}" target="_blank">Open Job</a>

            <br><br>

            <button onclick="deleteApplication(${index})">
                Delete
            </button>

        </div>

        `;

    });

}

// Add Application

form.addEventListener("submit", function(e){

    e.preventDefault();

    const newApplication = {

        company: company.value,

        role: role.value,

        location: locationInput.value,

        salary: salary.value,

        link: jobLink.value,

        date: applyDate.value,

        status: status.value,

        notes: notes.value

    };

    applications.push(newApplication);

    saveData();

    displayApplications();

    updateDashboard();

    form.reset();

});

// Delete
function deleteApplication(index){

    applications.splice(index,1);

    saveData();

    displayApplications();

    updateDashboard();

}

// Search

search.addEventListener("input", function(){

    const value = search.value.toLowerCase();

    const result = applications.filter(app =>

        app.company.toLowerCase().includes(value) ||

        app.role.toLowerCase().includes(value)

    );

    displayApplications(result);

});

// Filter
filter.addEventListener("change", function(){

    if(filter.value==="All"){

        displayApplications();

        return;

    }

    const result = applications.filter(app=>app.status===filter.value);

    displayApplications(result);

});


// Initial Load

displayApplications();

updateDashboard();