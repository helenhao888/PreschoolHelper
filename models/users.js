module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
    
        email: {
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        accessLevel: {
            type: DataTypes.STRING,
            defaultValue: "1",
            validate: {
                isIn: [["0", "1"]]

            }
            //0 - for Admin, 1 for normal user 

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
            // ,            
            // validate: {
            //     is: ["^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%^&\*])(?=.{8,})+$",'i']
            //     // ,  
            // msg: "password must be a minimum of 8 characters and with one upper case letter, one number and one special character."
            // }
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        studentId:{
            type: DataTypes.INTEGER,
            allowNull: true
        }

    });


    return User;
};