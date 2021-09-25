const Student = require('../model/database');
module.exports.get_log = (req, res) => {
	res.render('log-in');
};
module.exports.post_log = async(req, res) => {
	const{regNumber,password} = req.body
	try{
		const student = await Student.findOne({regNumber:regNumber})
		const matchpwd = await Student.findOne({password:password})
	
		if(student && matchpwd) {
			res.render('student-page',{student})
		}else{
			res.send('wrong reg no or password')
		}
	}
	catch(err){
		console.log(err)
	}

};

module.exports.get_register = (req, res) => {
	res.render('register');
};
module.exports.post_register = async (req, res) => {
	console.log(req.body);
	const student = new Student({
		surName: req.body.surName,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		state: req.body.state,
		regNumber: req.body.regNo,
		nationality: req.body.nationality,
		gender: req.body.gender,
		level: req.body.level,
		birthDate: req.body.birth,
		department: req.body.dept,
		duration: req.body.duration,
		year: req.body.year,
		password: req.body.password,
	});
	try {
		const newStudent = await student.save();
		res.redirect(`/${newStudent.id}`);
	} catch (err) {
		console.log(err);
		res.send('error while sending data');
	}
};

// single user route
module.exports.get_user = async (req, res) => {
	let studentId = req.params.id;
	// res.send(studentId)
	try {
		let student = await Student.findById(studentId);
		console.log(student);
		res.render('student-page', { student });
	} catch (err) {
		console.log(err);
	}
};

module.exports.post_user = async (req, res) => {
    const {regNumber,password} = req.body
    try {
        const stdRegNumber = await Student.findOne({regNumber:regNumber})
        const stdPassword = await Student.findOne({password:password})
        if (stdRegNumber && stdPassword) {
            res.redirect('/:id')
            console.log(stdPassword,stdRegNumber);
        }
    } catch (err) {
        console.log(err);
    }
};

// update user

module.exports.update_user = async (req,res) =>{
	const id = req.params.id
	try {
		const updateStudent = Student.findByIdAndUpdate(id,req.body,{userFindAndModify:false})
	} catch (err) {
		console.log(err);
	}
}


// delete user
module.exports.delete_user = async (req,res)=>{
	try {
		const deleteStudent = await Student.findByIdAndDelete(req.params.id)
		res.redirect('/admin')
	} catch (err) {
		console.log(err);
	}
}

// clearance page
module.exports.clearance = async (req,res)=>{
	const studentId = req.params.id
	// res.send(studentId)
	try {
		const student = await  Student.findById(studentId)
		res.render('clearance-page', {student})
	} catch (err) {
		console.log(err);
	}
}

// admin page

// admin authentication middleware

module.exports.get_admin = async (req, res) => {
	const reject = () =>{
		res.setHeader('www-authenticate', 'Basic')
		res.sendStatus(401)
	}
	const authorization = req.headers.authorization
	if(!authorization){
		return reject()
	}
	const [username, password] = Buffer.from(authorization.replace('Basic',''),'base64').toString().split(':')
	if(! (username == 'project-group' && password === 'project-group')){
		return reject()
	}
	try {
		let students = await Student.find();
		res.render('admin', { students });
	} catch (err) {
		console.log(err);
	}
};
