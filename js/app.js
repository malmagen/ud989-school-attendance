var model = {
            attendance: JSON.parse(localStorage.attendance),
            students: [],

            init: function(){
                for(var student in model.attendance){
                   model.students.push({Name: student, Presence: model.attendance[student]});

                }

            },

            countMissing: function(){
                var numMissed = [];

                for(var i = 0; i<model.students.length;i++){
                        var num = 0;

                        for(var j = 0; j<12;j++){

                            if(model.students[i].Presence[j]===false){
                                    num++;
                                }
                        }
                        numMissed.push(num);

                    }
                    return numMissed;


                },

                updateAttendance: function(){
                    var newAttendance = {};

                    for(var i = 0;i < model.students.length; i++){

                     newAttendance[model.students[i].Name]=model.students[i].Presence;
                     console.log(newAttendance);
                    }
                    localStorage.attendance = JSON.stringify(newAttendance);
                }


                }

var octopus = {
    init: function(){
        model.init();
        var student_presence = [];
        for (var i =0;i<model.students.length;i++){
            var student_temp = model.students[i].Presence;

            student_presence.push.apply(student_presence,student_temp);
        }

        view.init(student_presence);
    },
    getMissing: function(){
        var num = model.countMissing();
        return num;

    },
    setAttendance: function(num,present){
        if(num<12){
            model.students[0].Presence[num] = present;
        }
        else if(num<24){
            num = num - 12;
            model.students[1].Presence[num] = present;
             }
        else if(num<36){
            console.log("test");

            num = num -24;
            model.students[2].Presence[num] = present;
        }
        else if(num<48){
            num = num - 36;
            model.students[3].Presence[num] = present;
        }
        else{
            num = num - 48;
            model.students[4].Presence[num] = present;
        }
        model.updateAttendance();
        view.render();

    }

}

var view = {
    init: function(student_presence){

        var allCheckboxes = $('tbody input');

            for(var i = 0; i<allCheckboxes.length;i++){
                var checkBox = allCheckboxes[i];
                if(student_presence[i]==true){
                checkBox.checked = true;
                }



                checkBox.addEventListener("click",(function(num,check){

                    return function(){
                    octopus.setAttendance(num,check.checked);
                    }
                })(i,checkBox));


            }
    view.render();


    },

    render: function(){

        var daysMissed = octopus.getMissing();
        var missingColumn = document.getElementsByClassName("missed-col");

        var j= 0;
            for(i=1;i <missingColumn.length;i++){

                missingColumn[i].innerHTML = daysMissed[j];
                j++;
            }



    }
}

octopus.init();