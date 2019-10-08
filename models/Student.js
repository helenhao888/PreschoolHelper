module.exports = function (sequelize, DataTypes) {
    var Student = sequelize.define("Student", {


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
        parent1FirstName: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        parent1LastName: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        parent2FirstName: {
            type: DataTypes.STRING,
            allowNull: true,
            notEmpty: false
        },
        parent2LastName: {
            type: DataTypes.STRING,
            allowNull: true,
            notEmpty: false
        },
        studentPhoto:{
            type: DataTypes.STRING,
            allowNull: true,
            notEmpty: false
        },
        classId:{
            type: DataTypes.STRING,
            allowNull: true,
            notEmpty: false
        }
    });
    // Student.associate = function(models) {
      
    //     Student.belongsTo(models.Class, {foreignKey: "classId", targetKey: "classId"});
    //   };
  

    return Student;
};