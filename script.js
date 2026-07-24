// Login
function login() {
    const collegeId = document.getElementById("collegeId")?.value.trim();

    if (!collegeId) {
        alert("Please enter your College ID.");
        return;
    }

    localStorage.setItem("collegeId", collegeId);
    window.location.href = "home.html";
}

// Submit Complaint
const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {
    complaintForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const category = document.getElementById("category").value;

        const response = await fetch("/complaints", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                description,
                category
            })
        });

        const data = await response.json();

        alert(data.message);

        window.location.href = "home.html";
    });
}
// Load complaints on Home Page
async function loadComplaints() {

    const complaintList = document.getElementById("complaintList");

    if (!complaintList) return;

    const response = await fetch("/complaints");
    const complaints = await response.json();

    if (complaints.length === 0) {
        complaintList.innerHTML = "<h3>No complaints available.</h3>";
        return;
    }

    complaintList.innerHTML = "";

    complaints.forEach(c => {

        complaintList.innerHTML += `
            <div class="card">
                <h2>${c.title}</h2>

                <p><b>Category:</b> ${c.category}</p>

                <p>${c.description}</p>

                <p><b>Status:</b> ${c.status}</p>

                <p><b>Date:</b> ${c.date}</p>

            </div>
        `;
    });

}

loadComplaints();