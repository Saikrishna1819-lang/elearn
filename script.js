// ================= USERS =================
function signupUser() {
  const name = signupName.value.trim();
  const email = signupEmail.value.trim();
  const password = signupPassword.value.trim();
  const error = signupError;

  if (!name || !email || !password) {
    error.textContent = "All fields required";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some(u => u.email === email)) {
    error.textContent = "Email already exists";
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful");
  window.location.href = "index.html";
}

function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("loginError");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    error.textContent = "Invalid credentials";
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  window.location.href = "home.html";
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// ================= COURSES =================
const courses = [
  {
  id: 1,
  title: "JavaScript Basics",
  description: "Learn JS",
  duration: "6 Weeks",
  price: 999,
  image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
  video: "https://www.youtube.com/embed/PkZNo7MFNFg"
},
{
  id: 2,
  title: "HTML & CSS",
  description: "Build websites",
  duration: "4 Weeks",
  price: 699,
  image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19",
  video: "https://www.youtube.com/embed/mU6anWqZJcc"
},
{
  id: 3,
  title: "Python",
  description: "Learn Python",
  duration: "6 Weeks",
  price: 899,
  image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  video: "https://www.youtube.com/embed/_uQrJ0TkZlc"
},
{
  id: 4,
  title: "React",
  description: "Frontend framework",
  duration: "6 Weeks",
  price: 1499,
  image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
  video: "https://www.youtube.com/embed/bMknfKXIFA8"
},
{
  id: 5,
  title: "DSA",
  description: "Interview prep",
  duration: "10 Weeks",
  price: 1999,
  image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
  video: "https://www.youtube.com/embed/8hly31xKli0"
},
{
  id: 6,
  title: "SQL",
  description: "Databases",
  duration: "5 Weeks",
  price: 799,
  image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
  video: "https://www.youtube.com/embed/HXV3zeQKqGY"
}
,
  {
  id: 7,
  title: "Node.js Basics",
  description: "Backend development with Node.js",
  duration: "6 Weeks",
  price: 1299,
  video: "https://www.youtube.com/embed/TlB_eWDSMt4"
},
{
  id: 8,
  title: "MongoDB Essentials",
  description: "Learn NoSQL database with MongoDB",
  duration: "4 Weeks",
  price: 999,
  video: "https://www.youtube.com/embed/ofme2o29ngU"
}
];

function loadCourses() {
  const courseList = document.getElementById("courseList");
  if (!courseList) return;
  renderCourses(courses);
}


function renderCourses(data) {
  const courseList = document.getElementById("courseList");
  if (!courseList) return;

  courseList.innerHTML = "";

  data.forEach(c => {
    courseList.innerHTML += `
      <div class="course-box">
        <div>
          <h3>${c.title}</h3>
          <p>${c.description}</p>
          <p>${c.duration}</p>
          <p>₹${c.price}</p>
        </div>
        <button class="btn"
          onclick="openCourse(${c.id})">
          View Course
        </button>
      </div>
    `;
  });
}

function searchCourses() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  const q = searchInput.value.toLowerCase();
  renderCourses(
    courses.filter(c =>
      c.title.toLowerCase().includes(q)
    )
  );
}

function openCourse(id) {
  localStorage.setItem("selectedCourse", id);
  window.location.href = "course.html";
}

function loadCourseDetails() {
  const courseDetails = document.getElementById("courseDetails");
  if (!courseDetails) return;

  const id = Number(localStorage.getItem("selectedCourse"));
  const c = courses.find(course => course.id === id);

  if (!c) {
    courseDetails.innerHTML = "<p>Course not found</p>";
    return;
  }

  courseDetails.innerHTML = `
    <h2>${c.title}</h2>
    <p>${c.description}</p>
    <iframe width="100%" height="400" src="${c.video}" allowfullscreen></iframe>
    <button class="btn btn-success mt-3"
      onclick="enrollCourse(${c.id})">
      Enroll
    </button>
  `;
}


function enrollCourse(courseId) {
  let enrolled = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

  // Avoid duplicates
  if (!enrolled.includes(courseId)) {
    enrolled.push(courseId);
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolled));
  }

  window.location.href = "dashboard.html";
}

function loadDashboard() {
  const myCourses = document.getElementById("myCourses");
  if (!myCourses) return;

  const enrolled = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
  myCourses.innerHTML = "";

  if (enrolled.length === 0) {
    myCourses.innerHTML = "<p>No enrolled courses yet.</p>";
    return;
  }

  enrolled.forEach(courseId => {
    const course = courses.find(c => c.id === Number(courseId));
    if (!course) return;

    myCourses.innerHTML += `
      <div class="course-box">
        <div>
          <h3>${course.title}</h3>
          <p>${course.description}</p>
        </div>
        <button class="btn btn-danger btn-sm"
          onclick="removeCourse(${course.id})">
          Remove
        </button>
      </div>
    `;
  });
}



function removeCourse(courseId) {
  let enrolled = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
  enrolled = enrolled.filter(id => Number(id) !== Number(courseId));
  localStorage.setItem("enrolledCourses", JSON.stringify(enrolled));
  loadDashboard();
}


function hideAllSections() {
  const about = document.getElementById("aboutSection");
  const contact = document.getElementById("contactSection");

  if (about) about.style.display = "none";
  if (contact) contact.style.display = "none";
}

function showAbout() {
  hideAllSections();
  const about = document.getElementById("aboutSection");
  if (about) about.style.display = "block";
}

function showContact() {
  hideAllSections();
  const contact = document.getElementById("contactSection");
  if (contact) contact.style.display = "block";
}





function showCourses() {
  hideAllSections();
}




loadCourses();
loadCourseDetails();
loadDashboard();

