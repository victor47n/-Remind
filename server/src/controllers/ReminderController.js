const Reminder = require('../models/reminder');
const getDay = require('date-fns/getDay');
const getHours = require('date-fns/getHours');
const getMinutes = require('date-fns/getMinutes');
const getDate = require('date-fns/getDate');
const { getMonth, getYear, format } = require("date-fns");
const eachDayOfInterval = require('date-fns/eachDayOfInterval')
const endOfMonth = require('date-fns/endOfMonth');
const getDaysInMonth = require('date-fns/getDaysInMonth');
const getSeconds = require('date-fns/getSeconds');
const parseISO = require('date-fns/parseISO');
const moment = require('moment'); 
const differenceInDays = require('date-fns/differenceInDays')
const addDays = require('date-fns/addDays')
const addMonths = require('date-fns/addMonths')

module.exports = {
    async store(req, res) {
        try {
            const status = false;
            const { description, dateActivity, repeat, dayWeek, userId } = req.body;
            // dateActivity.setHours(dateActivity.getHours() - 3);
            const reminders = [];
            let stop = false; 
            let j = 0;
             // let date =  new Date(2020, 11, 28);
            // let date =  new Date(2020, 10, 27);
            let date =  new Date();
            const maxDaysOfMonth = getDaysInMonth(date)
            //checando se o lenbrete é repetitivo
            if(repeat == true){
                
              //laço para percorrer os dias do mes
              for(let i = getDate(date) ; stop == false; i++){
              
              if(i > maxDaysOfMonth){

                date = addMonths(date, 1);
                i = 1;

              }
              
                //converte o array em numeros
                const valores = dayWeek.map(day => {
                  return day.number;
                })
                //pega o menor valor do array
                const valor = Math.min(...valores);
                
                //data a ser cadastrada
                let dateRepeat = new Date(getYear(date), getMonth(date), i, getHours(dateActivity), getMinutes(dateActivity), getSeconds(dateActivity) );
                dateRepeat.setHours(dateActivity.getHours());
                
                // ,`${getHours(dateActivity)}`,`${getMinutes(dateActivity)}`,`${getSeconds(dateActivity)}`);
                
                if(getDay(dateRepeat) == valor){

                  const reminder = await Reminder.create({
                    status,
                    description,
                    dateActivity: dateRepeat,
                    repeat,
                    dayWeek,
                    user: userId,
                  });
                  reminders.push(reminder);
                  // await reminder.save();

                  stop = true;
                  res.send({ reminder });
                }
                
               
              }
            }else{
                const reminder = await Reminder.create({
                    status,
                    description,
                    dateActivity,
                    repeat,
                    dayWeek,
                    user: userId,
                });
                reminders.push(reminder);
                // await reminder.save();
    
                res.send({ reminder });
            }
     
        } catch (err) {
            res.status(400).send({ error: 'Error creating new reminder' });
        }
    },

    async update(req, res) {
        try {
            const { reminderId, description, status, repeat, dateActivity, dayWeek } = req.body;

            // dateActivity.setHours(dateActivity.getHours() - 3);

            const reminder = await Reminder.findByIdAndUpdate(reminderId, {
                description,
                status,
                repeat,
                dateActivity,
                dayWeek,                
            }, { new: true });
            await reminder.save();
            return res.send({ reminder });
        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: 'Error updating reminder' });
        }
    },
    async updateStatus(req, res) {
        try {
            const { reminderId, description, status, repeat, dateActivity, dayWeek } = req.body;

            // dateActivity.setHours(dateActivity.getHours() - 3);

            const reminder = await Reminder.findByIdAndUpdate(reminderId, {
                status,         
            }, { new: true });

            await reminder.save();
            return res.send({ reminder });
        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: 'Error updating reminder' });
        }
    },

    async destroy(req, res) {
        try {
            await Reminder.findByIdAndRemove(req.params.reminderId);
            return res.send();
        } catch (err) {
            return res.status(400).send({ error: 'Erro deleting reminder' });
        }
    }
};
