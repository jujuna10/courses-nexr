import express from 'express';
import cors from 'cors';
import pool from './database.js';


const app = express()

app.use(cors())

app.use(express.json())

app.post('/', (req,res) => {
    const {name, phone, email} = req.body;
        if (!name || !phone || !email) {
        return res.status(400).send('All fields are required');
    }
    
    const insert = 'INSERT INTO contact (name, phone, email) VALUES ($1, $2, $3)';
    
    pool.query(insert, [name, phone, email])
        .then((response) => {
            console.log('Data saved successfully');
            res.status(200).send('Data saved successfully');
        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send(`Database error: ${err.message}`);
        });
});

app.post('/registration', (req,res) => {
    const {name,lastName,phone,age,email} = req.body;
        if (!name || !lastName || !phone || !age || !email) {
        return res.status(400).send('All fields are required');
    }

    const randomNumber = Math.floor(10000 + Math.random() * 90000);

    
    const insert = 'INSERT INTO students (student_name,student_lastname,student_phone,student_age,student_email,student_number) VALUES ($1, $2, $3, $4, $5, $6)';
    
    pool.query(insert, [name,lastName,phone,age,email,randomNumber])
        .then((response) => {
            console.log('Data saved successfully');
            res.status(200).send('Data saved successfully');
        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send(`Database error: ${err.message}`);
        });
});

app.post('/login', (req,res) => {
    const {name,email} = req.body;

    const insert = 'SELECT * FROM students WHERE student_name = $1';
    
    pool
        .query(insert, [name])
        .then((response) => {
            if(response.rows.length === 0){
                return res.status(401).json({message: 'nof found'})
            }
            const user = response.rows[0]
            if(user.student_email !== email){
                return res.status(401).json({message: 'nof found'})
            }
            res.status(200).json({name: user.student_name, phone:user.student_phone, age:user.student_age, email:user.student_email, number: user.student_number})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'server error' });
        });
});

app.get('/profile/:id', async (req, res) => {
    const { id } = req.params;


    try{
        const query1 = 'SELECT * FROM students WHERE student_number = $1';
        const query2 = 'SELECT * FROM student_courses WHERE student_id = $1'

        const studentResult = await pool.query(query1, [id]);

        if (studentResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = studentResult.rows[0];
        const coursesResult = await pool.query(query2, [user.student_id]);

        res.status(200).json({
            student: {
                name: user.student_name,
                lastName: user.student_lastname,
                phone: user.student_phone,
                age: user.student_age,
                email: user.student_email,
                number: user.student_number,
            },
            courses: coursesResult.rows,
        });
    }catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).json({ message: 'Server error' });
    }

    // pool
    //     .query(query, [id])
    //     .then((response) => {
    //         if (response.rows.length === 0) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }

    //         const user = response.rows[0];
    //         res.status(200).json({
    //             name: user.student_name,
    //             lastName: user.student_lastname,
    //             phone: user.student_phone,
    //             age: user.student_age,
    //             email: user.student_email,
    //             number: user.student_number,
    //         });
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //         res.status(500).json({ message: 'Server error' });
    //     });

    // pool.query(query2, [id])
    // .then((response) => {
    //     if (response.rows.length === 0){
    //         return res.status(404).json({ message: 'User not found' });
    //     }

    
    //     const findUserCourses = response.rows[0]
    //     console.log(findUserCourses)
    // })
});

app.post('/courses', async (req, res) => {
    try {
        const { id, name, userNumber } = req.body;

        // Find course id
        const findCourseQuery = 'SELECT course_id FROM courses WHERE course_name = $1';
        const findStudentQuery = 'SELECT student_id FROM students WHERE student_number = $1';

        const courseResult = await pool.query(findCourseQuery, [name]);

        if (courseResult.rows.length === 0) {
            return res.status(400).json({ error: 'Course not found' });
        }

        const studentResult = await pool.query(findStudentQuery, [userNumber]);

        if (studentResult.rows.length === 0) {
            return res.status(400).json({ error: 'Student not found' });
        }

        const studentId = studentResult.rows[0].student_id;
        const courseId = courseResult.rows[0].course_id;

        // Check if student is already enrolled in this course
        const checkEnrollmentQuery = 'SELECT * FROM student_courses WHERE student_id = $1 AND course_id = $2';
        const enrollmentResult = await pool.query(checkEnrollmentQuery, [studentId, courseId]);

        if (enrollmentResult.rows.length > 0) {
            return res.status(400).json({ error: 'Student is already enrolled in this course' });
        }

        // Insert into student_courses
        const insertQuery = 'INSERT INTO student_courses (student_id, course_id) VALUES ($1, $2)';
        await pool.query(insertQuery, [studentId, courseId]);

        res.status(200).json({ message: 'Course successfully assigned' });

    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).json({ error: err.message });
    }
});



// app.get('/profile', (req,res) => {

// })

// app.post('/courses', async (req, res) => {
//     try {
//         const { userNumber } = req.body;

//         // სტუდენტის ID-ის პოვნა
//         const findStudent = 'SELECT student_id FROM students WHERE student_number = $1';
//         const studentResult = await pool.query(findStudent, [userNumber]);

//         if (studentResult.rows.length === 0) {
//             return res.status(404).json({ error: 'Student not found' });
//         }

//         const studentId = studentResult.rows[0].student_id;

//         // სტუდენტთან დაკავშირებული კურსების პოვნა
//         const findCoursesQuery = `
//             SELECT courses.course_id, courses.course_name
//             FROM student_courses
//             JOIN courses ON student_courses.course_id = courses.course_id
//             WHERE student_courses.student_id = $1
//         `;
//         const coursesResult = await pool.query(findCoursesQuery, [studentId]);

//         res.status(200).json(coursesResult.rows);
//     } catch (err) {
//         console.error('Database Error:', err);
//         res.status(500).json({ error: err.message });
//     }
// });

app.post('/statistic/:id/:avgAttendance/:avgScore/:roundedDuration/:homework', async (req, res) => {
    const {id, avgAttendance, avgScore ,roundedDuration, homework} = req.params;

    try {
      const findStudentQuery = 'SELECT * FROM students WHERE student_number = $1';
      const studentResult = await pool.query(findStudentQuery, [id]);
  
      if (studentResult.rows.length === 0) {
        return res.status(400).json({ error: 'Student not found' });
      }
  
      const studentId = studentResult.rows[0].student_id;
  
      const intoStatistic = `INSERT INTO statistics (student_id, attendances, scores, duration, homeworks) VALUES ($1, $2, $3, $4, $5)`;
  
      await pool.query(intoStatistic, [
        studentId, 
        avgAttendance,
        avgScore,
        roundedDuration,
        homework,
      ]);
  
      res.status(201).json({ message: 'Statistics inserted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
   });

  app.get('/statistic/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const findStatsQuery = `SELECT * FROM statistics WHERE student_id = $1`;
        
        const findStudentQuery = 'SELECT * FROM students WHERE student_number = $1';
        const studentResult = await pool.query(findStudentQuery, [id]);
        
        if (studentResult.rows.length === 0) {
            return res.status(400).json({ error: 'Student not found' });
        }
  
        const studentId = studentResult.rows[0].student_id;
        
        const getInfo = await pool.query(findStatsQuery, [studentId]);

        if (getInfo.rows.length === 0) {
            return res.status(404).json({ message: 'Statistics not found' });
        }

        res.status(200).json(getInfo.rows);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});


app.listen(4001, () => {
    console.log('Server is running on port 4001')
})