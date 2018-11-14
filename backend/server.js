var express =  require('express');
var cors = require ('cors');
var bodyParser = require ('body-parser');
var mongoose = require('mongoose');
var Joi = require('joi');
var User =  require('./models/user');
var port = process.env.PORT || 8080;
var app = express();
var router = express.Router();
var path = require('path');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://sudha:sudha123@ds139954.mlab.com:39954/meandb');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/allusers').get((req, res) => {
    User.find((err, users) => {
        if (err)
            console.log(err);
        else
            res.json(users);
    });
});



router.route('/singleuser/:id').get((req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});





router.route('/delete/:id').get((req, res) => {
    // console.log(req.params.id);
    User.findByIdAndRemove({_id: req.params.id}, (err, user) => {
        if (err)
        return res.json({ success: false, msg: 'Faild to delete User' });
        else
        return res.json({ success: true, msg: 'Delete User Successfully' });
    })
})


router.route('/adduser').post((req, res) => {

    // fetch the request data
    const data = req.body;

    // define the validation schema
    const schema = Joi.object().keys({

         // name is required
        // name must be string
        name : Joi.string().min(3).required(),

       
        // email is required
        // email must be a valid email string
        email: Joi.string().email({ minDomainAtoms: 2 }),

        // phone is required
        // and must be a string of the format XXXXXXXXXX
        // where X is a digit (0-9)
        phone: Joi.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).required(),

    });

    // validate the request data against the schema
    Joi.validate(data, schema, (err, value) => {


        if (err) {
            // send a 422 error response if validation fails
            return res.json({success: false, msg: err.details[0].message

                // status: 'error',
                // 'Invalid request data'
                // data: data
             });
        } else {
     
        let user = new User(req.body);
        user.save()
        .then(data => {
            return  res.json({success: true,'msg': 'Added successfully'});
        })
        .catch(err => {
            return  res.json({success: false, msg:'Failed to create new record'});
        });
        }

    });

});


router.route('/user/update/:id').put((req, res) => {
   
        // fetch the request data
        const data = req.body;
    
        // define the validation schema
        const schema = Joi.object().keys({
    
             // name is required
            // name must be string
            name : Joi.string().min(3).required(),
    
            
            // email is required
            // email must be a valid email string
            email: Joi.string().email({ minDomainAtoms: 2 }),
    
            // phone is required
            // and must be a string of the format XXXXXXXXXX
            // where X is a digit (0-9)
            phone: Joi.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).required(),
    
            
            
    
        });
    
        // validate the request data against the schema
        Joi.validate(data, schema, (err, value) => {
    
    
            if (err) {
                // send a 422 error response if validation fails
                return res.json({success: false, msg: err.details[0].message
    
                 });
            } else {
                
                    // console.log(req.params.id)
                    User.findById(req.params.id, (err, user) => {
                        if (!user)
                        return res.json({success: false, msg: 'Could not load document'});
                           
                        else {
                            user.name = req.body.name;
                           
                            user.email = req.body.email;
                            user.phone = req.body.phone;
                           
                
                            user.save().then(data => {
                                return res.json({success: true, msg: 'Update done'});
                            }).catch(err => {
                                return res.json({success: false, msg:'Update failed'});
                            });
                        }
                    });
       
            }
    
        });
    
    });

app.use('/', router);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'pulic/index.html'));
})
app.listen(port, () => console.log('Express server running on port 8080'));
