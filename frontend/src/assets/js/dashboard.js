document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    if (!userId) {
        window.location.href = '/login';
        return;
    }

    // Initialize UI
    const welcomeMsg = document.getElementById('welcomeMsg');
    if (welcomeMsg) welcomeMsg.innerText = `Welcome, ${userName || 'User'}!`;

    // Fetch Dashboard Data
    fetch(`http://localhost:8080/api/dashboard/${userId}`)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const membershipStatus = document.getElementById('membershipStatus');
                const attendanceCount = document.getElementById('attendanceCount');
                if (membershipStatus) membershipStatus.innerText = data.data.membershipStatus;
                if (attendanceCount) attendanceCount.innerText = data.data.attendanceCount;
                
                if (data.data.lastPayment) {
                    const lastAmount = document.getElementById('lastAmount');
                    const lastDate = document.getElementById('lastDate');
                    if (lastAmount) lastAmount.innerText = `Rs. ${data.data.lastPayment.amount}`;
                    if (lastDate) lastDate.innerText = new Date(data.data.lastPayment.payment_date).toLocaleDateString();
                }
            }
        });

    // Mark Attendance
    const markAttendanceBtn = document.getElementById('markAttendanceBtn');
    if (markAttendanceBtn) {
        markAttendanceBtn.addEventListener('click', function() {
            fetch('http://localhost:8080/api/attendance/checkin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId })
            })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    location.reload();
                }
            });
        });
    }

    // Tasks Management
    const taskList = document.getElementById('taskList');
    const loadTasks = () => {
        if (!taskList) return;
        fetch(`http://localhost:8080/api/tasks/${userId}`)
            .then(res => res.json())
            .then(data => {
                taskList.innerHTML = '';
                if (data.tasks) {
                    data.tasks.forEach(task => {
                        const item = document.createElement('div');
                        item.className = `task-item ${task.status === 'completed' ? 'completed' : ''}`;
                        item.innerHTML = `
                            <span>${task.task_name} (${new Date(task.date).toLocaleDateString()})</span>
                            ${task.status === 'pending' ? `<button class="check-btn" onclick="completeTask(${task.id})">Done</button>` : ''}
                        `;
                        taskList.appendChild(item);
                    });
                }
            });
    };

    window.completeTask = (taskId) => {
        fetch(`http://localhost:8080/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'completed' })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) loadTasks();
        });
    };

    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const taskName = document.getElementById('taskName').value;
            fetch('http://localhost:8080/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    user_id: userId, 
                    task_name: taskName, 
                    date: new Date().toISOString().split('T')[0] 
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('taskName').value = '';
                    loadTasks();
                }
            });
        });
    }

    // Nutrition Management
    const loadNutrition = () => {
        const totalCals = document.getElementById('totalCals');
        if (!totalCals) return;
        fetch(`http://localhost:8080/api/nutrition/${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.summary) {
                    document.getElementById('totalCals').innerText = data.summary.totalCalories;
                    document.getElementById('totalProt').innerText = data.summary.totalProtein;
                    document.getElementById('fatPerc').innerText = data.summary.fatPercentage;
                }
            });
    };

    const nutritionForm = document.getElementById('nutritionForm');
    if (nutritionForm) {
        nutritionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const body = {
                user_id: userId,
                calories: document.getElementById('nutCalories').value,
                protein: document.getElementById('nutProtein').value,
                fat: document.getElementById('nutFat').value,
                carbs: document.getElementById('nutCarbs').value,
                date: new Date().toISOString().split('T')[0]
            };
            fetch('http://localhost:8080/api/nutrition', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    nutritionForm.reset();
                    loadNutrition();
                }
            });
        });
    }

    // Attendance Management
    const attendanceList = document.getElementById('attendanceList');
    const loadAttendance = () => {
        if (!attendanceList) return;
        fetch(`http://localhost:8080/api/attendance/${userId}`)
            .then(res => res.json())
            .then(data => {
                attendanceList.innerHTML = '';
                if (data.success && data.attendance) {
                    data.attendance.forEach(att => {
                        const item = document.createElement('div');
                        item.className = 'task-item';
                        item.innerHTML = `
                            <span>${new Date(att.date).toLocaleDateString()}</span>
                            <span>${att.check_in_time}</span>
                        `;
                        attendanceList.appendChild(item);
                    });
                }
            });
    };

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.clear();
            window.location.href = '/login';
        });
    }

    // Initial loads
    loadTasks();
    loadNutrition();
    loadAttendance();
});
