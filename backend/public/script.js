const apiUrl = 'https://innoduo-honors.onrender.com';
// const apiUrl = 'http://localhost:3000';

fetch('/username')
      .then(response => response.json())
      .then(data => {
        const usernameElement = document.getElementById('loggedUser');
        if (data.username) {
          usernameElement.textContent = `Logged in as: ${data.username}`;
        } else {
          usernameElement.textContent = 'Not logged in properly';
        }
      })
      .catch(error => console.error('Error fetching username:', error));

document.getElementById('logoutButton').addEventListener('click', async () => {
  const response = await fetch(`${apiUrl}/logout`, {
    method: 'POST'
  });

  if (response.ok) {
    alert('User logged out successfully!');
    window.location.href = '/login.html'; // Redirect to login page
  } else {
    alert('Error logging out.');
  }
});

document.getElementById('studentForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const grade = document.getElementById('grade').value;

  const response = await fetch(`${apiUrl}/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, age, grade })
  });

  if (response.ok) {
    alert('Student added successfully!');
    fetchStudents();
  } else {
    alert('Error adding student.');
  }
});

async function fetchStudents() {
  const response = await fetch(`${apiUrl}/students`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const students = await response.json();
    const studentTable = document.getElementById('studentTable');
    studentTable.innerHTML = '';

    students.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>
          <button onclick="deleteStudent('${student._id}')">Delete</button>
        </td>
      `;
      studentTable.appendChild(row);
    });
  } else {
    alert('Error fetching students.');
  }
}

async function deleteStudent(id) {
  const response = await fetch(`${apiUrl}/students/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    alert('Student deleted successfully!');
    fetchStudents();
  } else {
    alert('Error deleting student.');
  }
}

// Fetch students on page load
fetchStudents();
