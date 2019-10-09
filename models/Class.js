// const Student = require("./Student");

module.exports = function (sequelize, DataTypes) {
    var Class = sequelize.define("Class", {

           
       
        classId:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        studentId:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });
   
   
     Class.associate = function(models) {
         Class.hasMany(models.Student,{foreignKey:"studentId"});      
       
       };
    return Class;
};