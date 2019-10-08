module.exports = function (sequelize, DataTypes) {
    var Activities = sequelize.define("Activities", {


        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
        // ,
        // activityDate: {
        //     type: DataTypes.DATEONLY,
        //     allowNull: false,
        //     primaryKey: true
        // },

        // activityName: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     notEmpty: true
        // },
        // activityTime: {
        //     type: DataTypes.TIME,
        //     allowNull: false
        // },
        // description: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     notEmpty: true
        // },
        // classId: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        //     notEmpty: false
        // }
    });
   


    return Activities;
};