document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open', !expanded);
  });

  const taskForm = document.querySelector('#task-form');
  if (taskForm) {
    const key = 'opeyemiPortfolioTasksV1';
    const list = document.querySelector('#task-list');
    const empty = document.querySelector('#empty-state');
    let tasks = [];
    try { tasks = JSON.parse(localStorage.getItem(key) || '[]'); } catch { tasks = []; }
    let filter = 'all';
    const save = () => localStorage.setItem(key, JSON.stringify(tasks));
    const render = () => {
      list.replaceChildren();
      const visible = tasks.filter(task => filter === 'all' || (filter === 'done' ? task.done : !task.done));
      empty.hidden = visible.length > 0;
      visible.forEach(task => {
        const li = document.createElement('li'); li.className = 'task-item' + (task.done ? ' is-done' : '');
        const label = document.createElement('label'); label.className = 'task-label';
        const check = document.createElement('input'); check.type = 'checkbox'; check.checked = task.done; check.setAttribute('aria-label', `Mark ${task.text} ${task.done ? 'to do' : 'completed'}`);
        check.addEventListener('change', () => { task.done = check.checked; save(); render(); });
        const text = document.createElement('span'); text.textContent = task.text; label.append(check, text);
        const del = document.createElement('button'); del.type = 'button'; del.className = 'delete-task'; del.textContent = 'Delete'; del.setAttribute('aria-label', `Delete ${task.text}`);
        del.addEventListener('click', () => { tasks = tasks.filter(t => t.id !== task.id); save(); render(); });
        li.append(label, del); list.append(li);
      });
    };
    taskForm.addEventListener('submit', event => {
      event.preventDefault(); const input = taskForm.elements.task; const text = input.value.trim();
      if (!text) { input.focus(); return; }
      tasks.unshift({ id: `${Date.now()}-${Math.random()}`, text, done: false }); save(); taskForm.reset(); render(); input.focus();
    });
    document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
      filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item === button)); render();
    }));
    document.querySelector('#clear-done').addEventListener('click', () => { tasks = tasks.filter(task => !task.done); save(); render(); });
    render();
  }

  const contact = document.querySelector('#contact-form');
  if (contact) contact.addEventListener('submit', event => {
    event.preventDefault(); const data = new FormData(contact);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const message = String(data.get('message') || '').trim();
    const status = document.querySelector('#form-status');
    if (!name || !email || !phone || !message) { status.textContent = 'Please complete every field.'; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { status.textContent = 'Please enter a valid email address.'; contact.elements.email.focus(); return; }
    if (!/^\d+$/.test(phone)) { status.textContent = 'Use digits only for the phone number.'; contact.elements.phone.focus(); return; }
    status.textContent = 'Your email application will open with this message ready to review.';
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`);
    window.location.href = `mailto:hatotileto@yahoo.com?subject=${subject}&body=${body}`;
  });

  const courseRows = document.querySelector('#course-rows');
  if (courseRows) {
    const key = 'opeyemiAcademicCoursesV1';
    const saved = (() => { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } })();
    const addCourseRow = (course = {}) => {
      const row = document.createElement('tr');
      row.innerHTML = '<td><input class="course-name" aria-label="Course title or code" maxlength="100" placeholder="Enter course title" value=""></td><td><input class="course-units" aria-label="Credit units" type="number" min="1" max="20" step="1" inputmode="numeric" placeholder="e.g. 3" value=""></td><td><input class="course-points" aria-label="Grade points" type="number" min="0" max="5" step="0.01" inputmode="decimal" placeholder="0–5" value=""></td><td><button type="button" class="remove-course" aria-label="Remove course">×</button></td>';
      row.querySelector('.course-name').value = course.name || '';
      row.querySelector('.course-units').value = course.units || '';
      row.querySelector('.course-points').value = course.points ?? '';
      row.querySelectorAll('input').forEach(input => input.addEventListener('input', updateGpa));
      row.querySelector('.remove-course').addEventListener('click', () => { row.remove(); updateGpa(); });
      courseRows.append(row);
    };
    const updateGpa = () => {
      const rows = [...courseRows.querySelectorAll('tr')];
      const courses = rows.map(row => {
        const name = row.querySelector('.course-name').value.trim();
        const unitsValue = row.querySelector('.course-units').value;
        const pointsValue = row.querySelector('.course-points').value;
        return { name, units: Number(unitsValue), points: Number(pointsValue), complete: Boolean(name && unitsValue && pointsValue) };
      });
      localStorage.setItem(key, JSON.stringify(courses));
      const valid = courses.filter(course => course.complete && course.units > 0 && Number.isInteger(course.units) && course.points >= 0 && course.points <= 5);
      const units = valid.reduce((sum, course) => sum + course.units, 0);
      const weightedPoints = valid.reduce((sum, course) => sum + course.units * course.points, 0);
      document.querySelector('#semester-gpa').textContent = units ? (weightedPoints / units).toFixed(2) : '—';
      document.querySelector('#course-total').textContent = units ? `${valid.length} course${valid.length === 1 ? '' : 's'} · ${units} credit units entered` : 'Add course details to calculate';
    };
    document.querySelector('#add-course').addEventListener('click', () => { addCourseRow(); courseRows.lastElementChild.querySelector('.course-name').focus(); });
    document.querySelector('#reset-courses').addEventListener('click', () => {
      courseRows.replaceChildren(); localStorage.removeItem(key); addCourseRow(); updateGpa();
      document.querySelector('#course-status').textContent = 'Course entries cleared.';
    });
    (saved.length ? saved : [{}]).forEach(addCourseRow);
    updateGpa();
  }
});
