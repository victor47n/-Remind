const Historic =  require("../models/historic");
const Reminder =  require("../models/reminder");
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
// var format = require('date-fns/format')
// import 'moment/locale/pt-br';
module.exports = {
  async Loop(req, res) {
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);
    
    const reminders = await Reminder.find()
      .or([
          { dayWeek: { $elemMatch: { number: getDay(new Date()) } } },
          { dateActivity: { $gte: start, $lt: end } }
      ])
    .populate('user');
    
    if(reminders){
      try {
        let date = new Date();
        
        let hist = [];
        // console.log(getDate(new Date()) + 7);
        
        for(let reminder of reminders){
          const hoje = `${getYear(date)}-` + `${getMonth(date)}-` + `${getDate(date)}`;
          const dateActivityReminder = `${getYear(reminder.dateActivity)}-` + `${getMonth(reminder.dateActivity)}-` + `${getDate(reminder.dateActivity)}`;
          const hours =  getHours(reminder.dateActivity) + 3;
          if(dateActivityReminder === hoje){
              // if(reminder.repeat == true && date.getHours() == 23 && date.getMinutes() == 59){
                // const dateUse = getDate(new Date()) + 7;
                const dateUse = addDays(new Date(getYear(new Date()), getMonth(new Date()), getDate(new Date())), 7);
                
                const teste = `${moment(dateUse).format("YYYY-MM-DD")} ` +
                              `${hours}:` +
                              `${getMinutes(reminder.dateActivity)}:` +
                              `${getSeconds(reminder.dateActivity)}.000Z`;
                // getYear(date) + getMonth(date) + dateUse + getHours(reminder.dateActivity)
                // const parsedDate = parseISO(`${new Date}`);
                // console.log(teste)
                console.log("Novo Cadastro com Repeat");
                console.log(`\n`);
                console.log("<==================================>");
                if(reminder.repeat === true){
                  let userId = reminder.user;
                  const reminderHistoric = await Reminder.create({
                    description: reminder.description,
                    status: false,
                    dateActivity: teste,
                    repeat: reminder.repeat,
                    dayWeek: reminder.dayWeek,
                    user: userId,
                  });
                  hist.push(reminderHistoric);
                } 
              }
            }
            // res.send(hist);

      } catch (error) {
        console.log(error)
        console.log("HISTORIC ERROR! ====>  ", error)
      }
    }
  },

  async TestesCadastros(req, res) {
    // const dateNow = `${getYear(new Date())}` + `${getMonth(new Date())}` + `${getDate(new Date())}`;
    // const ano = getYear(new Date());
    // const mes = getMonth(new Date());
    // const dia = getDate(new Date());
    
    // let start = new Date();
    // start.setHours(0, 0, 0, 0);

    // let end = new Date();
    // end.setHours(23, 59, 59, 999);
    
    // const endMonth = getDaysInMonth(new Date(ano, mes));

    // let result = eachDayOfInterval({
    //   start: new Date(ano, mes, dia),
    //   end: new Date(ano, mes, endMonth)
    // });

   
    try {
            const status = false;
            const { description, dateActivity, repeat, dayWeek, userId } = req.body;
            const reminders = [];
            let stop = true; 
            let j = 0;
            // let date =  new Date(2020, 11, 28);
            // let date =  new Date(2020, 10, 27);
            let date =  new Date();
            const maxDaysOfMonth = getDaysInMonth(date)
            // const maxDays = endOfMonth(new Date())

            // let calc = differenceInDays(
            //   new Date(getYear(maxDays), getMonth(maxDays), getDate(maxDays) ),
            //   new Date()
            // )
            // console.log(calc);
            if(repeat == true){
              for(let i = getDate(date) ; stop == true; i++){
              // if(calc >= 6){
              //   i = 1;
              // }
              if(i > maxDaysOfMonth){
                console.log(`\n`)
                console.log("<Passou pela transição de meses>")
                date = addMonths(date, 1);
                // date = moment(date).add(1, 'months');
                i = 1;
                //ajustar o mes
              }
              // const testeDay = addDays(new Date(getYear(new Date()), month, getDate(new Date())), 7);
              // console.log(testeDay)

              
                const valores = dayWeek.map(day => {
                  return day.number;
                })
                const valor = Math.min(...valores);
                // , getHours(dateActivity), getMinutes(dateActivity), getSeconds(dateActivity)
                let dateRepeat = new Date(getYear(date), getMonth(date), i, getHours(dateActivity), getMinutes(dateActivity));
                dateRepeat.setHours(dateActivity.getHours());
                j += 1;
                // let mesEscrito = format(date, "'de' MMMM")
                console.log("Passou pelo for", j, "vezes e pegou o Dia", i, "do mês de", `"${moment(dateRepeat).locale("pt-br").format('MMMM')}"`);
                if(getDay(dateRepeat) == valor){
                  const dateTeste = addDays(new Date(getYear(new Date()), getMonth(new Date()), getDate(new Date())), 7);
                  console.log(`\n`)
                  console.log("Pegou o dia correto! ")
                  console.log("Data de Repetir: ", getDay(dateRepeat), "-",`${moment(dateRepeat).locale("pt-br").format('dddd')}`)
                  console.log("Dia da semana: ", valor,  "-", `${moment(dateTeste).locale("pt-br").format('dddd')}`)
                  console.log(`\n`)
                  console.log("<=================================================================>")
                  console.log(`\n`)
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

                  stop = false;
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
            // console.log(err)
            res.status(400).send({ error: 'Error creating new reminder' });
        }
  }  
}
